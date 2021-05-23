---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: 'Kubernetes: UPGRADE FAILED: another operation (install/upgrade/rollback) is
  in progress'
---

<p># troubleshoot error: UPGRADE FAILED: another operation (install/upgrade/rollback) is in progress (the release that was in progress didn't show when I ran helm ls -n &lt;namespace&gt;)

helm delete &lt;release that's in progress&gt; -n &lt;namespace&gt;

example:
&gt;&gt;helm delete inventory-api-development -n development
release "inventory-api-development" uninstalled

