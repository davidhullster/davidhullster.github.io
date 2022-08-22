---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Symlink log files to stdout and stderr
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- symlink
- logs
- stdout
- stderr
tags: []
meta:
author:
  'Scratches'
---
### Symlink logfile writes to stdout and stderr
<pre>
ln -sf /dev/stdout /var/log/nginx/access.log \
&& ln -sf /dev/stderr /var/log/nginx/error.log
</pre>

<pre>
man ln -- make links between files
       ln [OPTION]... [-T] TARGET LINK_NAME
       ln [OPTION]... TARGET
       ln [OPTION]... TARGET... DIRECTORY
       ln [OPTION]... -t DIRECTORY TARGET...

In  the 1st form, create a link to TARGET with the name LINK_NAME.  
In the 2nd form, create a link to TARGET in the current directory.  
In the 3rd and 4th forms, create links to each TARGET in  DIRECTORY. 
</pre>