---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Linux command line Password Generator
date: 2020-09-19 17:40:07.000000000 -07:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: []
tags: []
meta:
  _publicize_job_id: '49001166444'
  timeline_notification: '1600537210'
author:
  'Scratches'
permalink: "/2020/09/19/linux-command-line-password-generator/"
---
#### use apg to create passwords on the CLI
<pre>
alias mkpsswd='apg -s -a 1 -m 32 -n 4'
</pre>
#### apg command line help
<pre>
   apg  [-a  algorithm]  [-M  mode]  [-E char_string] [-n num_of_pass] [-m
   min_pass_len] [-x max_pass_len]  [-r  dictfile]  [-b  filter_file]  [-p
   min_substr_len] [-s] [-c cl_seed] [-d] [-y] [-l] [-t] [-q] [-h] [-v]

       apg -a 0 -M sncl -n 6 -x 10 -m 8 (new style)
</pre>
If you want to generate really secure passwords, you should use  option -s.<br>

To simplify apg usage, you can write a small shell script. For example:
<pre> 
  #!/bin/sh
  /usr/local/bin/apg -m 8 -x 12 -s
</pre>

