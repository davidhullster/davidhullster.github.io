---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Install gopls
date: 2021-04-02 02:37:24.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _last_editor_used_jetpack: block-editor
  _publicize_job_id: '56673359920'
  timeline_notification: '1617331049'
author:
  'Scratches'
permalink: "/2021/04/02/install-gopls/"
---

<p>Solves an issue where gopls hung in vim on Ubuntu and CentOS</p>


<p><code>Vim hung with this a bottom of vim window: <br />   vim-go: initializing gopls</code></p>


<p>ensure you're running the the latest go version, this worked for me on go1.16.3</p>


<p><code>go get golang.org/x/tools/gopls@latest</code></p>

