---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: aws userdata log and start apache (aws linux/rhel)
date: 2020-12-02 03:48:51.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
- Tech
tags: []
meta:
  _last_editor_used_jetpack: block-editor
  _publicize_job_id: '51727951523'
  timeline_notification: '1606880937'
author:
  'Scratches'
permalink: "/2020/12/02/aws-userdata-log-and-start-apache-aws-linux-rhel/"
---

<p>!/bin/bash -xe<br />exec &gt; &gt;(tee /var/log/user-data.log|logger -t user-data -s 2&gt;/dev/console) 2&gt;&amp;1<br />yum -y update<br />echo "#### USERDATA START ####"<br />sudo yum install httpd -y<br />sudo systemctl start httpd.service<br />sudo systemctl enable httpd.service</p>

