---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: decrypt an ansible string
date: 2020-09-19 17:55:09.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  timeline_notification: '1600538112'
  _publicize_job_id: '49001529518'
author:
  'Scratches'
permalink: "/2020/09/19/decrypt-an-ansible-string/"
---

This will prompt for vault password

<pre>
ansible-vault decrypt oo-encrypted.txt --output=/dev/stderr &gt; /dev/null
</pre>
