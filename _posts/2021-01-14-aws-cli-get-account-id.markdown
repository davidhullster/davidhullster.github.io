---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS CLI get account id
date: 2021-01-14 14:36:54.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
- Tech
tags: ['aws', 'account number', 'get-caller-id']
meta:
  _last_editor_used_jetpack: block-editor
  _publicize_job_id: '53433774754'
  timeline_notification: '1610635019'
  _oembed_47ac60f877b171359f076ded1bf39a2b: "{{unknown}}"
author:
  'Scratches'
permalink: "/2021/01/14/aws-cli-get-account-id/"
---

To launch some stacks, you need the AWS account ID for each account. If you don’t know the account IDs, you can get them from the AWS CLI by using the **sts get-caller-identity** command.


<pre>#CentralAccount ID
aws sts get-caller-identity –profile CentralAccount ––query 'Account'
#DevAccount ID
aws sts get-caller-identity –profile DevAccount ––query 'Account'</pre>

