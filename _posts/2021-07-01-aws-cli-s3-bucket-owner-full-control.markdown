---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS CLI Filters and Queries
categories:
- aws
- awscli
tags:
- aws
- awscli
- s3
- bucket-owner-full-control

---
#### allow bucket owner to read objects written by other accounts
<pre>
s3client = session.client('s3')
s3client.put_object(Key=iam_username, 
                    Bucket=bucket_name, 
                    Body=f'file://{report_filename}', ACL='bucket-owner-full-control'
                    )
</pre>
