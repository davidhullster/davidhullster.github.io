---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Change committer name and email in Git history
date: 2021-03-20 17:29:28.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- git
- Tech
tags: []
meta:
  _last_editor_used_jetpack: block-editor
  _publicize_job_id: '56176203141'
  timeline_notification: '1616261372'
author:
  'Scratches'
permalink: "/2021/03/20/change-committer-name-and-email-in-git-history/"
---

<pre>
#!/bin/sh
git filter-branch --env-filter 
'OLD_EMAIL="bad-email-address@example.com"
CORRECT_NAME="FULL NAME"
CORRECT_EMAIL="EMAIL ADDRESS@example.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
  export GIT_COMMITTER_NAME="$CORRECT_NAME"
  export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
  then
  export GIT_AUTHOR_NAME="$CORRECT_NAME"
  export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi' --tag-name-filter cat -- --branches --tags
</pre>

