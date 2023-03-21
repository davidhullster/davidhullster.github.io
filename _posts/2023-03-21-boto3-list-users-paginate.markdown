---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS SystemsManager CLI Examples
categories:
- aws
- boto3
- paginate
tags:
- aws
---
### Loop over many users with paginate
<pre>
    self.iam_client = self.session.client("iam")
    paginator = self.iam_client.get_paginator('list_users')
    for page in paginator.paginate():
        for user in page['Users']:
</pre>