---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS Create Bucket with LocationConstraint
date: 2020-12-07 13:58:29.000000000 -08:00
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
  timeline_notification: '1607349514'
  _publicize_job_id: '51935269023'
author:
  'Scratches'
permalink: "/2020/12/07/aws-create-bucket-with-locationconstraint/"
---
#### Create S3 bucket in AWS CLI with LocationConstraint
<pre>
aws s3api create-bucket 
  --bucket my-bucket 
  --region us-west-2 
  --create-bucket-configuration LocationConstraint=us-west-2
</pre>


