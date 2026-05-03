---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: 'Kubernetes: UPGRADE FAILED: another operation (install/upgrade/rollback) is
  in progress'
---

# troubleshoot error: 
<pre>UPGRADE FAILED: another operation (install/upgrade/rollback) is in progress</pre>
 (the release that was in progress didn't show when I ran helm ls -n &lt;namespace&gt;)

<pre>helm delete &lt;release that's in progress&gt; -n &lt;namespace&gt;</pre>

example:
<pre>&gt;&gt;helm delete inventory-api-development -n development
release "inventory-api-development" uninstalled</pre>

