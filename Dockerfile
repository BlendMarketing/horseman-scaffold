FROM nginx:1.13-alpine

MAINTAINER Marc Tanis <marc@blendimc.com>

COPY nginx-site.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www

RUN echo 'blend:$apr1$5yLGvD4P$NLvcfKVgb7JNIFp5HHHR9/' > /var/www/.htpasswd

COPY public /var/www/public

