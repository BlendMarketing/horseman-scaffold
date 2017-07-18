#!/usr/bin/env bash


# Can only have [a-z\-]
CONTAINERNAME="example"
DOMAIN_BASE="example.com"

# Defaults
cluster="blend-staging-east"
lbport=80
containerPort=80
vpc="vpc-cf3588b6"
loggroup="DockerStagingEast"
elb="arn:aws:elasticloadbalancing:us-east-1:545046381935:loadbalancer/app/Blend-Staging-East/bfee18798d300334"

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

setup(){
  configure_aws_cli
  configure_vars
}

configure_aws_cli(){
  aws --version
  aws configure set default.region $AWS_REGION
  aws configure set default.output json
}

configure_vars(){
  reponame=$(printf "%s.dkr.ecr.%s.amazonaws.com/%s" $AWS_ACCOUNT_ID $AWS_REGION $CIRCLE_PROJECT_REPONAME)
  echo $reponame
  #doesn't allow non a-z characters besdies dashes. Repo name wont work
  taskname=$(printf "%s-%s" $CIRCLE_BRANCH $CONTAINERNAME)
  echo $taskname
  # Target name has to be less than 32 characters and only contain dashes
  targetname=$(printf "%s-%s" $CIRCLE_BRANCH $CONTAINERNAME)
  echo $targetname
  family=$(printf "%s-%s" $CIRCLE_BRANCH $CONTAINERNAME)
  # Target name has to be less than 32 characters and only contain dashes
  echo $family
  servicename=$(printf "%s-%s" $CIRCLE_BRANCH $CONTAINERNAME)
  # Target name has to be less than 32 characters and only contain dashes
  echo $servicename

  if [ "$CIRCLE_BRANCH" == "master" ]; then
    domain=$(printf "staging.%s" $DOMAIN_BASE)
  elif [ "$CIRCLE_BRANCH" == "production" ]; then
    domain=$DOMAIN_BASE
  else
    domain=$(printf "%s.branch.%s" $CIRCLE_BRANCH $DOMAIN_BASE)
  fi

  echo $domain
  task_template='[
  {
    "name": "%s",
    "image": "%s:%s",
    "memoryReservation": 5,
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "%s",
          "awslogs-region": "%s",
          "awslogs-stream-prefix": "%s"
      }
    },
    "essential": true,
    "portMappings": [
    {
      "containerPort": %s,
      "hostPort": 0
    }
    ]
  }
  ]'

  task_def=$(printf "$task_template"  $CONTAINERNAME $reponame $CIRCLE_SHA1 $loggroup $AWS_REGION $domain $containerPort)
  echo $task_def
}

check_registry(){
  if [[ $(aws ecr describe-repositories --repository-name  $CIRCLE_PROJECT_REPONAME | jq '.repositories | length') > 0 ]];then
    echo "Respository Exists"
  else
    create_registry
  fi
}

create_registry() {
  if repo=$(aws ecr create-repository --repository-name $CIRCLE_PROJECT_REPONAME | jq '.repositories');then
    echo "Repository Created"
    return 0
  else
    echo "Error Creating Repository."
    return 1
  fi
}

push_ecr_image(){
  eval $(aws ecr get-login --region $AWS_REGION)
  docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$CIRCLE_PROJECT_REPONAME:$CIRCLE_SHA1
  echo "Imaged Pushed"
}

register_definition() {

echo -e "aws ecs register-task-definition --container-definitions "$task_def" --family $family"
  if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family $family | $JQ '.taskDefinition.taskDefinitionArn'); then
    echo "Revision: $revision"
  else
    echo "Failed to register task definition"
    exit 1
  fi

}

register_service(){
aws ecs describe-services --cluster $cluster --service $servicename | jq '.services[0] | select(.status=="ACTIVE") | .status'
  if [[ $(aws ecs describe-services --cluster $cluster --service $servicename | jq '.services[0] | select(.status=="ACTIVE") | length') > 0 ]]
  then
    echo $servicename
   echo "updating services"
    update_service
  else
    echo "setting up service"
    setup_service
  fi
}

setup_service(){
  find_listener
  #check_listener_rule
  create_targetgroup
  setup_listener_rule
  create_service
}

find_listener(){
echo "find listener"
  if listener=$(aws elbv2 describe-listeners --load-balancer-arn $elb | jq -r ".Listeners[] | select(.Port == $lbport) | .ListenerArn")
  then
    echo "listener"
    echo $listener
    return 0
  fi

  echo "Listener for specified port not found"
  exit 1
}

check_listener_rule(){
  if rule=$(aws elbv2 describe-rules --listener $listener | jq -r ".Rules[] |select(.Conditions | length > 0) | select(.Conditions[0].Values[0] == '$domain')")
  then
	echo "Listener Rule Exists for domain"
	echo $rule
	return 0
  fi
  echo "setup listener rule"
  setup_listener_rule
}

setup_listener_rule(){
  find_open_listener_priority
  create_listener_rule
}

find_open_listener_priority(){
    priority=$(aws elbv2 describe-rules --listener $listener | jq -r ".Rules | max | .Priority | tonumber")
    #priority=$priority+1
    priority=$RANDOM
    echo "priority"
    echo $priority
}

create_listener_rule(){
  if [[ $(aws elbv2 create-rule --actions Type=forward,TargetGroupArn=$targetgrouparn --listener-arn $listener --conditions Field=host-header,Values="$domain" --priority $priority | $JQ '.Rules | length') > 0 ]];
  then
    echo "Listener Rule created"
    return 0;
  else
    echo "Error Creating Listener Rule";
    exit 1;
  fi
}


create_targetgroup(){
  if targetgrouparn=$(aws elbv2 create-target-group --name $targetname --protocol HTTP --port $lbport --vpc-id $vpc | $JQ '.TargetGroups[0].TargetGroupArn')
  then
    echo "Target Group Created"
    return 0;
  else
    echo "Error Creating Target Group";
    exit 1;
  fi
}


create_service(){
  role="ecsServiceRole"
echo $targetgrouparn
  if [[ $(aws ecs create-service --cluster $cluster --service-name $servicename  --role $role --load-balancers targetGroupArn=$targetgrouparn,containerName=$CONTAINERNAME,containerPort=$containerPort  --task-definition $revision --desired-count 1 | \
  $JQ '.service.taskDefinition') != $revision ]]; then
    echo "Error creating service."
    exit 1;
  fi
  echo "Service Created"
}

update_service(){
  if [[ $(aws ecs update-service --cluster $cluster --service $servicename --task-definition $revision | \
    $JQ '.service.taskDefinition') != $revision ]]; then
    echo "Error updating service."
    exit 1
  fi
  echo "Service Updated"
}

# Run Script
setup
check_registry
push_ecr_image
register_definition
register_service
