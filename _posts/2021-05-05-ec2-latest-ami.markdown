---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
---

<pre>aws ec2 run-instances 
        --image-id $(aws ssm get-parameters 
        --names /aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2 
        --query 'Parameters[0].[Value]' --output text --profile exp-dev 
        --region us-east-1) --count 1 --instance-type t3.small 
        --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=configruletest}]' 
        --profile exp-dev --region us-east-1
</pre>