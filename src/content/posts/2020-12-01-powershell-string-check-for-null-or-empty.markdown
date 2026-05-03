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
<pre>
if([string]::IsNullOrEmpty($VERSION)){
  Write-Host "No NSM Version Found" $installType='new install'
}
</pre>
<pre>
$VERSION 
  -notmatch "\S" &gt; $null  
  -notmatch "\S" True &gt; "   "  
  -notmatch "\S" True &gt; " x "  
  -notmatch "\S" False
</pre>
