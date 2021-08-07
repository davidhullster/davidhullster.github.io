---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: SELinux Tips
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- selinux
- Tech
tags: []
meta:
author:
  'Scratches'
---
### ngx_modsecurity_module.so: failed to map segment from shared object: Permission Denied
<p>After installing a module in Nginx, /var/log/nginx/error.log can show a Permission Denied error when trying to reload nginx. You might need to configure SELinux to allow **executing** the shared object file: 

<pre>
semanage fcontext -a -t httpd_exec_t '/etc/nginx/modules(/.*)?'

restorecon -R -v /etc/nginx/modules
</pre>
