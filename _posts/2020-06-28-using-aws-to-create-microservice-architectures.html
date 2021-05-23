---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Using AWS to Create Microservice Architectures
date: 2020-06-28 19:20:23.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  timeline_notification: '1593372027'
  _publicize_job_id: '45964160588'
author:
  'Scratches'
permalink: "/2020/06/28/using-aws-to-create-microservice-architectures/"
---

<p><strong>User Interfaces</strong></p>


<ul>
<li>User Interfaces for microservices are typically Javascript</li>
<li>Javascript can be chatty and cause latency</li>
<li>Caching services are often used to reduce communication overhead</li>
</ul>


<p><strong>Microservices</strong></p>


<ul>
<li>microservice entry points are typically REST APIs</li>
<li>AWS Lambda and Docker containers with AWS Fargate are popular services to build microservices</li>
</ul>


<p><strong>Private Links</strong></p>


<ul>
<li>AWS PrivateLink privately connects your VPC to supported AWS services without traversing the Internet</li>
</ul>


<p><strong>Data Store</strong></p>


<ul>
<li>Persist data needed by microservices</li>
<li>Session data can be stored in in-memory caches, i.e. <br>memcached or redis</li>
<li>Amazon ElastiCache supports both memcached and redis</li>
<li>Caches reduce read load on databases, resources can support more load</li>
<li>Caches can reduce latency</li>
<li>AWS RDS can run MS SQL Server, Oracle, MySQL, MariaDB, PostgreSQL, Amazon Aurora</li>
<li>DynamoDB is a managed NoSQL database, fast and infinite scaling</li>
<li>DynamoDB Accelerator provides caching and single-digit millisecond performance</li>
</ul>


<p><strong>API Implementation</strong></p>


<ul>
<li>Amazon API Gateway reduces operating complexity of creating and maintaining REST APIs</li>
</ul>


<p><strong>Serverless Microservices</strong></p>


<ul>
<li>Lambda is tightly integrated with API Gateway</li>
<li>Removes need to design for scale</li>
<li>Reduces operations overhead</li>
<li>AWS Fargate can be used to run Docker containers on serverless infrastructure</li>
</ul>


<p><strong>Deploying Lambda-Based Applications</strong></p>


<ul>
<li>Cloudformation can be used to define, deploy and configure serverless applications</li>
<li>AWS Serverless Application Model can define serverless applications</li>
<li>AWS SAM simplifies syntax for defining serverless resources</li>
<li>AWS SAM is natively supported by CloudFormation</li>
<li>SAM Local can create a local testing environment that simulates the AWS runtime environment</li>
</ul>


<p><strong>Distributed Systems Components</strong></p>


<ul>
<li>Cross-Service Challenges with microservice applications
<ul>
<li>service discovery</li>
<li>data consistency</li>
<li>asynchronous communication</li>
<li>distributed monitoring and auditing</li>
</ul>
</li>
</ul>


<p><strong>Service Discovery</strong></p>


<ul>
<li>DNS-Based Service Discovery can be done using Route53 or by connecting every service to a load balancer</li>
<li>Amazon ECS creates and manages a registry of service names
<ul>
<li>maps service names to a set of DNS records</li>
<li>based on Route53 Auto Naming API</li>
</ul>
</li>
<li>Unified Service Discovery for services managed by Kubernetes</li>
<li>AWS CloudMap provides a service registry for resources</li>
</ul>


<p><strong>Service Meshes</strong></p>


<ul>
<li>AWS App Mesh provides application-level networking
<ul>
<li>allows services to communicate with each other across different compute infrastructure</li>
</ul>
</li>
</ul>


<p><strong>Distributed Data Management</strong></p>


<ul>
<li>Each microservice should have its own data persistence layer</li>
<li>Common for state changes to affect more than one microservice
<ul>
<li>event sourcing is a useful pattern to manage state changes</li>
</ul>
</li>
<li>Event sourcing --&gt; persist every application change as an event record
<ul>
<li>benefits: state can be determined and <strong>reconstructed</strong> at any time</li>
</ul>
</li>
<li>Amazon Kinesis Data Streams can serve as the main component in a data store
<ul>
<li>captures app change events and saves them to S3</li>
</ul>
</li>
</ul>


<p><strong>Asynchronous Communication and Lightweight Messaging</strong></p>


<p><strong>REST-Based Communication</strong> </p>


<ul>
<li>microservices usually use RESTful API's with HTTP transport layer</li>
<li>API Gateway can host the REST API for your backend services
<ul>
<li>scaling, traffic management, auth, access control, monitoring and api version management are all handled by API GW</li>
</ul>
</li>
</ul>


<p><strong>Asynchronous Messaging and Event Passing</strong></p>


<ul>
<li>Services can communicate by exchanging messages via a queue</li>
<li>No service discovery needed</li>
<li>Keeps services loosely coupled</li>
<li>Amazon SQS and Amazon SNS can be used together to implement this pattern
<ul>
<li>one message can be delivered to multiple customers</li>
</ul>
</li>
<li>Amazon MQ can be used if software is using open standard APIs
<ul>
<li>manages administration and maintenance of ActiveMQ</li>
</ul>
</li>
</ul>


<p><strong>Orchestration and State Management</strong></p>


<ul>
<li>distributed microservices make it complex to orchestrate workflows</li>
<li>adding orchestration code to services can make them tightly coupled, and tight coupling slows down development and innovation</li>
<li>AWS Step Functions can build applications out of individual components
<ul>
<li>each component performs a discreted function</li>
</ul>
</li>
<li>Step Functions creates a state machine</li>
</ul>


<p><strong>Distributed Monitoring</strong></p>


<ul>
<li>Amazon CloudWatch
<ul>
<li>collect and track metrics</li>
<li>centralize and monitor log files</li>
<li>set alarms</li>
<li>automatically react to changes in your AWS environment</li>
</ul>
</li>
</ul>


<p><strong>Monitoring</strong></p>


<ul>
<li>System wide visibility in resource utilization, application performance, operational health</li>
<li>Prometheus is an open-source monitoring and alerting toolkit
<ul>
<li>often used with Amazon EKS</li>
<li>often used in combination with Grafana to visually collected metrics</li>
<li>Kubernetes components store metrics at /metrics, Prometheus can scrape this location at regular intervals</li>
</ul>
</li>
</ul>


<p><strong>Centralizing Logs</strong></p>


<ul>
<li>AWS services centralize logs files by default</li>
<li>Most centralize logs on S3 and/or CloudWatch</li>
</ul>


<p><strong>Distributed Tracing</strong></p>


<ul>
<li>AWS X-Ray can use correlation Ids </li>
<li>trace id added to HTTP request headers: X-Amzn-Trace-Id</li>
<li>Using X-Ray SDK any microservice can read and add or update this header</li>
</ul>


<p><strong>Options for Log Analysis on AWS</strong></p>


<ul>
<li>Amazon CloudWatch Logs Insights: explore, analyze, visualize logs</li>
<li>Amazon ElasticSearch plus Kibana can be used to analyze logs</li>
<li>Amazon RedShift with Amazon QuickSight can be used for analysis, reporting and visualization</li>
</ul>


<p><strong>Chattiness</strong></p>


<ul>
<li>Distributed nature of microservices means they communicate frequently over the network</li>
<li>REST over HTTP is lightweight, but can cause problems at high message volumes</li>
</ul>


<p><strong>Caching</strong></p>


<ul>
<li>Caches reduce latency and chattiness</li>
<li>Amazon ElastiCache can reduce the volume of calls to other services by caching results locally</li>
<li>Amazon API Gateway has a built-in caching layer</li>
<li>Caching requires finding the right balance between a good cache hit rate and the timeliness/consistency of data</li>
</ul>


<p><strong>Auditing</strong></p>


<ul>
<li>To help enforce security policies, it is important to audit both <strong>resource</strong> access and activities that lead to <strong>system</strong> changes</li>
<li>Changes occur more frequently in microservice applications than in monoliths</li>
</ul>


<p><strong>Audit Trail</strong></p>


<ul>
<li>AWS CloudTrail tracks changes in microservices
<ul>
<li>enables API calls to be logged</li>
<li>logs are sent either to CloudWatch in real-time</li>
<li>or sent to Amazon S3 within several minutes</li>
<li>CloudTrail can search across accounts in AWS Organizations</li>
</ul>
</li>
</ul>


<p><strong>Events and Real-Time Actions</strong></p>


<ul>
<li>CloudWatch Events can integrate with CloudTrail to create events for all API calls that make changes.</li>
<li>Can generate custom events, or events based on a schedule</li>
<li>AWS Config rules define security policies with specific rules to automatically detect, track and alert on policy violations</li>
<li>AWS Config rules can write to an SQS queue where Lambda can automatically resolve issue</li>
</ul>

