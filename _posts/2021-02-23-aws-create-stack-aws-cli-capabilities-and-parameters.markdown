---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS create-stack aws cli capabilities and parameters
date: 2021-02-23 23:21:27.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
- CAPABILITY_IAM
tags:
- capability
- aws
- awscli
- create-stack
meta:
  _last_editor_used_jetpack: block-editor
  timeline_notification: '1614122491'
  _publicize_job_id: '55183843388'
author:
  'Scratches'
permalink: "/2021/02/23/aws-create-stack-aws-cli-capabilities-and-parameters/"
---

<a href="https://aws.amazon.com/blogs/devops/passing-parameters-to-cloudformation-stacks-with-the-aws-cli-and-powershell/">https://aws.amazon.com/blogs/devops/passing-parameters-to-cloudformation-stacks-with-the-aws-cli-and-powershell/</a>


<pre>
for i in clients inventory renting resource;
  do echo ${i}-api;     
    aws cloudformation create-stack --stack-name development-iam-policy-${i}-api
    --template-body file://${i}-api/infra/cloudformation/iam-policy.json
    --parameters ParameterKey=Namespace,ParameterValue=development
    --capabilities CAPABILITY_NAMED_IAM;
    echo =====; 
  done
</pre>
