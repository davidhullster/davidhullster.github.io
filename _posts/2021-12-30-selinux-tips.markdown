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
- nginx
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

<p>On RHEL with a Node.js app that wouldn't start, I saw this error:
<pre>
Aug  8 16:19:20 ip-172-31-1-214 systemd[1]: Failed to start web-client Node.js service.
</pre>
<p>I ran 'yum provides seinfo' and 'yum provides sealert' showed what to install to get more logging on SELinux errors. After the installs, starting my node service again gave me these verbose errors:
<pre>
Aug  8 16:19:20 ip-172-31-1-214 setroubleshoot[4026]: SELinux is preventing /usr/bin/node 
from using the execmem access on a process. For complete SELinux messages run: sealert -l 
96c61aac-cab4-459c-bd43-c9b3636b9889
Aug  8 16:19:20 ip-172-31-1-214 setroubleshoot[4026]: SELinux is preventing /usr/bin/node 
from using the execmem access on a process.#012#012*****  Plugin allow_execmem (53.1 confi
dence) suggests   *********************#012#012If you know why node needs to map a memory 
region that is both executable and writable and understand that this is a potential securi
ty problem.#012Then you can allow the mapping by switching one of the following booleans: 
httpd_execmem#012Do#012follow the advice of the catchall_boolean plugin, otherwise contact
 your security administrator and report this issue#012#012*****  Plugin catchall_boolean (
42.6 confidence) suggests   ******************#012#012If you want to allow httpd to execme
m#012Then you must tell SELinux about this by enabling the 'httpd_execmem' boolean.#012#01
2Do#012setsebool -P httpd_execmem 1#012#012*****  Plugin catchall (5.76 confidence) sugges
ts   **************************#012#012If you believe that node should be allowed execmem 
access on processes labeled httpd_t by default.#012Then you should report this as a bug.#0
12You can generate a local policy module to allow this access.#012Do#012allow this access 
</pre>
<p>After running the command shown in the logs:
<pre>
setsebool -P httpd_execmem 1
</pre>
<p>Then I was able to successfully restart the Node.js app

<p>Getting "Permission Denied while connectng to upstream" error in the Nginx error log. Resolved by enabling network access from nginx.
<pre>
setsebool -P http_can_network_connect 1
</pre>