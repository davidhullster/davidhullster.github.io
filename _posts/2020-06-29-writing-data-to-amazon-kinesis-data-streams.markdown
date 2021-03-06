---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Writing Data to Amazon Kinesis Data Streams
date: 2020-06-29 05:00:36.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  timeline_notification: '1593406839'
  _publicize_job_id: '45976804461'
author:
  'Scratches'
permalink: "/2020/06/29/writing-data-to-amazon-kinesis-data-streams/"
---

<ul>
<li>A producer is an application that writes data to Amazon Kinesis Data Streams</li>
<li>An Amazon Kinesis Data Streams producer is an application that puts user data records into a Kineses data stream</li>
<li>The Kinesis Producer Library simplifies producer application development
<ul>
<li>allows developers to achieve high write throughput to a Kinesis data stream</li>
</ul>
</li>
</ul>


<strong>Benefits of using Kinesis Data Streams</strong>


<ul>
<li>Common use is the real-time aggregation of data, followed by loading the data into a data warehouse or map-reduce cluster</li>
<li>Data on Kinesis data streams are ensured of durability and scalability</li>
<li>Data can be retrieved less than 1 second after it's put on the stream</li>
<li>Multiple Kinesis Data Streams applications can consume data from a stream
<ul>
<li>archiving and processing can take place concurrently/independently</li>
</ul>
</li>
<li>Kinesis Client Library allows fault-tolerant consumption of stream data
<ul>
<li>provides scaling support for Kinesis Data Streams applications</li>
</ul>
</li>
</ul>


<strong>Creating and Updating Data Streams</strong>


<ul>
<li>Amazon Kinesis Data Streams ingests data, stores the data and makes it available for consumption</li>
<li>Unit of data stored by Kinesis data streams is a <strong>data record</strong></li>
<li>A group of data records is a <strong>data stream</strong>
<ul>
<li>the data records in a data stream are distributed into <strong>shards</strong></li>
</ul>
</li>
</ul>


<strong>Data Shards</strong>


<ul>
<li>A shard <strong>has</strong> a sequence of data records in a stream</li>
<li>When you <strong>create</strong> a stream, you specify the <strong>number</strong> of shards for the stream</li>
<li>The <strong>Total Capacity</strong> of a stream is the <strong>sum of the capacities</strong> of its shards
<ul>
<li>the <strong>number of shards</strong> in the stream can be increased or decreased
<ul>
<li>you are charged on a per-shard basis</li>
</ul>
</li>
</ul>
</li>
<li>A <strong>producer</strong> puts data records into shards</li>
<li>A <strong>consumer</strong> gets data records from shards</li>
</ul>


<strong>Re-sharding Errors with Kinesis Data Streams</strong>


<ul>
<li>When sharding some streams, an <strong>extra shard </strong>can be left after the operation finishes</li>
<li>If an even number of shards was requested, the number of open shards became odd</li>
<li>This occurs when the <strong>width</strong> of a shard is very <strong>small</strong> in relation to other shards in the stream
<ul>
<li>Resolve by merging the extra shard with any adjacent shard</li>
</ul>
</li>
<li>This issue occurs when the <strong>difference</strong> between <strong>StartingHashKey</strong> and <strong>EndingHashKey</strong> is very small, like '1'
<ul>
<li>normally the difference between <strong>StartingHashKey</strong> and <strong>EndingHashKey</strong> is large</li>
</ul>
</li>
<li>This can normally be resolved by finding the ShardID with the next adjacent Hash Key value, and merging the small shard into that shard</li>
</ul>

