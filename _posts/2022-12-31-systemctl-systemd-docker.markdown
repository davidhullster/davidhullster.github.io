---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Python function to tag aws instances based on AMI name
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- systemd
- systemctl
tags: []
meta:
author:
  'Scratches'
---

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