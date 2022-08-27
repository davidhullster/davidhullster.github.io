---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Ansible playbooks and templates - part two
type: post
parent_id: "0"
published: true
password: ""
status: publish
categories:
  - ansible
  - replace
  - regex
tags: []
meta:
author: "Scratches"
---
### Use a variable in a playbook
```yaml
---
- hosts: localhost
  vars:
    inv_file: /home/ansible/vars/inv.txt
  tasks:
  - name:
    file:
      path: "{{ inv_file }}"
      state: touch
  - name: generate content in inv_file
    lineinfile:
      path: "{{ inv_file }}"
      line: "{{ groups['labservers']|join(' ') }}"
```
### yaml list
```yaml
staff:
  - joe
  - john
  - bob
  - sam
  - mark
faculty:
  - matt
  - alex
  - frank
other:
  - will
  - jack
```
### Playbook to create a list of users from users.lst
* use @ symbol to designate pulling data from a file ("@filename.txt")
```
ansible-playbook userList.yaml -e "@users.lst"
```

### playbook to loop over list of users
```yaml
---
- hosts: localhost
  vars:
    userFile: /home/ansible/vars/list
  tasks:
  - name: create file
    file:
      state: touch
      path: {% raw %}{{ userFile }}{% endraw %}
  - name: list users
    lineinfile:
      path: {% raw %}{{ userFile }}{% endraw %}
      line: {% raw %}{{ item }}{% endraw %}
    with_items:
      - {% raw %}{{ staff }}{% endraw %}
      - {% raw %}{{ faculty }}{% endraw %}
      - {% raw %}{{ other }}{% endraw %}
```
### Ansible Facts
* filter facts for ipv4 information
```bash
ansible all -m setup -a "filter=*ipv4*"
{% raw %}{{ ansible_default_ipv4.address }}{% raw %}
```
* custom facts can be created on the remote systems
* create in /etc/ansible/facts.d (default)
* create on remote systems, not on ansible host
```bash
ansible all -m setup -a "filter=ansible_local"
<remote_system> $ cat /etc/ansible/facts.d/prefs.fact
[location]
type=physical
datacenter=Alexandria
```
### Template to create sudoers file, plus validation
```yaml
---
- hosts: all
  vars:
    sudoers_directory: /etc/sudoers.d
    sudoers_file: hardened
  tasks:
  - name: create directory
    file:
      state: directory
      mode: "0755"
  - name: create file
    template:
      src: /home/ansible/template/sudoers.j2
      dest: "{{ sudoers_directory }}/{{ sudoers_file }}"
      validate: /usr/sbin/visudo -cf %s
```
### jinja2 template file for sudoers
```
%sysops "{{ ansible_default_ipv4.address }}" = (ALL) ALL
Host_Alias WEBSERVERS = "{{ groups['web']|join(',') }}"
Host_Alias DBSERVERS = "{{ groups['database']|join(',') }}"
%httpd WEBSERVERS = /bin/su - webuser
%dba DBSERVERS = /bin/su - dbuser
```
### Create and apply an ansible role
* /etc/ansible/roles/apache/main.yml
```yaml
---
- name: install apache
  yum: name=httpd state=latest

- name: copy httpd.conf template
  template:
    src: httpd.conf.j2
    dest: /etc/httpd/conf/httpd.conf
  notify: restart httpd

- name: enable and start service
  service:
    name: httpd
    enabled: yes
    state: started
```
### jinja2 template for httpd.conf role file
* /etc/ansible/roles/apache/templates/httpd.j2
```jinja
ServerAdmin "{{ apache_server_admin }}"
```
### define variable for apache_server_admin in ansible role defaults
```yaml
apache_server_admin: admin@example.com
```
### apache role defaults file
* /etc/ansible/roles/apache/defaults/main.yml
```yaml
apache_server_admin: admin@example.com
```
### apache role handler file
* /etc/ansible/roles/apache/handlers/main.yml
```yaml 
---
- name: restart apache service
  service: name=httpd state=restarted
  listen: "restart httpd"
```
### install.yml to install role
```yaml
---
- hosts: localhost
  become: yes
  roles:
    - apache
  vars:
    apache_server_admin: example@example.com
```
### alternative way to call a role - dynamically
* doesn't pre-load role, less verification before run
```yaml
---
- hosts: websrvers
  tasks:
  - include_role:
    name: apache
  tags:
  - RH_HTTPD
  when: "ansible_os_family" == "RedHat"
  ```
### encrypt a file with ansible-vault
* requires plain-text file on file-system
* use no_log parameter in playbooks when retrieving password from vault
```bash
[ansible@control1 ~]$ vim secure # password
[ansible@control1 ~]$ vim secret # 'the rain in spain'
[ansible@control1 ~]$ ansible-vault encrypt secret --vault-id dev@secure
Encryption successful
[ansible@control1 ~]$ cat secret
$ANSIBLE_VAULT;1.2;AES256;dev
30343231373030356365663339636235306262313639653036613961316631666334366132616534
3161333366356462613438373537326266343638366539320a363937366437386365396265393437
30333938393931666438386636363164343939376232633237663936343266663037393565356531
3266656562626331640a303334303566366335643439656339366165323261326261643037353035
63616263396663636339646337343436396538316564303765343562306336653766
[ansible@control1 ~]$ cat secure
password
[ansible@control1 ~]$ ansible-vault decrypt secret
Vault password: 
Decryption successful
[ansible@control1 ~]$ cat secret
the rain in spain
```
### decrypt a password using a playbook, passing the vault-id on the command line
```bash
[ansible@control1 ~]$ vim secure # password
[ansible@control1 ~]$ ansible-vault view secret
Vault password: 
secure_user: bond
secure_password: james
[ansible@control1 ~]$ ansible-vault encrypt secret
New Vault password: 
Confirm New Vault password: 
Encryption successful
[ansible@control1 ~]$ cat secret 
$ANSIBLE_VAULT;1.1;AES256
31323265306133343635633465646531343338623332393464386330383336633362343233616464
6566376163333335373766383063383665303835396636390a653434303533643966366636313837
38366330666235396563326134653835656435383661393036363763643065366462666532643037
6233623965356338640a646136633063363861623535303736623161613532356364636231336665
31376362303731656633656539323862316533346234353965663466653565653361396135333730
3362386537643462666436376239363431643738636337626563
[ansible@control1 ~]$ ansible-playbook secPage.yml --vault-id dev@vault
```
### snippet of ansible playbook creating variable from encrypted 'secret' file, decrypted at runtime by commandline arg
```yaml
---
- hosts: webservers
  become: yes
  vars_files: 
    - /home/ansible/secret
  - name: create users for basic auth
    htpasswd:
      path: /var/www/html/secure/.passwdfile
      name: {% raw %}{{ secure_user }}{% raw %}         # dictionary key from 'vault' file
      password: {% raw %}{{ secure_password }}{% raw %} # dictionary key from 'vault' file
```
```bash
[ansible@control1 ~]$ ansible-playbook secPage.yml --vault-id dev@vault
```
#### After playbook completes
```bash
[ansible@control1 ~]$ curl -u bond http://10.0.1.80/secure/classified.html
Enter host password for user 'bond': # value of 'secure_password': james
"It's always sunny in Moscow this time of year...."
```
## ansible playbook to create page secured by htpassword 
```yaml
---
- hosts: webservers
  become: yes
  vars_files: 
    - /home/ansible/secret
  tasks:
  - name: install apache
    yum: name=httpd state=latest
  - name: configure httpd as necessary
    template:
      src: /home/ansible/assets/httpd.conf.j2
      dest: /etc/httpd/conf/httpd.conf
  - name: create secure directory
    file: state=directory path=/var/www/html/secure mode=0755
  - name: deploy htaccess file
    template:
      src: /home/ansible/assets/htaccess.j2
      dest: /var/www/html/secure/.htaccess
  - name: make sure passlib is installed for htpasswd module
    yum: name=python-passlib state=latest
  - name: create users for basic auth
    htpasswd:
      path: /var/www/html/secure/.passwdfile
      name: {% raw %}{{ secure_user }}{% raw %}
      password: {% raw %}{{ secure_password }}{% raw %}
      crypt_scheme: md5_crypt
  - name: start and enable apache
    service: name=httpd state=started enabled=yes
  - name: install secure files
    copy:
      src: /home/ansible/assets/classified.html
      dest: /var/www/html/secure/classified.html
```
### install ansible on RHEL server
```bash
sudo yum install ansible -y
sudo useradd ansible
sudo passwd ansible
sudo visudo ## add ansible user with nopasswd option
>>> ansible     ALL=(ALL)     NOPASSWD: ALL
sudo vim /etc/hosts
>>> 12.34.167.890 labserver.mylabserver.com
>>> 98.76.543.210 lab1
>>> 87.65.432.109 lab2
sudo vim /etc/ansible/hosts
[labservers]
lab1
lab2
[local]
localhost
```
### shell script to run ansible ad-hoc command
```bash
#!/bin/bash
# command line first argument is $1

if [ -n "$1" ]; then
    echo "Package to install is $1"
else
    echo "Package to install was not supplied"
    exit
fi

ansible all -b -m yum -a "name=$1 state=present"
```
### install firewalld, shorthand syntax with 'action'
```bash
install-firewalld.yml
```
```yaml
---
- hosts: all
  user: ansible
  become: yes
  gather_facts: no
  tasks:
    - name: install firewalld
      action: yum name=firewalld state=installed
    - name: enable firewalld on system reboot
      service: name=firewalld enabled=yes
    - name: start service firewalld, if not started
      service:
        name: firewalld
        state: started
```
## install apache with firewalld blocking access
* the previous playbook installs and starts firewalld
* but doesn't open any ports, so httpd will fail to start
```yaml
---
- hosts: all
  user: ansible
  become: yes
  gather_facts: no
  tasks:
    - name: install elinks
      action: yum name=elinks state=installed
    - name: install httpd
      action: yum name=httpd state=installed
    - name: enable & start apache on system reboot
      service: name=httpd enabled=yes state=started
```
### update firewalld to allow http access
```yaml
 ---
 - hosts: all
   user: ansible
   become: yes
   gather_facts: no
   tasks:
     - name: set http port open in firewalld 
       firewalld:
         service: http
         permanent: yes
         state: enabled
     - name: restart firewalld with http port opened
       service:
         name: firewalld
         state: restarted
```
### using the Archive module to compress files
```yaml
---
- hosts: all
  user: ansible
  become: yes
  gather_facts: no
  tasks:
  - name: Compress directory /var/log/ into /home/ansible/logs.zip
    archive:
      path: /var/log
      dest: /home/ansible/logs.tar.gz
      owner: ansible
      group: ansible
      format: gz
```
### ansible playbook to update crontab using cron module
```yaml
---
- hosts: all
  user: ansible
  become: yes
  gather_facts: no
  tasks:
  - name: ensure a job exists that runs between 5am/5pm. Create an entry like "0 5,17 * * * df-h >> /tmp/diskspace"
    cron:
      name: "Job 0001"
      minute: "0"
      hour: "5,17"
      job: "df-h >> /tmp/diskspace"
```
### add environment variables to crontab playbook
```yaml
---
- hosts: all
  user: ansible
  become: yes
  gather_facts: no
  tasks:
  - name: creates an entry like "PATH=/opt/bin" at top of crontab
    cron:
      name: PATH
      env: yes
      job: /opt/bin
  - name: creates an entry like "APP_HOME=/srv/app" and inserts it after PATH declaration above
    cron:
      name: APP_HOME
      env: yes
      job: /srv/app
      insertbefore: PATH
  - name: ensure a job exists that runs between 5am/5pm. Create an entry like "0 5,17 * * * df-h >> /tmp/diskspace"
    cron:
      name: "Job 0001"
      minute: "0"
      hour: "5,17"
      job: "df-h >> /tmp/diskspace"
```
### Install AT module to schedule and run one-time tasks
```yaml
---
- hosts: all
  user: ansible
  become: yes
  gather_facts: no
  tasks:
    - name: install the at command for job scheduling
      service:
        name: atd
        enabled: yes
        state: started
```
### Create a task to schedule a task in AT
```yaml
---
- hosts: all
  user: ansible
  become: no
  gather_facts: no
  tasks:
    - name: Schedule a command to execute in 20 minutes as the ansible user
      at:
        command: df -h > /tmp/diskspace
        count: 20
        units: minutes
```
### Ansible for Security selinux-check.yml
```yaml
---
- hosts: all
  user: ansible
  become: yes
  gather_facts: no
  tasks:
  - name: Enable SELinux
    selinux:
      policy: targeted
      state: enforcing
```
### Install firewalld and ensure it's started
```yaml
---
- hosts: all
  user: ansible
  become: yes
  gather_facts: no
  tasks:
  - name: 
    action: yum name=firewalld state=installed
  - name: enable firewalld on system reboot
    service: name=firewalld enabled=yes
  - name: start service firewalld, if not started
    service:
      name: firewalld
      state: started
```
### Create linux user that expires, and belongs to a group
* create group
```yaml
---
- hosts: all
  user: ansible
  become: yes
  gather_facts: no
  tasks:
  - name: ensure group 'developers' exists
    group:
      name: developers
      state: present
```
* get password hash for password
```sh
# create user
sudo adduser tmpuser
# create a known password for user
sudo passwd tmpuser
# get password hash from /etc/shadow
sudo grep tmpuser /etc/shadow
>>> tmpuser:$randomstring....
# pwdhash is between first and second colon ':' in $randomstring
```
* convert desired user expiration date to epoch time https://www.epochconverter.com
### Playbook to create user in a group, add password and expiration in epoch time
```yaml
---
- hosts: all
  user: ansible
  become: yes
  gather_facts: no
  tasks:
  - name: add a user account that will expire on a specific date
    user:
      name: james20
      shell: /bin/bash
      groups: developers
      append: yes
      expires: REPLACE-WITH-EPOCH-TIME
      password: REPLACE-WITH-HASH
```