---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS CLI describe-images from describe-instances
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
- aws cli
- aws ami
tags: []
meta:
author:
  'Scratches'
---

<pre>aws ec2 describe-images --owner amazon --image-id $(aws ec2 describe-instances --instance-ids i-05e7e29b0d2d2a58c --query "Reservations[0].Instances[0].ImageId" --output text) --query "Images[0].Name" --output text</pre>
<b>amzn2-ami-hvm-2.0.20211201.0-x86_64-gp2</b>