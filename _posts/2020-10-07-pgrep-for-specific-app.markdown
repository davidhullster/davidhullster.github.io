---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: top -- pgrep for specific app
date: 2020-10-07 19:10:37.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags:
- linux
- pgrep
- processes
- top
- utilities
meta:
  timeline_notification: '1602097840'
  _publicize_job_id: '49671713080'
  _last_editor_used_jetpack: block-editor
author:
  'Scratches'
permalink: "/2020/10/07/pgrep-for-specific-app/"
---
## Make top return results for only one process
<pre>
top -p $(pgrep -d, "(events|sshd)")
</pre>
