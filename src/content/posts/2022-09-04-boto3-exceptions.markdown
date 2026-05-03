---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: try and catch boto3 client exceptions
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
- boto3
- python
tags: []
meta:
author:
  'Scratches'
---

<pre>
https://stackoverflow.com/questions/43354059/catching-boto3-clienterror-subclass

If you're using the client you can catch the exceptions like this:

import boto3

def exists(role_name):
    client = boto3.client('iam')
    try:
        client.get_role(RoleName='foo')
        return True
    except client.exceptions.NoSuchEntityException:
        return False


If you're using the resource you can catch the exceptions like this:

cf = session.resource("iam")
role = cf.Role("foo")
try:
    role.load()
except cf.meta.client.exceptions.NoSuchEntityException:
    # ignore the target exception
    pass
This combines the earlier answer with the simple trick of using .meta.client to get from the higher-level resource to the lower-level client (source: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/clients.html#creating-clients).

</pre>