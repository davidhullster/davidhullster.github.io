---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: High Availability, Fault Tolerance and Disaster Recovery
date: 2020-07-06 02:00:45.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _publicize_job_id: '46236056302'
  timeline_notification: '1594000848'
author:
  'Scratches'
permalink: "/2020/07/06/high-availability-fault-tolerance-and-disaster-recovery/"
---

<strong>AWS Solution to migrate data from relational database to DynamoDB</strong>


<ul>
<li>use Amazon DMS to migrate data to a DynamoDB table</li>
<li>create a task in an object mapping rule to copy needed relational DB tables to DynamoDB</li>
<li>within object-mapping set Partition Key and Sort Key
<ul>
<li>i.e. WeatherStationId as Partition key, and</li>
<li>timestamp as Sort Key</li>
</ul>
</li>
</ul>


<strong>Amazon Aurora Read Replica Errors</strong>


<ul>
<li>a configuration change was made, now the following errors occur:
<ul>
<li>RDS-Event-0045</li>
<li>RDS-Event-0046</li>
</ul>
</li>
<li>Resolution: ensure max_allowed_packet parameter on the Read Replica is set to the same value as it is on the Source DB</li>
</ul>


<strong>Connect AWS SSO to Microsoft ActiveDirectory</strong>


<ul>
<li>Connect AWS SSO to Microsoft ActiveDirectory</li>
<li>AWS SSO with ActiveDirectory allows both types of user credentials:
<ul>
<li>UPN: &lt;username&gt;</li>
<li>DOMAIN\&lt;username&gt;</li>
</ul>
</li>
<li>You can't use UPN if you have two-step verification plus Content-Aware verification</li>
</ul>


<strong>AWS Organizations and AWS Managed Microsoft AD</strong>


<ul>
<li>AWS Organizations and AWS Managed Microsoft AD must be in the same region and in the same account</li>
<li>Implement AWS Organizations with 'All Features' enabled
<ul>
<li>deploy the AD Connector residing in the master account</li>
</ul>
</li>
<li>Ensure the number of SSO Permission Sets are less than 500</li>
<li>Ensure the number of Microsoft AD Groups is less than 1500</li>
</ul>


<strong>Amazon DynamoDB Global Tables</strong>


<ul>
<li>Global Tables create a multi-master and multi-region data store</li>
<li>DynamoDB Streams will propogate changes between the replicas</li>
<li>enables multi-region replication</li>
<li>enables multi-master writes</li>
</ul>


<strong>Canary Deployments Rout53 Configuration</strong>


<ul>
<li>Install new app in new Auto Scaling Group</li>
<li>Use 'Weighted Routing' policy in Route53</li>
<li>use 5%, 50% 100% traffic to new ASG if tests are successful</li>
</ul>


<strong>CloudFormation UpdateReplacePolicy</strong>


<ul>
<li>use on resources that are important not to replace
<ul>
<li>example is RDS instances that lose data when replaced</li>
</ul>
</li>
<li>set UpdateReplacePolicy to Retain</li>
</ul>


<strong>CloudFormation Change Set</strong>


<ul>
<li>CloudFormation Change Sets allow previewing the effects of a change
<ul>
<li>you can see if resources will be replaced by a CFN update</li>
</ul>
</li>
</ul>


<strong>IPv6 with ALB's and NLB's</strong>


<ul>
<li>currently, only Application Load Balancers support IPv6</li>
<li>currently, NLB's do not support IPv6</li>
</ul>


<strong>Troubleshoot DynamoDB Latency</strong>


<ul>
<li>Implement DAX cluster to cache common queries
<ul>
<li>this reduces latency on common queries</li>
</ul>
</li>
<li>Group separate attributes into JSON Blobs
<ul>
<li>this reduces DynamoDB scan times</li>
</ul>
</li>
<li>Use AWS SDK in development to make AWS X-Ray tracing available</li>
</ul>


<strong>AWS DirectConnect limits data traversing the Internet</strong>


<ul>
<li>provision an AWS DirectConnect connection to your local router in your datacenter</li>
<li>connect the DirectConnect connection to your VPC</li>
<li>push backups via DirectConnect</li>
</ul>

