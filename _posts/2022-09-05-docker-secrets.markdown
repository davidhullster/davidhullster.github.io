---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Create Docker Secret from openssl rand
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- bash
- docker
- openssl
tags: []
meta:
author:
  'Scratches'
---

## write secret to stdout
<pre>
openssl rand -base64 20 | docker secret create my_secret_data -
</pre>

## write secret to file
<pre>
openssl rand -base64 20 > secret.txt
</pre>

## read file into docker secret
<pre>
docker secret create my_secret_data2 secret.txt
</pre>

## read docker secrets on command line
<pre>
docker secret ls
</pre>