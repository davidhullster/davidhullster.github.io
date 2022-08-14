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
```yaml
---
- hosts: labservers
  become: yes
  handlers:
    - name: restart apache
      service: name="httpd" state="restarted"
      listen: "restart web"
  tasks:
    - name: make directory
      file:
        path: /opt/www
        state: directory
        mode: '0755'
    - name: change config
      replace:
        path: /etc/httpd/conf/httpd.conf
        regexp: '^DocumentRoot.*$'
        replace: 'DocumentRoot "/opt/www"'
        backup: yes
      notify: "restart web"
```
### Download URL and replace string in downloaded file
```yaml
---
- hosts: all
  become: yes
  name: download list
    block:
      - get_url:
          url: http://apps.l33t.example.com/transaction_list
           dest: "/home/ansible/transaction_list"
    rescue:
      - debug: msg="l33t.com appears to be down. Try again later."  
    always:
        - debug: msg="Attempt Completed"
  tasks:
  - name: remove blank lines
    replace:
      path: "/home/ansible/transaction_list"
      regexp: '#BLANKLINE'
      replace: '\n'
```
### ansible playbook to loop over strings to create users
```yaml
---
- hosts: labservers
  become: yes
  tasks:
    - name: create users
      user:
        name: "{{item}}"
      with_items:
        - sam
        - john
        - bob
```
### ansible playbook using _when_ to conditionally add line to files
```yaml
---
- hosts: labservers
  become: yes
  tasks:
    - name: edit index.html
      lineinfile:
        path: /var/www/html/index.html
        line: "I'm back!!!"
      when:
        - ansible_hostname == "b320bd293e2c"
```
### ansible playbook configure error handling
* ignoring acceptable errors
* defining failure conditions
* defining "changed"
* try-catch blocks
  * block-rescue blocks 
  * optional _always_ block
#### ignoring acceptable errors, i.e. apache stopped
```yaml
---
- hosts: labservers
  become: yes
  tasks:
    - name: get files
      get_url:
        url: http://{{item}}/index.html
        dest: "/tmp/{{item}}"
      ignore_errors: yes
      with_items:
        - b320bd293e2c
        - b320bd293e1c
```
### Blocks and Rescues - Rescue debug msg appears instead of error
```yaml
---
- hosts: labservers
  name: get file
  block:
    - get_url:
      url: http://localhost/index.html
      dest: "/tmp/index_file"
  rescue:
    - debug: msg="The file does not exist"
  always:
    - debug: msg="Play done!"
```
### Selectively run specific tasks using tags
```yaml
---
- hosts: labservers
  become: yes
  tasks:
  - name: deploy app binary
    copy:
      src: /home/user/apps/hello
      dest: /var/www/html/hello
    tags:
      - webdeploy
- hosts: db
  become: yes
  tasks:
  - name: make scripts directory
    file:
      path: /opt/deb/scripts
      state: directory
      mode: '0755'
  - name:
    copy:
      src: /home/user/apps/script.sql
      dest: /opt/db/scripts/script.sql
    tags:
      - dbdeploy
```
### Download compressed file and unzip to local directory
```yaml
---
- hosts: web
  become: yes
  tasks:
    - name: install httpd
      yum:
        name: httpd
        state: latest
    - name: start httpd
      service:
        name: httpd
        state: started
        enabled: yes
    - name: download and unzip remote file
      unarchive:
        src: http://repo.example.com/website.tgz 
        dest: /var/www/html
        remote_src: yes
```