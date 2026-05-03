---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: List installed applications in Windows
date: 2020-12-01 04:12:18.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags:
- powershell
- win32_product
- windows
meta:
  _last_editor_used_jetpack: block-editor
  _publicize_job_id: '51686267631'
  timeline_notification: '1606795942'
author:
  'Scratches'
permalink: "/2020/12/01/list-installed-applications-in-windows/"
---
<pre>
Get-CimInstance win32_product | Select-Object Name, PackageName, InstallDate | Out-GridView
</pre>



look in both locations for installed software
<pre>
HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall (no results on my Win10 install)HKLM:\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall
</pre>
