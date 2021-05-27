---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Use jq to parse AWS CLI
categories:
- aws
- jq
tags:
- aws
- awscli
- describe-images
- most_recent
---

#### Using SSM: 
<pre>aws ssm get-parameters-by-path --path "/aws/service/ami-amazon-linux-latest" --region us-east-1</pre>

<pre>
{
    "Parameters": [
        {
            "Name": "/aws/service/ami-amazon-linux-latest/amzn-ami-hvm-x86_64-ebs",
            "Type": "String",
            "Value": "ami-084d83ef66c1c7d26",
            "Version": 28,
            "LastModifiedDate": "2021-04-14T16:30:26.197000-07:00",
            "ARN": "arn:aws:ssm:us-east-1::parameter/aws/service/ami-amazon-linux-latest/amzn-ami-hvm-x86_64-ebs",
            "DataType": "text"
        },
        {
            "Name": "/aws/service/ami-amazon-linux-latest/amzn-ami-hvm-x86_64-gp2",
            "Type": "String",
            "Value": "ami-08ee2037aae8e996c",
            "Version": 28,
            "LastModifiedDate": "2021-04-14T16:30:26.329000-07:00",
            "ARN": "arn:aws:ssm:us-east-1::parameter/aws/service/ami-amazon-linux-latest/amzn-ami-hvm-x86_64-gp2",
            "DataType": "text"
        },
</pre>

<pre>aws ec2 run-instances --image-id $(aws ssm get-parameters --names /aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2 --query 'Parameters[0].[Value]' --output text) --count 1 --instance-type m4.large
</pre>

#### "windows-server-2019-vs2019-1621677715"
<pre>aws ec2 describe-images --filters "Name=name,Values=windows*" --query 'reverse(sort_by(Images, &CreationDate))[0]' --owner microsoft</pre>

####  "amazonlinux-2-base_1621960459"
<pre>aws ec2 describe-images --filters "Name=name,Values=amazon*" --query 'reverse(sort_by(Images, &CreationDate))[0]' --owners amazon</pre>

####  "ubuntu-minimal/images-testing/hvm-ssd/ubuntu-groovy-daily-amd64-minimal-20210525"
<pre>aws ec2 describe-images --filters "Name=name,Values=ubuntu*" --query 'reverse(sort_by(Images, &CreationDate))[0]' --owners 099720109477</pre>
