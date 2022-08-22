---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS EC2 Userdata to install docker and set systemd config
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- userdata
- docker
- systemd
- systemctl
tags: []
meta:
author:
  'Scratches'
---
### UserData install Docker/systemctl config
<pre>

#!/bin/bash -xe
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "##### USERDATA #####"
sudo yum update -y
sudo amazon-linux-extras install docker
sudo yum install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
docker run --name kafka-ui -p 8080:8080 -e KAFKA_CLUSTERS_0_NAME=kafka-ui -e KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=dev-kafka1.expenterprise.com:9092,dev-kafka2.expenterprise.com:9092,dev-kafka3.expenterprise.com:9092 -e KAFKA_CLUSTERS_0_READONLY=true -d provectuslabs/kafka-ui:latest
cat > /etc/systemd/system/docker-kafka-ui.service << __EOF__
[Unit]
Description=Kafka-Ui container
Requires=docker.service
After=docker.service
[Service]
Restart=always
ExecStart=/usr/bin/docker start -a kafka-ui
ExecStop=/usr/bin/docker stop -t 2 kafka-ui
[Install]
WantedBy=default.target
__EOF__
systemctl start docker-kafka-ui
sudo systemctl enable docker-kafka-ui
</pre>

### Docker Systemd Config
<pre>
$ sudo cat /etc/systemd/system/docker-kafka-ui.service
[Unit]
Description=Kafka-Ui container
Requires=docker.service
After=docker.service

[Service]
Restart=always
ExecStart=/usr/bin/docker start -a kafka-ui
ExecStop=/usr/bin/docker stop -t 2 kafka-ui

[Install]
WantedBy=default.target
</pre>