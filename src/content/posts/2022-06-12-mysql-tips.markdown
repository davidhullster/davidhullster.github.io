---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: MySql Tips
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- mysql
- Tech
tags: []
meta:
author:
  'Scratches'
---
### reset mysql root password
<pre>
1. Stop Service
2. mysqld_safe --skip-grant-tables &
    mysql
    UPDATE mysql.user SET Password=PASSWORD('the-pw') WHERE User='root';
    FLUSH PRIVILEGES;
    \q
3. mysqladmin -u root -p shutdown
     enter new pw
4. Start service
</pre>