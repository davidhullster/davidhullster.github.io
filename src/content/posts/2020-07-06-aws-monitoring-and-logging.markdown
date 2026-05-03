---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS Monitoring and Logging
date: 2020-07-06 02:04:39.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _publicize_job_id: '46236136174'
  timeline_notification: '1594001082'
author:
  'Scratches'
permalink: "/2020/07/06/aws-monitoring-and-logging/"
---

<strong>AWS Lambda Monitoring</strong>


<ul>
<li>Lambda does not provide a built-in metric for memory usage</li>
<li>you can set up a CloudWatch metric filter</li>
</ul>


<strong>Allow Cross-Account S3 Access</strong>


<ul>
<li>Create a Cross-account IAM Role</li>
<li>Grant the remote account id access to use the role</li>
</ul>


<strong>AWS Secrets Manager</strong>


<ul>
<li>Maximum Byte Length: 7168 bytes</li>
</ul>


<strong>AWS X-Ray</strong>


<ul>
<li>docker container running X-Ray daemon can gather ECS Segment data</li>
</ul>

