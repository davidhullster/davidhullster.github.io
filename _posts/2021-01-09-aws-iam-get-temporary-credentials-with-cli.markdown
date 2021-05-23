---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS IAM - get temporary credentials with cli
date: 2021-01-09 16:01:40.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
tags:
- aws cli
- aws iam
- mfa
- security
meta:
  _last_editor_used_jetpack: block-editor
  timeline_notification: '1610208104'
  _publicize_job_id: '53221187555'
author:
  'Scratches'
permalink: "/2021/01/09/aws-iam-get-temporary-credentials-with-cli/"
---

<p>Run the&nbsp;<a href="https://docs.aws.amazon.com/cli/latest/reference/sts/get-session-token.html" target="_blank" rel="noreferrer noopener">sts get-session-token</a>&nbsp;AWS CLI command, replacing the variables with information from your account, resources, and MFA device:</p>


$ aws sts get-session-token --serial-number arn-of-the-mfa-device --token-code code-from-token


<p>You receive an output with temporary credentials and an expiration time (by default, 12 hours) similar to the following:</p>


{
    "Credentials": {
        "SecretAccessKey": "secret-access-key",
        "SessionToken": "temporary-session-token",
        "Expiration": "expiration-date-time",
        "AccessKeyId": "access-key-id"
    }
}


<p><strong>Note:</strong>&nbsp;You can specify an expiration duration (in seconds) using the&nbsp;<strong>--duration-seconds</strong>&nbsp;option in the&nbsp;<strong>sts get-session-token</strong>&nbsp;command, where the value can range from 900 seconds (15 minutes) to 129600 seconds (36 hours). <br>If you are using root user credentials, the range is from 900 seconds (15 minutes) to 3600 seconds (1 hour).</p>

