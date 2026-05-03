---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: What is Continuous Integration and Continuous Delivery/Deployment?
date: 2020-07-11 19:49:01.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  timeline_notification: '1594496944'
  _publicize_job_id: '46458857787'
author:
  'Scratches'
permalink: "/2020/07/11/what-is-continuous-integration-and-continuous-delivery-deployment/"
---

<strong>Continuous Integration</strong>


<ul>
<li>Developers <strong>regularly</strong> merge code changes into a central repository
<ul>
<li>this <strong>triggers</strong> automated builds and tests</li>
</ul>
</li>
<li>CI is a build or integration phase
<ul>
<li>requires both an <strong>automation</strong> component, that is a CI or build service</li>
<li>AND a <strong>cultural</strong> component, this means developers learn to integrate frequently</li>
</ul>
</li>
<li>Key Goals
<ul>
<li>find and address <strong>bugs</strong> more quickly</li>
<li>improve software <strong>quality</strong></li>
<li><strong>reduce</strong> the time needed to validate and <strong>release</strong> new updates</li>
</ul>
</li>
<li>Focus on <strong>smaller</strong> commits and smaller code changes
<ul>
<li>commit code <strong>frequently</strong>, at least once a day</li>
<li>pull from repository <strong>before</strong> pushing, ensure local host is <strong>merged</strong></li>
<li><strong>after</strong> push build server runs various tests and rejects/accepts the commit</li>
</ul>
</li>
<li>Challenges
<ul>
<li>more <strong>frequent</strong> commits to codebase</li>
<li><strong>single</strong> source code repository</li>
<li>automating <strong>builds</strong></li>
<li>automating <strong>testing</strong></li>
</ul>
</li>
<li>Additional Challenges
<ul>
<li>test in <strong>prod-like</strong> environments</li>
<li>make <strong>process</strong> <strong>visible</strong> to team</li>
<li>allow developers to obtain <strong>any</strong> <strong>version</strong> of the application</li>
</ul>
</li>
</ul>


<strong>Continuous Delivery and Deployment</strong>


<ul>
<li>Code changes are automatically <strong>built</strong>, <strong>tested</strong> and prepared for <strong>production</strong> release</li>
<li>Expands on continuous integration
<ul>
<li>deploys all code changes to a <strong>testing</strong> environment, a <strong>production</strong> environment or <strong>both</strong>
<ul>
<li><strong>after</strong> a build stage has been completed</li>
</ul>
</li>
<li>Continuous delivery can be <strong>fully</strong> automated with a <strong>workflow</strong> process</li>
<li>OR <strong>partially</strong> automated with <strong>manual</strong> steps</li>
<li>ideally, developers should always have a <strong>deployment-ready</strong> build artifact
<ul>
<li>deployment ready means build has passed through a standardized <strong>testing</strong> process</li>
</ul>
</li>
<li>With CD, revisions are deployed to production automatically <strong>without</strong> explicit approval
<ul>
<li><strong>entire</strong> software release process should be automated</li>
<li>allows for continuous <strong>customer</strong> feedback loop <strong>early</strong> in product lifecycle</li>
</ul>
</li>
</ul>
</li>
</ul>

