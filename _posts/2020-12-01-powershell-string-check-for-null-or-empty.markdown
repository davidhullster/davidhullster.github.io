---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Powershell string check for null or empty
date: 2020-12-01 19:26:34.000000000 -08:00
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
  timeline_notification: '1606850798'
  _publicize_job_id: '51714083586'
author:
  'Scratches'
permalink: "/2020/12/01/powershell-string-check-for-null-or-empty/"
---

<p>if([string]::IsNullOrEmpty($VERSION)){</p>


<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Write-Host&nbsp;"No&nbsp;NSM&nbsp;Version&nbsp;Found"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$installType&nbsp;=&nbsp;'new&nbsp;install'</p>


<p>}</p>




<p>$VERSION -notmatch "\S"</p>


&gt; $null  -notmatch "\S"
True
&gt; "   "  -notmatch "\S"
True
&gt; " x "  -notmatch "\S"
False

