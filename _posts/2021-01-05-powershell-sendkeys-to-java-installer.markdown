---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Powershell sendKeys to Java installer
date: 2021-01-05 23:13:29.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _last_editor_used_jetpack: block-editor
  _publicize_job_id: '53066181332'
  timeline_notification: '1609888413'
author:
  'Scratches'
permalink: "/2021/01/05/powershell-sendkeys-to-java-installer/"
---
##### We used this to enable sending keystrokes to a Java-based installer in Windows
<pre>
[void] [System.Reflection.Assembly]::LoadWithPartialName("System.Drawing")
[void] [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms")
[void] [System.Reflection.Assembly]::LoadWithPartialName("'Microsoft.VisualBasic")
[Microsoft. VisualBasic.Interaction]::AppActivate($conf.installerMainTitle)

[System.Windows.Forms.SendKeys]::SendWait(%n)
</pre>
