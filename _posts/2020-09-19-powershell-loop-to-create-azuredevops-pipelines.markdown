---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Powershell loop to create AzureDevOps pipelines
date: 2020-09-19 18:05:36.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags:
- azureDevOps
- create pipelines
- powershell
meta:
  timeline_notification: '1600538738'
  _publicize_job_id: '49001801894'
  _oembed_d70d5c50d2960b0dc2507deb931aea7e: "{{unknown}}"
author:
  'Scratches'
permalink: "/2020/09/19/powershell-loop-to-create-azuredevops-pipelines/"
---

$pipeline_names = $("pipeline1", "pipeline2")$environment_name = 'test_environment'$branch = 'master'


cd C:\\repo\directoryforeach ($pipeline in $pipeline_names) { az pipelines create --name ${pipeline}-deployment --description "Deploy ${pipeline} into ${environment_name}" --repository ${repo_name} --repository-type tfsgit --branch ${branch} --yml-path ${pipeline}\${environment_name}\pipeline.yaml }

