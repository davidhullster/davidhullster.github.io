---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: IAM Policy for uploading docker image to ECR
date: 2020-12-15 05:55:33.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _last_editor_used_jetpack: block-editor
  timeline_notification: '1608011738'
  _publicize_job_id: '52241058269'
author:
  'Scratches'
permalink: "/2020/12/15/iam-policy-for-uploading-docker-image-to-ecr/"
---

<p><code>{<br />"Version": "2012-10-17",<br />"Statement": [<br />{<br />"Sid": "VisualEditor0",<br />"Effect": "Allow",<br />"Action": [<br />"ecr:CreateRepository",<br />"ecr:CompleteLayerUpload",<br />"ecr:GetAuthorizationToken",<br />"ecr:UploadLayerPart",<br />"ecr:InitiateLayerUpload",<br />"ecr:BatchCheckLayerAvailability",<br />"ecr:PutImage"<br />],<br />"Resource": "*"<br />}<br />]<br />}</code></p>

