---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Software Development Life Cycle Automation
date: 2020-07-05 14:38:41.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _publicize_job_id: '46219819485'
  timeline_notification: '1593959925'
author:
  'Scratches'
permalink: "/2020/07/05/software-development-life-cycle/"
---

<strong>Using CodePipeline Build and Deploy .Net Application</strong>


<ul>
<li>To build a .Net application from source, use an <strong>MSBuild</strong> Windows Image in ECR</li>
<li>MSBuild image is stored in ECR</li>
<li>After build completes, resulting <strong>package</strong> is stored in <strong>S3</strong> Build Artifacts folder</li>
<li><strong>CodeDeploy</strong> picks up the build package from S3 and sends it to <strong>Elastic Beanstalk</strong> for deployment</li>
<li>CodeDeploy can invoke a Powershell script to run a schema update <strong>executable</strong>
<ul>
<li>CodeDeploy <strong>cannot</strong> run schema update sql scripts directly</li>
<li>CodeDeploy can run scripts to <strong>package</strong> the sql scripts as <strong>executable</strong>, then run that</li>
</ul>
</li>
<li><strong>CodeDeploy</strong> can work <strong>directly</strong> with an MSBuild container image in ECR</li>
<li><strong>MSBuild</strong> is needed to <strong>compile</strong> .Net code</li>
</ul>


<strong>AWS CodeStar Roles</strong>


<ul>
<li>Owner</li>
<li>Contributor</li>
<li>Viewer</li>
</ul>


<strong>CodePipeline and Jenkins</strong>


<ul>
<li>Jenkins <strong>can</strong> be an <strong>Action Prov</strong>ider in <strong>CodePipeline</strong></li>
<li>Jenkins <strong>cannot</strong> be a <strong>Source Provider</strong> in <strong>CodeDeploy</strong></li>
</ul>


<strong>CodeCommit Notifications</strong>


<ul>
<li>CodeCommit <strong>Notifications</strong> can send email, etc when a <strong>PR</strong> is created or updated</li>
<li>CodeCommit <strong>Triggers</strong> only fire when someone <strong>pushes to a repository</strong>
<ul>
<li>Triggers <strong>do not fire </strong>when a <strong>PR</strong> is created or updated</li>
</ul>
</li>
</ul>


<strong>CodePipeline Artifact Stores</strong>


<ul>
<li>When you create or edit a pipeline
<ul>
<li>an artifact store must be identified in the same region</li>
<li>you must have one bucket in each region where you run actions</li>
</ul>
</li>
<li>you can use the default AWS encryption key
<ul>
<li>OR you can set custom key rotation with your own Customer Managed Key (CMK)</li>
</ul>
</li>
</ul>


<strong>AWS Serverless Application Model</strong>


<ul>
<li>Canary Deployment Preference
<ul>
<li>traffic shifted in two increments</li>
</ul>
</li>
<li>Configure a post-traffic hook in a Lambda function
<ul>
<li>Lambda runs a sanity test</li>
<li>Lambda is invoked by CodeDeploy after traffic shift completes</li>
</ul>
</li>
<li>Definition of Deployment Preference for Canary Deployment:
<ul>
<li>type: Linear10PercentEvery10Minutes</li>
<li>defined in AWS SAM template</li>
</ul>
</li>
<li>If any CloudWatch alarms go into Alarm state
<ul>
<li>CodeDeploy flips Alias back to old version</li>
<li>CodeDeploy reports failure to CloudFormation</li>
</ul>
</li>
</ul>

