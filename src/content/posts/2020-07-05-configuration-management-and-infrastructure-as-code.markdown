---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Configuration Management and Infrastructure as Code
date: 2020-07-05 14:15:47.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  timeline_notification: '1593958550'
  _publicize_job_id: '46219159643'
author:
  'Scratches'
permalink: "/2020/07/05/configuration-management-and-infrastructure-as-code/"
---

<strong>CloudFormation Template Errors</strong>


<ul>
<li>Invalid Value or Unsupported Resource Property
<ul>
<li>EITHER Parameter naming mistake</li>
<li>OR Property names are unsupported</li>
</ul>
</li>
<li>Resource Failed to Stabilize
<ol>
<li>timeout exceeded, or</li>
<li>AWS service isn't available, or</li>
<li>AWS service was interrupted</li>
</ol>
</li>
</ul>


<strong>Stack Fails to Roll Back</strong>


<ul>
<li>most often happens when deployment account has permission to create stacks
<ul>
<li>but lacks permission to modify or delete stacks</li>
</ul>
</li>
</ul>


<strong>EC2 Auto Scaling</strong>


<ul>
<li>add <strong>hooks</strong> to launching and terminating stages of instance <strong>lifecycle</strong>
<ul>
<li>hooks can send <strong>SNS</strong> notification and <strong>hold</strong> the instance in Pending state</li>
<li><strong>trigger</strong> a Lambda function from the SNS topic</li>
</ul>
</li>
</ul>


<strong>Elastic Network Interface (ENI)</strong>


<ul>
<li>EC2 AutoScaling does not allow specifying a <strong>second</strong> ENI in the Launch Configuration</li>
<li>aws:createENI is <strong>not</strong> a valid SSM automation document action</li>
</ul>


<strong>CloudFormation</strong> <strong>Resource Replacement</strong>


<ul>
<li>RDS DB port changed
<ul>
<li>if "Port" attribute on AWS:RDS:DBInstance has update requirement of "Replacement"
<ul>
<li>DB will be replaced with new instance with possible data loss</li>
<li>DB will have to be restored from backups</li>
</ul>
</li>
</ul>
</li>
</ul>


<strong>CloudFormation DependsOn Resource</strong>


<ul>
<li>ensure first stack sends <strong>completion</strong> signal before starting second stack</li>
<li>add <strong>CreationPolicy</strong> with long <strong>timeout</strong> so first stack doesn't time out</li>
</ul>


<strong>Create Thumbnail Images from Full-Size Images in S3</strong>


<ul>
<li>upload <strong>full-size</strong> image to S3</li>
<li><strong>automate</strong> creating thumbnail images
<ul>
<li><strong>S3</strong> <strong>Event</strong> <strong>Trigger</strong> executes Lambda function</li>
<li><strong>Lambda</strong> function creates <strong>thumbnail</strong> and saves it to a different bucket</li>
</ul>
</li>
</ul>


<strong>Fargate Configuration Errors</strong>


<ul>
<li><strong>Invalid CPU Setting</strong></li>
<li><strong>Invalid Memory Setting</strong>
<ul>
<li>ensure values in Task Definition show as <strong>supported</strong> in documentation</li>
</ul>
</li>
<li><strong>Repository Not Found</strong>
<ul>
<li>incorrect <strong>ECR image </strong>specification</li>
<li>resolve by correctly updating <strong>URI</strong> or <strong>ARN</strong></li>
</ul>
</li>
</ul>


<strong>Lambda Throttling</strong>


<ul>
<li>Lamdba Throttle option used to troubleshoot Lambda function endless loops</li>
</ul>


<strong>Step Function Best Practices</strong>


<ol>
<li>Avoid latency when polling for Activity Tasks</li>
<li>Use ARN's instead of passing large payloads</li>
<li>Avoid Reaching History Limit (writing/saving too much history)</li>
</ol>


<strong>OpsWorks</strong>


<ul>
<li>allows creating applications with pre-built <strong>layer</strong> templates
<ul>
<li>create servers, RDS instances, load balancers, etc.</li>
</ul>
</li>
<li>allows using Chef-Solo recipes</li>
<li>allows multiple access levels: i.e. <strong>deploy</strong> permission and <strong>manage</strong> permissions</li>
</ul>


<strong>EC2 Spread Placement</strong>


<ul>
<li>distribute EC2 instances across different AZ's</li>
</ul>


<strong>Elastic Beanstalk</strong>


<ul>
<li>rolling deployment</li>
<li>roll back with <strong>manual</strong> deployment</li>
</ul>


<strong>Step Functions</strong>


<ul>
<li>error scenarios and retry strategies
<ul>
<li>runtime errors can occur in any stage
<ul>
<li>i.e. Lambda function throws exception</li>
<li>i.e. Network exception, timeout</li>
</ul>
</li>
<li>Runtime errors are handled differently than Failures
<ul>
<li>example: state machine definition errors</li>
</ul>
</li>
<li>When state errors occur, default is to:
<ul>
<li>1) log error</li>
<li>2) retry 1 time after 1 second
<ul>
<li>if retry fails, AWS Step Functions will fail execution entirely</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>



