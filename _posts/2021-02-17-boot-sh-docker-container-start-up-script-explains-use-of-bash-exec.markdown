---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: 'boot.sh: Docker container start-up script -- explains use of ''bash exec'''
date: 2021-02-17 00:09:29.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _last_editor_used_jetpack: block-editor
  timeline_notification: '1613520573'
  _publicize_job_id: '54879014856'
author:
  'Scratches'
permalink: "/2021/02/17/boot-sh-docker-container-start-up-script-explains-use-of-bash-exec/"
---



#!/bin/sh
source venv/bin/activate
flask db upgrade
exec gunicorn -b :5000 --access-logfile - --error-logfile - microblog:app


<p>Note the&nbsp;<code>exec</code>&nbsp;that precedes the gunicorn command. <br>In a shell script,&nbsp;<code>exec</code>&nbsp;triggers the process running the script to be replaced with the command given, instead of starting it as a new process. <br>This is important, because Docker associates the life of the container to the first process that runs on it. <br>In cases like this one, where the start up process is not the main process of the container, you need to make sure that the main process takes the place of that first process to ensure that the container is not terminated early by Docker.</p>

