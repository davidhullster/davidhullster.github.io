---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Git Tips
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
author:
  'Scratches'
---
### Enable Default encryption for new EBS volumes, run once per account
<pre>
aws ec2 enable-ebs-encryption-by-default --region us-east-1
{
    "EbsEncryptionByDefault": true
}
</pre>

