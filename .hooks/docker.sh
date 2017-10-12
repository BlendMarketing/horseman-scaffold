PREVIOUS_COMMIT=$1
CURRENT_COMMIT=$2

CHANGED=$(
  git diff --name-only ${PREVIOUS_COMMIT} ${CURRENT_COMMIT} package.json \
    webpack.config.js \
    styleguide.config.js \
  )

if [ -z "$CHANGED" ]; then
    exit 0
fi

docker build -f Dockerfile-local -t node.example.com .
docker-compose down && docker-compose up -d
