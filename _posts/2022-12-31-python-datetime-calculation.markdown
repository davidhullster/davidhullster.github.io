---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Python function to tag aws instances based on AMI name
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
- datetime
- python
tags: []
meta:
author:
  'Scratches'
---

<pre>
for page in page_iterator['Contents']:  
  if page['LastModified'] <= utc.localize(datetime.datetime.now()) - datetime.timedelta(days=1):  
    print('Object is less than one day old')
</pre>