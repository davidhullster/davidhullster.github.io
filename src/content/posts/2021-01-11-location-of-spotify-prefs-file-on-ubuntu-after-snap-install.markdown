---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Location of Spotify prefs file on Ubuntu after Snap install
date: 2021-01-11 23:51:55.000000000 -08:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: ['spotify', 'ubuntu', 'snap']
meta:
  _last_editor_used_jetpack: block-editor
  _publicize_job_id: '53318408403'
  timeline_notification: '1610409121'
author:
  'Scratches'
permalink: "/2021/01/11/location-of-spotify-prefs-file-on-ubuntu-after-snap-install/"
---

#### Spotify Prefs file location on Ubuntu

<pre>/home/&lt;USER&gt;/snap/spotify/current/.config/spotify/prefs</pre>


Set app.window.position.saved value to fix maximized window at startup


<pre>app.window.position.saved=false</pre>


<pre> :~/snap/spotify$ 
  cat current/.config/spotify/prefs
    autologin.blob=&lt;
    long_string&gt;
    autologin.saved_credentials="{\"&lt;
    long_string2&gt;
    \"]}"autologin.canonical_username="&lt;
    long_string3&gt;
    "app.window.position.x=72autologin.username=""&lt;
    long_string3&gt;
    app.window.position.saved=trueapp.window.position.height=836app.autostart-mode=""
    app.window.position.y=64
    storage.last-location="/home/&lt;
    user_name&gt;
    /snap/spotify/common/.cache/spotify/Storage"app.window.position.width=1528core.clock_delta=1
    app.last-launched-version="1.1.46.916.g416cacf1"
    app.autostart-configured=true
</pre>

