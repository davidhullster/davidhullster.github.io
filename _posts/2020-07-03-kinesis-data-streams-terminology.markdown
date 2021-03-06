---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Kinesis Data Streams Terminology
date: 2020-07-03 03:02:49.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _publicize_job_id: '46131132084'
  timeline_notification: '1593745372'
author:
  'Scratches'
permalink: "/2020/07/03/kinesis-data-streams-terminology/"
---

<strong>Kinesis Data Stream</strong>


<ul>
<li>A Kinesis data stream is set of shards. Each shard is a sequence of data records.
<ul>
<li>each data record in a shard has a sequence number, assigned by Kinesis Streams.</li>
</ul>
</li>
</ul>


<strong>Data Record</strong>


<ul>
<li>A data record is the unit of data stored in a Kinesis data stream. Data records are composed of a sequence number, a partition key, and a data blob.
<ul>
<li>a data blob is an immutable sequence of bytes</li>
<li>Kinesis Data Streams does not inspect, interpret or change the data in the blob in any way</li>
<li>a blob can be up to 1 MB</li>
</ul>
</li>
</ul>


<strong>Retention Period</strong>


<ul>
<li>the retention period is the length of time that data records are accessible after they are added to the stream.</li>
<li>A streams retention period is set to a default of 24 hours after creation</li>
<li>You can increase the retention period up to 168 hours (7 days)
<ul>
<li>use IncreaseStreamRetentionPeriod to increase</li>
<li>use DecreaseStreamRetentionPeriod to decrease to minimum of 24 hours</li>
</ul>
</li>
</ul>


<strong>Producer</strong>


<ul>
<li>Producers put records into Amazon Kinesis Data Streams. For example, a web server sending log data to a stream is a producer.</li>
</ul>


<strong>Consumer</strong>


<ul>
<li>Consumers get records from Amazon Kinesis Data Streams and process them</li>
<li>These consumers are known as Amazon Kinesis Data Streams Applications.</li>
</ul>


<strong>Amazon Kinesis Data Streams Application</strong>


<ul>
<li>An Amazon Kinesis Data Streams application is a consumer of a stream that commonly runs on a fleet of EC2 instances.</li>
</ul>


<strong>Shard</strong>


<ul>
<li>A shard is a uniquely identified sequence of data records in a stream.</li>
<li>A stream is composed of one or more shards</li>
<li>Each shard produces a fixed unit of capacity</li>
<li>The data capacity of your stream is a function of the <strong>number</strong> of shards that you specify in your stream</li>
<li>The total capacity of the stream is the sum of the capacity of its shards.</li>
<li>If you data rate increases, you can increase or decrease the number of shards allocated to your stream</li>
</ul>


<strong>Partition Key</strong>


<ul>
<li>A partition key is used to group data by shard within a stream.</li>
<li>Kinesis data streams segregates the data records belonging to a stream into multiple shards.</li>
<li>It uses the partition key that is associated with each data record to determine which shard a given data record belongs to.</li>
<li>When an application puts data into a stream, it must specify a partition key.</li>
</ul>


<strong>Sequence Number</strong>


<ul>
<li>Each data record has a sequence number that is unique per partition-key within its shard</li>
<li>Kinesis Data Streams assigns the sequence number after you write to the stream with client.putRecords or client.putRecord. Sequence numbers for the same partition key generally increase over time. The longer the time period between requests, the larger the sequence numbers become.</li>
</ul>


<strong>Kinesis Client Library</strong>


<ul>
<li>The Kinesis Client Library is compiled into your application to enable fault-tolerant consumption of data from the stream.</li>
<li>The Kinesis Client Library ensures that every shard has a record processor running and processing that shard.</li>
<li>The library also simplifies reading data from the stream.</li>
<li>The Kinesis Client Library uses an Amazon DynamoDB table to store control data.</li>
<li>It creates one table per application that is processing data.</li>
</ul>


<strong>Application Name</strong>


<ul>
<li>The name of the Amazon Kinesis Data Streams application identifies the application.</li>
<li>Each of your applications must have a unique name that is scoped to the AWS account and Region used by the application</li>
<li>This name is used as a name for the control table in Amazon DynamoDB and the namespace for Amazon CloudWatch metrics.</li>
</ul>


<strong>Server Side Encryption</strong>


<ul>
<li>Amazon Kinesis Data Streams can automatically encrypt sensitive data as a producer enters it into the stream</li>
<li>Kinesis Data Streams uses AWS KMS master keys for encryption</li>
</ul>

