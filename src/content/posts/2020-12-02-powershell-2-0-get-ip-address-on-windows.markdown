---
layout: posts
header-img: img/post-bg-2015a.jpeg
title: Powershell 2.0 get ip address (Windows 2008)
date: '2025-02-15T21:52:00.000Z'
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
  - powershell
  - Tech
tags: []
meta:
  _last_editor_used_jetpack: block-editor
  _publicize_job_id: '51759137807'
  timeline_notification: '1606943547'
author: Scratches
permalink: /2020/12/02/powershell-2-0-get-ip-address-on-windows/
---

<pre>ip_address=(Get-WmiObject 
                  -Class Win32_NetworkAdapterConfiguration 
                  -Filter 'IPEnabled=True').IPAddress</pre>

