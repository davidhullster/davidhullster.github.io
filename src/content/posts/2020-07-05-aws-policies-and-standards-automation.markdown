---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS Policies and Standards Automation
date: 2020-07-05 02:51:35.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  timeline_notification: '1593917498'
  _publicize_job_id: '46202682996'
author:
  'Scratches'
permalink: "/2020/07/05/aws-policies-and-standards-automation/"
---

<strong>AWS Config</strong>


<ul>
<li><strong>Error</strong>: "We are unable to complete the request at this time. Please contact AWS Support."
<ul>
<li>either AWS Config <strong>Aggregator limit </strong>has been reached
<ul>
<li>default is 50 configuration aggregators</li>
</ul>
</li>
</ul>
<ul>
<li>OR <strong>StartConfigRulesEvaluation</strong> API has exceeded more than<strong> one request</strong> per minute</li>
</ul>
</li>
</ul>


<strong>Amazon States Language</strong>


<ul>
<li><strong>InputPath</strong> --&gt; selects which parts of the JSON input to pass to the task of the Task state</li>
<li><strong>Parameters</strong> --&gt; pass collection of key-value pairs.
<ul>
<li>Values are either static values defined in your state configuration</li>
<li>OR selected from the input using the path</li>
</ul>
</li>
<li><strong>OutputPath</strong> --&gt; filters the JSON output to <strong>further</strong> limit info passed to Output</li>
<li><strong>ResultPath</strong> --&gt; selects what combination of the state <strong>input</strong> and the task <strong>result</strong> to pass to the output</li>
</ul>


<strong>AWS Support Plans</strong>


<ul>
<li>Trust Advisor Checks
<ul>
<li>only Business and Enterprise support has <strong>all</strong> Trust Advisor Checks enabled</li>
</ul>
</li>
<li>Enterprise Support Plan
<ul>
<li>has better response time, but only for business applications:
<ul>
<li>Microsoft</li>
<li>SAP</li>
<li>Oracle</li>
</ul>
</li>
</ul>
</li>
</ul>


<strong>AWS Systems Manager</strong>


<ul>
<li><strong>Run Command</strong> Feature
<ul>
<li>install ssm <strong>agent</strong></li>
<li>ensure required <strong>roles</strong> configured</li>
</ul>
</li>
<li>AWS Systems Manager Patch Manager</li>
<li>AWS Systems Manager Maintenance Windows</li>
</ul>


<strong>Amazon Macie</strong>


<ul>
<li>use machine learning to scan S3 buckets
<ul>
<li>scan for PII</li>
<li>create PII dashboards and alerts</li>
</ul>
</li>
</ul>


<strong>Trusted Advisor</strong>


<ul>
<li>Business Level
<ul>
<li>includes Cost Optimization suggestions</li>
</ul>
</li>
</ul>


<strong>AWS Secrets Manager</strong>


<ul>
<li>store database passwords</li>
<li><strong>limit</strong> access to only developers</li>
<li>rotate passwords on a <strong>schedule</strong></li>
</ul>


<strong>AWS Config</strong>


<ul>
<li><strong>record</strong> configuration changes</li>
<li>store <strong>snapshots</strong> of configuration at regular intervals</li>
<li>AWS Config data from <strong>multiple</strong> accounts can be aggregated into a <strong>single</strong> account</li>
<li><strong>Built-In</strong> Rules
<ul>
<li>s3-bucket-server-side-encryption-enabled</li>
<li>iam-user-mfa-enabled</li>
</ul>
</li>
<li><strong>tag</strong> resources</li>
</ul>



