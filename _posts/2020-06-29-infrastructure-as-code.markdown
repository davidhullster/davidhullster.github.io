---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Infrastructure as Code - Reusable Templates
date: 2020-06-29 03:16:35.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _publicize_job_id: '45974810022'
  timeline_notification: '1593400599'
author:
  'Scratches'
permalink: "/2020/06/29/infrastructure-as-code/"
---

<p><strong>Reuseable Templates</strong></p>


<ul>
<li><strong>Nested Stacks</strong> and <strong>Cross-Stack References </strong>can be used to modularize stack templates</li>
<li>Nested Stacks create a parent-child relationship between the two stacks
<ul>
<li>each time you create a stack from the parent template, a new child stack is created</li>
</ul>
</li>
<li>Nested stacks allow sharing sharing infrastructure code across projects, while keeping the stacks completely separate</li>
<li>Cross-Stack References allow a stack to <strong>export</strong> values that other stacks can <strong>import</strong>
<ul>
<li>promotes service-oriented model with loose coupling</li>
<li>allows sharing single set of resources across multiple projects</li>
</ul>
</li>
</ul>


<p><strong>Template Linting</strong></p>


<ul>
<li>CloudFormation provides the ValidateTemplate API
<ul>
<li>checks for proper JSON or YAML syntax</li>
</ul>
</li>
</ul>


<p><strong>Summary</strong></p>


<ul>
<li>Information Resource Lifecycle starts with provisioning of resources
<ul>
<li>CloudFormation is a template-based way of creating resources and dependencies</li>
<li>Allows maintaining infrastructure the same way as version-controlled source code</li>
</ul>
</li>
</ul>

