---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Python Method Resolution Order .__mro__
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- python
- inheritance
- mro
- Tech
tags: []
meta:
author:
  'Scratches'
---
### Python Method Resolution Order
When dealing with class inheritance, it can be tricky to understand which objects are inherited in which order.
Using ```<classname>.__mro__``` returns the order that objects are accessed. 