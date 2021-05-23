---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Infrastructure as Code on AWS
date: 2020-06-29 03:15:01.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _publicize_job_id: '45974775750'
  timeline_notification: '1593400505'
author:
  'Scratches'
permalink: "/2020/06/29/infrastructure-as-code-on-aws/"
---

<p><strong>Introduction</strong></p>


<ul>
<li>Cloud computing takes advantage of virtualization to enabled on-demand provisioning of compute, network and storage</li>
<li>Manual processes have disadvantages:
<ul>
<li>Higher Cost - people are diverted from more important work</li>
<li>Inconsistency due to human error</li>
<li>Lack of agility, speed</li>
<li>Lack of repeatable process causes compliance failures</li>
</ul>
</li>
<li>Infrastructure as Code brings automation to provisioning
<ul>
<li>instantiate infrastructure using configuration files</li>
<li>eliminates configuration drift</li>
</ul>
</li>
</ul>


<p><strong>Infrastructure Resource Lifecycle</strong></p>


<ul>
<li>Figure: Infrastructure Resource Lifecycle
<ol>
<li><strong>Resource Provisioning:</strong>
<ol>
<li>Administrators provision resources with the specifications they want</li>
</ol>
</li>
<li><strong>Configuration Management:</strong>
<ol>
<li>Resources become components of a configuration management systems that does tuning and patching</li>
</ol>
</li>
<li><strong>Monitoring and Performance:</strong>
<ol>
<li>Tools validate the operational state of resources</li>
<li>Examine metrics, synthetic transactions, log files</li>
</ol>
</li>
<li><strong>Compliance and Governance:</strong>
<ol>
<li>Frameworks drive more validation to ensure alignment with standards:
<ol>
<li>Corporate standards</li>
<li>Industry standards</li>
<li>Regulatory requirements</li>
</ol>
</li>
</ol>
</li>
<li><strong>Resource optimization:</strong>
<ol>
<li>Review performance data
<ol>
<li>Identify changes needed to optimize for performance, cost management, etc.</li>
</ol>
</li>
</ol>
</li>
</ol>
</li>
<li>Infrastructure Resource Lifecycle
<ul>
<li>Each stage involves procedures that can leverage code</li>
</ul>
</li>
</ul>


<p><strong>Resource Provisioning</strong></p>


<ul>
<li>Organizations need a repeatable process for instantiating resources consistently</li>
<li>Infrastructure as Code using CloudFormation provides the framework for this process</li>
</ul>


<p><strong>AWS Cloudformation</strong></p>


<ul>
<li>Use templates written in YAML or JSON to describe the collection of AWS resources, their associated dependencies and required runtime parameters</li>
<li>Templates can repeatedly create identical copies of the same stack across AWS Regions</li>
<li>After deploying, you can modify and update them in a controlled and predictable way</li>
<li>Effect is that you have version control for your infrastructure</li>
</ul>


<p><strong>Template Anatomy</strong></p>


<ul>
<li>Templates contain parameters, resource declarations and outputs</li>
<li>Templates can reference other templates</li>
</ul>


<p><strong>Figure: example of AWS CloudFormation YAML Template</strong></p>


<ul>
<li>Parameters Section: Template requests the name of an EC2 Key Pair from the user</li>
<li>Resource Section: Creates an EC2 instance using that key pair
<ul>
<li>EC2 security group is associated with that EC2 instance</li>
<li>Security group enables port 80 HTTP access</li>
</ul>
</li>
</ul>


<p>Parameters:
  KeyName:
    Description: The EC2 key pair to allow SSH access to the instance
    Type: AWS::EC2::KeyPair::KeyName
Resources:
  Ec2Instance:
    Type: AWS::EC2::Instance
    Properties:
      SecurityGroups: !Ref InstanceSecurityGroup
      KeyName: !Ref KeyName
      ImageId: ami-70065467
  InstanceSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable HTTP access via port 80
      SecurityGroupIngress:
      - IpProtocol: tcp
        FromPort: '80'
        ToPort: '80'
        CidrIp: 0.0.0.0/0


<p><strong>Change Sets</strong></p>


<ul>
<li>Change Sets feature allows previewing proposed changes to a stack with actually updating the stack</li>
<li>Control ability to create and view change sets with IAM</li>
<li>Three phases of using Change Sets:
<ul>
<li>Create - submit changes to stack or parameters</li>
<li>View - summary provided in JSON from API from console, cli, api</li>
<li>Execute - execute the change set to make changes to the stack</li>
</ul>
</li>
</ul>

