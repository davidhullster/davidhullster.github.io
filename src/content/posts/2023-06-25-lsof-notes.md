---
layout: posts
header-img: img/post-bg-2015a.jpeg
title: list of all listening TCP ports with lsof
categories:
  - lsof
  - linux
  - null
tags:
  - linux
date: '2024-10-28T22:56:00.000Z'
---

<pre>
To get a list of all listening TCP ports with lsof type:

sudo lsof -nP -iTCP -sTCP:LISTEN
Copy
The options used are as follows:

-n - Do not convert port numbers to port names.
-p - Do not resolve hostnames, show numerical addresses.
-iTCP -sTCP:LISTEN - Show only network files with TCP state LISTEN.
</pre>
