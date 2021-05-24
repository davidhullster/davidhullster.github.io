---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Docker Notes
date: 2020-10-05 19:40:57.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags:
- alpine
- docker
- docker run
- dockerfile
meta:
  timeline_notification: '1601926860'
  _publicize_job_id: '49596908832'
  _last_editor_used_jetpack: block-editor
author:
  'Scratches'
permalink: "/2020/10/05/docker-notes/"
---

#### Dockerfile:
<pre>
FROM alpine:latest
RUN apk upgrade
RUN apk add nginx
COPY files/default.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /var/www/html
WORKDIR /var/www/html
COPY --chown=nginx:nginx /files/html/ .
EXPOSE 80
CMD [ "nginx", "-g", "pid /tmp/nginx.pid; daemon off;" ]
</pre>
#### Docker CLI history
<pre>
docker run --name web -dt nginx
docker container ls
ls webfiles/
cat webfiles/default.conf
ls webfiles/html/
docker exec web mkdir /var/www
docker cp webfiles/default.conf web:/etc/nginx/conf.d/default/conf
docker cp webfiles/default.conf web:/etc/nginx/conf.d/default.conf
docker cp webfiles/html/ web:/var/www/
docker exec web ls /var/www/html/
docker exec web chown -R nginx:nginx /var/www/html
docker exec web nginx -s reload
docker inspect web | grep IPAddress
curl 172.17.0.2
docker commit web web-image
docker run -dt --name web01 -p 80:80 web-image
curl localhost
docker stop web
docker rm web
</pre>

<pre>docker run -d --name treatseekers -p 80:80 spacebones/doge</pre>
