---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Windows Create Secure Creds
date: 2020-10-29 02:29:10.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags:
- auth
- remote
- remote login
- SecureString
- windows
meta:
  _last_editor_used_jetpack: block-editor
  _publicize_job_id: '50451574628'
  timeline_notification: '1603938553'
  _oembed_1d0d75a90a778c94725436ab522aee39: "{{unknown}}"
  _oembed_36a3981526a0f2b812e1d4e5ddef5132: "{{unknown}}"
  _oembed_976fbdd53e60b4d194e43860b3576186: "{{unknown}}"
  _oembed_7e54677b5c35811643a9a139a63a56f1: "{{unknown}}"
  _oembed_0c309d83aba5d2a65c40531422333c45: "{{unknown}}"
author:
  'Scratches'
permalink: "/2020/10/29/windows-create-secure-creds/"
---
#### In a secure Windows environment, create a SecureString to authenticate between Windows computers
<pre>
$adminName = 'admin-username'

$pw = 'St00p1dP@ssw0rd'

$pwSecure = $pw | ConvertTo-SecureString -AsPlainText -Force

$cred = New-Object pscredential ($adminName, $pwSecure)
</pre>
