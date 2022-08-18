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
 ```ini
[general]
users=[dsmith,bjones,rthompson]
flowers=[daisy,hyacinth,rose]
 ```
 * To view custom facts: `ansible <hostname> -m ansible.builtin.setup -a "filter=ansible_local"`
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
```jinja
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