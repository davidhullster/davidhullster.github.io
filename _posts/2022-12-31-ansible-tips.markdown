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
- ansible
- replace
- regex
tags: []
meta:
author:
  'Scratches'
---
### ansible playbook to replace text in config file
<pre>
---
- hosts: labservers
  become: yes
  tasks:
    - name: change config
      replace:
        path: /etc/httpd/conf/httpd.conf
        regexp: '^DocumentRoot.*$'
        replace: 'DocumentRoot "/opt/www/"'
        backup: yes
</pre>