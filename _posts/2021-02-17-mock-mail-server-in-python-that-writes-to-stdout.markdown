---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: mock mail server in python that writes to stdout
date: 2021-02-17 00:23:31.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- Tech
tags:
- Python
meta:
  _last_editor_used_jetpack: block-editor
  _publicize_job_id: '54879448395'
  timeline_notification: '1613521415'
author:
  'Scratches'
permalink: "/2021/02/17/mock-mail-server-in-python-that-writes-to-stdout/"
---

python -m smtpd -n -c DebuggingServer localhost:8025

