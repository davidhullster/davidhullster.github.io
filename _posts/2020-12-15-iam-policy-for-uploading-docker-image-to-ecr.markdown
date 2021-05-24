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
<pre>
{
  "Version": "2012-10-17","Statement": 
    [
      {
        "Sid": "",
        "Effect": "Allow","Action": 
          [
            "ecr:CreateRepository",
            "ecr:CompleteLayerUpload",
            "ecr:GetAuthorizationToken",
            "ecr:UploadLayerPart",
            "ecr:InitiateLayerUpload",
            "ecr:BatchCheckLayerAvailability",
            "ecr:PutImage"
          ],
        "Resource": "*"
      }
    ]
  }
</pre>
