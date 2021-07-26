---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Resolve JavaScript error 'cannot add EventListener of null'
categories:
- javascript
tags:
- error
- eventlistener
- 'null'

---
#### this was causing an error 'cannot add EventListener of null', until I moved the script tag in index.html to after the element I was listening for
<pre>
document.getElementById("submit").addEventListener('click', function (e) {
  postRequest(e, 'audit');
});
</pre>
