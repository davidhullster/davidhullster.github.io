---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: ansible install on ubuntu
date: 2020-09-19 17:53:22.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  timeline_notification: '1600538004'
  _publicize_job_id: '49001483580'
author:
  'Scratches'
permalink: "/2020/09/19/ansible-install-on-ubuntu/"
---
#### Add ppa repo for ansible install on ubuntu
<pre>
sudo apt update
sudo apt install software-properties-common
sudo apt-add-repository --yes --update ppa:ansible/ansible
sudo apt install ansible
</pre>
