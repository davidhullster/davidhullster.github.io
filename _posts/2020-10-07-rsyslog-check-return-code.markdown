---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: rsyslog check return code
date: 2020-10-07 03:18:06.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags:
- bash
- linux
- return code
- rsyslog
- tools
- utilities
meta:
  timeline_notification: '1602040689'
  _publicize_job_id: '49645203310'
  _last_editor_used_jetpack: block-editor
author:
  'Scratches'
permalink: "/2020/10/07/rsyslog-check-return-code/"
---
<pre>
#!/bin/bash

  rsyslogd -N1

  retCode=$?

  if [ "$retCode" -eq 0 ]
  then
    echo ryslogd succeeded with return code: "$retCode"
  else
    echo rsyslogd failed with return code: "$retCode"
          exit 1
  fi
  echo "rsyslogd check completed"
</pre>
