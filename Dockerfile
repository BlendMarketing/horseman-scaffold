# From Custom NGINX Dockerfile
# Set custom Root path
# Set htpasswd file
FROM nginx
MAINTAINER Marc Tanis "marc@blendimc.com"

# RUN echo  "blend:$apr1$cmz3pm27$80LgKKWS5zmPjTnbi8N7E/" >> /usr/share/ngin/.htpasswd

# Copy Files
COPY public /usr/share/nginx/html
