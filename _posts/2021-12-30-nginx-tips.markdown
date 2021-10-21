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

### Force Ngnix to do DNS resolution on proxy_pass URL's (every 5 minutes default)
[AWS Nginx Proxy Config for OpenSearch](https://aws.amazon.com/premiumsupport/knowledge-center/opensearch-outside-vpc-nginx/)
<pre>
Navigate to the /etc/nginx/conf.d directory, and then create a file called default.conf. Modify the file with the following values:
/etc/nginx/cert.crt: the path to your SSL certificate
/etc/nginx/cert.key: the path to the private key that you generated for the SSL certificate
$domain-endpoint: your OpenSearch Services endpoint
$cognito_host: your Amazon Cognito user pool domain (that you configured in Step 2)

You can use the sed command to assign $domain-endpoint and $cognito_host as variables, instead of replacing them directly in the default.conf file. Also, make sure to use HTTPS, or you might encounter an error.

Important: The resolver parameter changes according to your VPC settings. The DNS resolver is located at your primary CIDR block's base IP plus two. For example, if you create a VPC with CIDR block 10.0.0.0/24, then your DNS resolver is located at 10.0.0.2.

resolver 10.0.0.2 ipv6=off;

server {
    listen 443;
    server_name $host;
    rewrite ^/$ https://$host/_plugin/dashboards redirect;
</pre>