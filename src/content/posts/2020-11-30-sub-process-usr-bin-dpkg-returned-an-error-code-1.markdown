---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: sub-process /usr/bin/dpkg returned an error code (1)
date: 2020-11-30 15:37:03.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags:
- apt
- dpkg
- error
- linux
- ubuntu
- wsl
meta:
  _last_editor_used_jetpack: block-editor
  _publicize_job_id: '51663856091'
  timeline_notification: '1606750628'
author:
  'Scratches'
permalink: "/2020/11/30/sub-process-usr-bin-dpkg-returned-an-error-code-1/"
---
#### This was the help on dpkg errors when running yum updates in Windows WSL Ubuntu
<pre>
Options to Fix sub-process /usr/bin/dpkg returned an error code (1)
sub-process returned an error code ubuntu updateMethod 1: Reconfigure dpkg Database
If your package database has become corrupted, reconfiguring it can repair it.

Enter the following command:
</pre>
<pre>
sudo dpkg --configure -a
</pre>

This command reconfigures packages that have been unpacked but not necessarily installed. An interruption at the wrong time can cause this database to become corrupt. This is especially helpful if you were running installation and the process was interrupted.

