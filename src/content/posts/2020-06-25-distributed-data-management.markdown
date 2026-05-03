---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Distributed Data Management
date: 2020-06-25 04:33:34.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  timeline_notification: '1593059618'
  _publicize_job_id: '45831442862'
author:
  'Scratches'
permalink: "/2020/06/25/distributed-data-management/"
---

<ul>
<li>Each microservice should have its own data persistence layer</li>
<li>distributed microservice architectures trade <strong>consistency</strong> for <strong>performance</strong></li>
<li>need to embrace eventual consistency</li>
<li>you end up with some partial transactions, so we need some control logic to redo already processed transactions</li>
</ul>


<strong>Distributed Saga Pattern</strong>


<ul>
<li>In the case of a failed transaction Saga orchestrates a series of compensating transactions that undo the changes that were made </li>
<li>AWS Step Functions make it easy to implement a Saga execution coordinator</li>
</ul>

