---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Incident and Event Response
date: 2020-07-06 01:36:24.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
---

<strong>Amazon CloudSearch vs ElasticSearch</strong>


<ul>
<li><strong>CloudSearch</strong> is a <strong>managed</strong> service
<ul>
<li><strong>no</strong> agents to install</li>
<li><strong>no</strong> servers to manage</li>
</ul>
</li>
<li><strong>Elastic Search</strong>
<ul>
<li>requires ElasticSearch <strong>agent</strong></li>
<li>runs on EC2 instances </li>
</ul>
</li>
</ul>


<strong>Amazon Inspector</strong>


<ul>
<li>automated security <strong>assessment</strong></li>
<li><strong>network</strong> assessment check does not require agent install</li>
</ul>


<strong>Kinesis Data Streams Performance</strong>


<ul>
<li><strong>develop</strong> code using <strong>Kinesis Producer Library</strong> to put data onto the streams</li>
<li>use a <strong>Small Producer</strong> with the Kinesis Producer Library
<ul>
<li>but use <strong>PutRecord</strong> operation</li>
</ul>
</li>
<li>Check Service Limits
<ul>
<li>GetShardIterator</li>
<li>CreateStream</li>
<li>DescribeStream</li>
</ul>
</li>
<li>Always use the KPL when writing code for Kinesis, where possible
<ul>
<li>Benefits: Performance, Monitoring, Asynch Performance</li>
</ul>
</li>
</ul>


<strong>Kinesis Stream Re-Sharding Error</strong>


<ul>
<li>scaled stream by increasing consumers (KCL) and <strong>re-sharding</strong> the stream</li>
<li>after <strong>re-sharding</strong> an <strong>extra</strong> shard was produced
<ul>
<li>this sometimes occurs when size of a shard is very <strong>small</strong>, like '1'</li>
</ul>
</li>
<li>resolve by <strong>merging</strong> small shard with <strong>adjacent</strong> shard</li>
<li>the difference between <strong>StartingHashKey</strong> and <strong>EndingHashKey</strong> is normally large</li>
</ul>

