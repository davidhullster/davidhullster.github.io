---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Jenkins Tips
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- jenkins
- Tech
tags: []
meta:
author:
  'Scratches'
---
### Backup jobs directories with subdirectories but not builds directories
<pre>
  tar zcvf jenkins-backup-jobs.tar.gz --exclude "builds" /var/tmp/jenkins/jobs/
</pre>

### Extract archive to /opt/jenkins/, stripping off '/var/tmp/jenkins/' from the extracted files
<pre>
  tar zxvf jenkins-backup-jobs.tar.gz --strip-components=3 -C /opt/jenkins/
</pre>
