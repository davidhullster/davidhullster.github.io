#### use openssl to create a pem file to ssh into an aws instance 
<pre>ssh-keygen -t rsa -b 4096 -m PEM -f vm_base
mv vm_base vm_base.pem</pre>