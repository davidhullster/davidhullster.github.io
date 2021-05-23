---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Policy and Standards Automation (2)
date: 2020-07-10 02:01:10.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _publicize_job_id: '46393717255'
  timeline_notification: '1594346473'
author:
  'Scratches'
permalink: "/2020/07/10/policy-and-standards-automation-2/"
---

<p><strong>AWS Secrets Manager</strong></p>


<p><strong>Troubleshoot Cross-Account Secret Sharing</strong></p>


<ul>
<li>When Sharing credentials cross-account
<ul>
<li>cross-account access to Secrets Manager must be configured</li>
</ul>
</li>
</ul>


<ul>
<li>When secret rotation is configured, it causes the secret to rotate once as soon as you store the secret.
<ul>
<li>this could cause the old credential to not be useable after the initial rotation, especially for apps not using the Secrets Manager</li>
</ul>
</li>
</ul>


<ul>
<li>The AWS credentials used to call Secrets Manager from the application need to have the 'secretsmanager:DescribeSecret' permission</li>
<li>GetSecretValue has an optional VersionStage OR VersionId parameter
<ul>
<li>these specify a specific secret version</li>
<li>default is VersionStage: AWSCURRENT</li>
</ul>
</li>
<li>To retrieve a previous version of a secret, pass the <br />SecretId and VersionStage: AWSPREVIOUS</li>
<li>If you always want the current secret, don't specify VersionStage or VersionId at all
<ul>
<li>default is VersionStage AWSCURRENT </li>
</ul>
</li>
</ul>


<p><strong>Rotate Secrets for non-RDS Database</strong></p>


<ul>
<li>if database is not controlled by you
<ul>
<li>you may need an additional account to configure to auth to the database</li>
</ul>
</li>
<li>you might see client sign-on failure due to time lag:
<ul>
<li>between change of actual password and the change in the corresponding secret that tells the client which password to use (VersionId or VersionStage)</li>
</ul>
</li>
</ul>


<p><strong>Steps of the Secrets Manager Lambda Function</strong></p>


<ul>
<li>When you specify a secret for a supported RDS database, a standard Lambda function is used to rotate the secret. <br>Steps in that Lambda function are:
<ul>
<li><strong>createSecret</strong> Step
<ul>
<li>Staging Label is set to <strong>AWSPENDING</strong></li>
</ul>
</li>
<li><strong>setSecret</strong> Step
<ul>
<li>either: <strong>changes</strong> secret labeled AWSPENDING</li>
<li>or: <strong>creates</strong> new credentials to match the requested ones</li>
</ul>
</li>
<li><strong>testSecret</strong> Step
<ul>
<li>Lambda uses AWSPENDING secret to <strong>attempt login</strong> to your secured resource</li>
<li>you can configure read-only or read-write access, depending on requirements</li>
</ul>
</li>
<li><strong>finishSecret</strong> Step
<ul>
<li>updates label, moves AWSCURRENT to new password</li>
<li>sets AWSPREVIOUS on the 'old current' password</li>
<li>removes label from 'old previous', making it available for deletion</li>
</ul>
</li>
<li>You can create a <strong>second</strong> set of credentials with permissions to <strong>change</strong> the password, or create new credentials.
<ul>
<li>This is the '<strong>master</strong>' secret</li>
<li>Secrets Manager stores the master secret <strong>separately</strong></li>
<li>Lambda function uses the master secret to rotate/create <strong>other</strong> credentials</li>
</ul>
</li>
</ul>
</li>
</ul>


<p><strong>Jira Setup on AWS</strong></p>


<ul>
<li>Single VPC with Public and Private subnets
<ul>
<li>each subnet should be in a different Availability Zone</li>
</ul>
</li>
<li>NAT GW's in public subnets
<ul>
<li>routing to allow outbound Internet access from private subnet</li>
</ul>
</li>
<li>Bastion host in single ASG to allow ssh access to EC2 instances in private subnet</li>
<li>Internal ELB load balancing between Jira instances
<ul>
<li>also SSL termination reverse proxy on the ELB</li>
<li>ALB can be used</li>
</ul>
</li>
<li>Jira applications installed on EC2 instances in private subnet
<ul>
<li>joined to an AutoScalingGroup ASG</li>
</ul>
</li>
<li>Jira requires a relational DB
<ul>
<li>Aurora PostgreSQL is supported</li>
</ul>
</li>
<li>Jira uses a shared file system to store artifacts
<ul>
<li>AWS EFS is supported </li>
</ul>
</li>
</ul>

