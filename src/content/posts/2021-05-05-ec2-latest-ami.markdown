---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS CLI run-instances with keyname and region
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
- aws cli
- aws ec2
tags: []
meta:
author:
  'Scratches'
---

<pre>aws ec2 run-instances \
        --image-id $(aws ssm get-parameters \
        --names /aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2 \
        --query 'Parameters[0].[Value]' --output text --profile $PROFILE_NAME \
        --region <REGION>) --count 1 --instance-type t3.small \
        --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=configruletest}]' --keyname <KEYNAME> \
        --profile $PROFILE_NAME --region <REGION>
</pre>