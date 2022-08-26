---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Ansible playbooks and templates
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
        mode: "0755"
    - name: change config
      replace:
        path: /etc/httpd/conf/httpd.conf
        regexp: "^DocumentRoot.*$"
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

- ignoring acceptable errors
- defining failure conditions
- defining "changed"
- try-catch blocks
  - block-rescue blocks
  - optional _always_ block

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

### Blocks and Rescues - multiple plays in same block-rescue-always block

```yaml
---
- hosts: localhost
  tasks:
    - name: download file and replace line in it
      block:
        - get_url:
            url: http://apps.example.com/transaction_list
            dest: /home/ansible/transaction_list
        - replace:
            path: /home/ansible/transaction_list
            regexp: "#BLANKLINE"
            replace: '\n'
        - debug: msg="File downloaded"
      rescue:
        - debug: msg="example.com appears to be down. Try again later."
      always:
        - debug: msg="Attempt completed!"
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
        mode: "0755"
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

### Use template module to copy template to apache conf directory

- template files are text files with extension .j2
- templates have access to variables in play's scope

```yaml
---
- hosts: all
  tasks:
    - name: ensure apache at latest version
      yum: name=httpd state=latest
    - name: write the apache config file
      template: src=/srv/httpd.j2 dest=/etc/httpd.conf
```

### Sample ansible template
* ansible fact to pull IPv4 address
```jinja
IP ADDRESS: {{ ansible_default_ipv4.address }}
OS DISTRO: {{ ansible_distribution }}
```

### Ansible playbook to deploy a file created with a template
```yaml
---
- hosts: localhost
  tasks:
  - name: deploy local net file
    template:
      src: /home/user/template/network.j2
      dest: /home/user/template/network.txt
```

### Ansible Variables and Facts
* ansible variables
 * vars, var_files and vars_prompt
 * ansible-playbook play.yml -e '{"varKey":"varValue","varKey2":"varValue2"}'
 * - debug: msg="This is the variable: { varKey }"
* dictionary variables
 * varName['KeyName'] or varName.KeyName
* magic variables and filters
 * special variables i.e. `hostvars` allows looking at facts about _other_ hosts in inventory
 * `{{ hostvars['node1']['ansible_distribution'] }}` - look at ansible_distribution fact for node1
 * `{{ groups['labservers'] }}` - get list of servers in a group in inventory
 * Jinja2 filters can be used to modify ansible variables
  * `{{ groups['labservers']|join(' ') }}` turn list of hosts into space-separated list
  * https://jinja.palletsprojects.com/en/3.1.x/templates/#list-of-builtin-filters
* ansible facts
* Facts.d - create your own custom facts
 * To use facts.d, create an /etc/ansible/facts.d directory on the remote host or hosts.
 * Add files to the directory to supply your custom facts. All file names must end with .fact. 
 * The files can be JSON, INI, or executable files returning JSON.
```
[general]
users=[dsmith,bjones,rthompson]
flowers=[daisy,hyacinth,rose]
```
 * To view custom facts: `ansible <hostname> -m ansible.builtin.setup -a "filter=ansible_local"`
### Use a variable in a playbook
```
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
```bash
ansible-playbook userList.yaml -e "@users.lst"
```
```yaml
---
- hosts: localhost
  vars:
    userFile: /home/ansible/vars/list
  tasks:
  - name: create file
    file:
      state: touch
      path: "{{ userFile }}"
  - name: list users
    lineinfile:
      path: "{{ userFile }}"
      line: "{{ item }}"
    with_items:
      - "{{ staff }}"
      - "{{ faculty }}"
      - "{{ other }}"
```
### Ansible Facts
* filter facts for ipv4 information
```bash
ansible all -m setup -a "filter=*ipv4*"
"{{ ansible_default_ipv4.address }}"
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
      name: "{{ secure_user }}"         # dictionary key from 'vault' file
      password: "{{ secure_password }}" # dictionary key from 'vault' file
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
      name: "{{ secure_user }}"
      password: "{{ secure_password }}"
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