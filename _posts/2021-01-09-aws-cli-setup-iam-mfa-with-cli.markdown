---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS CLI - setup iam mfa with cli
date: 2021-01-09 16:05:33.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
tags:
- aws cli
- aws iam
- mfa
- security
meta:
  _last_editor_used_jetpack: block-editor
  timeline_notification: '1610208338'
  _publicize_job_id: '53221318804'
author:
  'Scratches'
permalink: "/2021/01/09/aws-cli-setup-iam-mfa-with-cli/"
---
#### Use AWS CLI to setup virtual MFA device token
<pre>aws iam create-virtual-mfa-device 
  --virtual-mfa-device-name {username} outfile /home/{username}/QRCode.png 
  --bootstrap-method QRCodePNG</pre>

<pre>aws iam enable-mfa-device --user-name {username} 
  --serial-number arn:aws:iam::{useridnumber}:mfa/{username} 
  --authentication-code-1 {code1} --authentication-code-2 {code2}</pre>

QRCode.png can be copied to S3 to setup virtual MFA device like Google Authenticator



