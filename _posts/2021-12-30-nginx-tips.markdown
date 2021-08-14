---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Nginx Tips
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- nginx
- Tech
tags: []
meta:
author:
  'Scratches'
---
### Create Self-Signed SSL Certificate for Nginx
<pre>
  mkdir /etc/nginx/ssl
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/private.key \
    -out /etc/nginx/ssl/public.pem
</pre>

### Minimal Nginx Config to Use New Certificate
<pre>
  server {
    ...
    listen 443 ssl;
    ...

    ssl_certificate /etc/nginx/ssl/public.pem;
    ssl_certificate_key /etc/nginx/ssl/private.key;
  }
</pre>
### Password-Protect Nginx Pages
<pre>
  server {
    ...
    location = /secure.html {
      auth_basic "login required";
      auth_basic_user_file /etc/nginx/.htpasswd
    }
  }
</pre>
### Add Encrypted Passwords to .htpasswd File
<pre>
  Centos/RH: yum install -y httpd-tools
  Ubuntu/Deb: apt-get install -y apache2-utils

  >> htpasswd -c /etc/nginx/.htpasswd $USERNAME
    --> enter new password

  curl -u admin:$PASSWORD localhost/secure.html 
</pre>
<pre>
cat example.com.conf 
server {
	listen 80;
	server_name example.com;

	location / {
		proxy_pass http://127.0.0.1:8000;
		proxy_http_version 1.1;
		proxy_set_header Host $host;
		proxy_set_header X-Forwarded-for $proxy_add_x_forwarded_for;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header Connection "";
	}
}

</pre>
<pre>
server {
	listen 80;
	server_name blog.example.com;
	root /var/www/blog;

	index index.php;

	location / {
		try_files $uri $uri/ /index.php?$args;
	}

	location ~ \.php$ {
		fastcgi_index index.php;
		fastcgi_pass unix:/var/run/php-fpm.sock;
		include fastcgi_params;
		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
	}
}

</pre>