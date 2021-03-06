---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Using Data Management tools to redo transactions
date: 2020-06-25 14:12:59.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _publicize_job_id: '45847887305'
  timeline_notification: '1593094383'
author:
  'Scratches'
permalink: "/2020/06/25/using-data-management-tools-to-redo-transactions/"
---

<ul>
<li>Microservices need a way to synchronize their data and roll back state, where possible.</li>
<li>AWS Step functions allow implementation of a Saga Execution Coordinator
<ul>
<li>Builds a centralized store of critical reference data </li>
<li>curated by master data management tools and procedures</li>
</ul>
</li>
<li>Using Lambda and scheduled Amazon CloudWatch events you can build a simple cleanup and deduplication mechanism</li>
</ul>


<ul>
<li>Event Sourcing is useful where state changes affect multiple microservices
<ul>
<li>Persists every application change as an event record</li>
<li>Doesn't record application state</li>
<li>Data is stored as a stream of events</li>
</ul>
</li>
<li>State can be determined and reconstructed at any point in time</li>
<li>Produces a persistent audit trail</li>
<li>Assists in debugging</li>
</ul>


<ul>
<li></li>
</ul>



