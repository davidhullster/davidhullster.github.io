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
#### /var/log/nginx/error.log shows a Permission Denied error after trying to reload nginx after turning on ModSecurity you might need to configure SELinux to allow **executing** the modsecurity shared object:
   
<pre>
semanage fcontext -a -t httpd_exec_t '/etc/nginx/modules(/.*)?'
restorecon -R -v /etc/nginx/modules
</pre>
