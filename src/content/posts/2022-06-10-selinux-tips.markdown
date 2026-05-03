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
### Updating SELinux Permissions for Nginx

<b>ngx_modsecurity_module.so: failed to map segment from shared object: Permission Denied</b>
<p>After installing a module in Nginx, /var/log/nginx/error.log can show a Permission Denied error when trying to reload nginx. You might need to configure SELinux to allow **executing** the shared object file: 

<pre>
semanage fcontext -a -t httpd_exec_t '/etc/nginx/modules(/.*)?'

restorecon -R -v /etc/nginx/modules
</pre>
<br>
<p>On RHEL with a Node.js app that wouldn't start, I saw this error:
<pre>
Aug  8 16:19:20 ip-172-31-1-214 systemd[1]: Failed to start web-client Node.js service.
</pre>
<br>
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
<p>Then I was able to successfully restart the Node.js app</p>
<br>

<b>Getting "Permission Denied while connectng to upstream" error in the Nginx error log. Resolved by enabling network access from nginx.</b>
<pre>
setsebool -P http_can_network_connect 1
</pre>
<br>
<b>Create semanage policy file by processing audit.log</b>
<b>grep <application-name> /var/log/audit/audit.log and pipe to audit2allow -M <application-name></b>
<pre>
grep nginx /var/log/audit/audit.log | audit2allow -M nginx

* this creates an SELinux policy file called nginx.pp, and a textual version of that as nginx.te
* Run the following commands to enable the policy:
    semodule -i nginx.pp
    semodule --enable nginx
* Also, view the `nginx.te` file and run the `restorecon -R -v` lines shown there to enable the policy you just imported.
</pre>
<br>
<b>Installing audit2allow
<pre>
On Centos, running `yum provides audit2allow` returns:
policycoreutils-python-2.5-34.el7.x86_64 : SELinux policy core python utilities
  Repo        : base
  Matched from:
  Filename    : /usr/bin/audit2allow
</pre>

<pre>
$> systemctl status web-client3
Aug 15 13:23:01 ip-172-31-1-214.us-west-2.compute.internal systemd[1]: Failed to start web-client Node.js service.

$> grep 'avc: denied' /var/log/audit/audit.log
type=SYSCALL msg=audit(1629033781.299:4509): arch=c000003e syscall=49 success=no exit=-13 a0=12 a1=7ffca623f4b0 a2=1c a3=7ffca623f424 items=0 ppid=1 pid=21379 auid=4294967295 uid=65534 gid=65534 euid=65534 suid=65534 fsuid=65534 egid=65534 sgid=65534 fsgid=65534 tty=(none) ses=4294967295 comm="node" exe="/usr/bin/node" subj=system_u:system_r:httpd_t:s0 key=(null)ARCH=x86_64 SYSCALL=bind AUID="unset" UID="nobody" GID="nobody" EUID="nobody" SUID="nobody" FSUID="nobody" EGID="nobody" SGID="nobody" FSGID="nobody"
type=AVC msg=audit(1629033781.299:4510): avc:  denied  { name_bind } for  pid=21379 comm="node" src=3101 scontext=system_u:system_r:httpd_t:s0 tcontext=system_u:object_r:unreserved_port_t:s0 tclass=tcp_socket permissive=0


$> grep node /var/log/audit/audit.log | audit2allow -m node
#============= httpd_t ==============

#!!!! This avc is allowed in the current policy
allow httpd_t self:process execmem;

#!!!! This avc can be allowed using the boolean 'nis_enabled'
allow httpd_t unreserved_port_t:tcp_socket name_bind;


$> grep node /var/log/audit/audit.log | audit2allow -M node

$> cat node.te
cat node.te 

module node 1.0;

require {
	type httpd_t;
	type unreserved_port_t;
	class process execmem;
	class tcp_socket name_bind;
}

#============= httpd_t ==============

#!!!! This avc is allowed in the current policy
allow httpd_t self:process execmem;

#!!!! This avc can be allowed using the boolean 'nis_enabled'
allow httpd_t unreserved_port_t:tcp_socket name_bind;

How to log server name when all upstream servers are local?
$upstream_addr
access_log /var/log/nginx/$host/$upstream_addr;
</pre>