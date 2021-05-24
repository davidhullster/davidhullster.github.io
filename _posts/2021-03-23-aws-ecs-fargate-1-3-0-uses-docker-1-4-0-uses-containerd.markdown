---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS ECS FarGate 1.3.0 uses Docker, 1.4.0 uses containerd
date: 2021-03-23 20:50:59.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
- Tech
- terraform
tags: []
meta:
  _last_editor_used_jetpack: block-editor
  timeline_notification: '1616532663'
  _publicize_job_id: '56302580752'
author:
  'Scratches'
permalink: "/2021/03/23/aws-ecs-fargate-1-3-0-uses-docker-1-4-0-uses-containerd/"
---

In terraform the ECS version can be specified.<br>
Using platform_version 1.3.0 uses Docker for your containers.<br>
Using platform_version 1.4.0 uses containerd.
<pre>
'platform_version' resource "aws_ecs_service" "main" {
    name = "tools-ecs-service"
    cluster = aws_ecs_cluster.main.id
    task_definition = aws_ecs_task_definition.app.arn
    desired_count = var.app_count
    launch_type = "FARGATE"
    platform_version = "1.3.0"
}
</pre>
