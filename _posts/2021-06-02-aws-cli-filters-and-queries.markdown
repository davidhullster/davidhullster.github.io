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
- queries
- filters

---
#### list load balancer attributes for each LoadBalancerArn
<pre>
for i in $( aws elbv2 describe-load-balancers --region ${aws_region} --profile ${profile_name} --query 'LoadBalancers[*].LoadBalancerArn' --output text ); 

do aws elbv2 describe-load-balancer-attributes --region ${aws_region}  --profile ${profile_name} --load-balancer-arn $i; 
done</pre>
