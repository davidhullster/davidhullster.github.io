---
layout: posts
header-img: img/post-bg-2015a.jpeg
title: Python fstring mini-language specification
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
  - python
  - fstring
  - fstring minilanguage specification
tags: []
meta: null
author: Scratches
date: '2024-09-21T22:54:00.000Z'
---
### Format Specification Mini-Language
<pre>
The general form of a standard format specifier is:

format_spec     ::=  [[fill]align][sign][#][0][width][grouping_option][.precision][type]
fill            ::=  <any character>
align           ::=  "<" | ">" | "=" | "^"
sign            ::=  "+" | "-" | " "
width           ::=  digit+
grouping_option ::=  "_" | ","
precision       ::=  digit+
type            ::=  "b" | "c" | "d" | "e" | "E" | "f" | "F" | "g" | "G" | "n" | "o" | "s" | "x" | "X" | "%"
</pre>
