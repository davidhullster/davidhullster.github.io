---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Kubernetes delete all running pods
date: 2021-02-24 04:18:46.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
- kubernetes
- Tech
tags: ['k8s','kubctl','pods']
meta:
  _last_editor_used_jetpack: block-editor
  timeline_notification: '1614140330'
  _publicize_job_id: '55191812593'
  _oembed_3d72ede95a24fba1156b40fa0984fd18: "{{unknown}}"
author:
  'Scratches'
permalink: "/2021/02/24/kubernetes-delete-all-running-pods/"
---

<pre>kubectl delete pods -n development 
        `kubectl get pods -n development | grep Running | awk '{print $1}'`</pre>

