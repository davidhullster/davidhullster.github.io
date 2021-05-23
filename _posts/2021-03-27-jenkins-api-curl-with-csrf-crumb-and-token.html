---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: 'Jenkins API: curl with CSRF crumb and token'
date: 2021-03-27 21:01:39.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- jenkins
- Tech
tags: []
meta:
  _last_editor_used_jetpack: block-editor
  timeline_notification: '1616878903'
  _publicize_job_id: '56463341544'
author:
  'Scratches'
permalink: "/2021/03/27/jenkins-api-curl-with-csrf-crumb-and-token/"
---

<h4>Create CSRF Crumb and save to Environment Variable $CRUMB</h4>


<p><code>CRUMB=$(wget -q --auth-no-challenge --user JenkinsAdmin --password $PASSWORD --output-document - 'http://34.221.166.10:9090/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)')</code></p>


<p><code>$ echo $CRUMB<br />Jenkins-Crumb:12345c720376d5e9edc957ddbb0027a88b639eb74888adafc54615bfbf7c8c5</code></p>

<p></p>
<h4>Save JenkinsAdmin token to $TOKEN</h4>


<p><code>TOKEN=12345efe5700dd9a3334f8581885d498a0</code></p>

<p></p>
<h4>Start build on existing job 'pipeline1' $I returns html response</h4>


<p><code>curl -I -X POST http://JenkinsAdmin:$TOKEN@34.221.166.10:9090/job/pipeline1/build -H "$CRUMB"</code></p>

<p></p>
<h4>Copy a job's config.xml to local 'jobConfig.xml' file</h4>


<p><code>curl -X GET http://JenkinsAdmin:$TOKEN@34.221.166.10:9090/job/pipeline1/config.xml -H "$CRUMB" -o ./jobconfig.xml</code></p>

<p></p>
<h4>Create new job from saved 'jobConfig.xml' file</h4>


<p><code>curl -s -X POST http://JenkinsAdmin:$TOKEN@34.221.166.10:9090/createItem?name='job/backend/copyone' --data-binary @jobconfig.xml -H "$CRUMB" -H "Content-Type:text/xml"</code></p>

<p></p>
<h4>Create new job from jobconfig.xml into folder (note added path after servername:port)</h4>


<p><code>curl -s -X POST 'http://JenkinsAdmin:12345efe5700dd9a3334f8581885d498a0@34.221.166.10:9090/job/backend/job/tomcat/createItem?name=copyfour' --data-binary @jobconfig.xml -H "$CRUMB" -H "Content-Type:text/xml"</code></p>

</div>
