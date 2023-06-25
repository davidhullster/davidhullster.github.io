---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Python Loop over List and swap elements
categories:
- lsof
- linux
- 
tags:
- linux
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