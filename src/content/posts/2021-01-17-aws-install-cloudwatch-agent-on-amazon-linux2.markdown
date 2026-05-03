---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS Install CloudWatch Agent on Amazon Linux2
date: 2021-01-17 07:34:10.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: ['aws', 'cloudwatch', 'collectd', 'Amazon Linux2', 'amazon-linux-extras']
meta:
  _last_editor_used_jetpack: block-editor
  timeline_notification: '1610868854'
  _publicize_job_id: '53544106924'
author:
  'Scratches'
permalink: "/2021/01/17/aws-install-cloudwatch-agent-on-amazon-linux2/"
---
<pre>
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
sudo rpm -U ./amazon-cloudwatch-agent.rpm
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard

yum install collectd -y
sudo amazon-linux-extras install collectd
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:config.json
</pre>


