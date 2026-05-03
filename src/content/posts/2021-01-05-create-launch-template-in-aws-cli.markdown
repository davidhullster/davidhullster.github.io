---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Create launch template in AWS CLI
date: 2021-01-05 15:49:35.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _last_editor_used_jetpack: block-editor
  timeline_notification: '1609861779'
  _publicize_job_id: '53052242116'
author:
  'Scratches'
permalink: "/2021/01/05/create-launch-template-in-aws-cli/"
---
<pre>
aws ec2 create-launch-template 
  --launch-template-name my-template-for-auto-scaling 
  --version-description version1
  --launch-template-data file://config.json
</pre>


<em>config.json</em>

<pre>
{ 
  "ImageId":"ami-04d5cc9b88example", 
  "InstanceType":"t2.micro", 
  "SecurityGroupIds":["sg-903004f88example"] 
}
</pre>


<pre>
aws ec2 create-launch-template 
  --launch-template-name my-template-for-auto-scaling 
  --version-description version1 
  --launch-template-data 
    '{
      "ImageId":"ami-04d5cc9b88example",
      "InstanceType":"t2.micro",
      "SecurityGroupIds":["sg-903004f88example"]
      }'
</pre>
