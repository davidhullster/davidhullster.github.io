---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS CLI describe-images from describe-instances
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
- aws cli
- tags
- python
tags: []
meta:
author:
  'Scratches'
---

<pre>
import json
import boto3

environment = "dev"
instance_list = ["i-05e7e29b0d2d2a58c"]
region_name="us-west-2"


def lambda_handler(event, context):
  session = boto3.Session(region_name=region_name)
  ec2_client = session.client("ec2")

  for instance in instance_list:
    instance_response = ec2_client.describe_instances(InstanceIds=[instance])
    image_id = instance_response['Reservations'][0]['Instances'][0]["ImageId"]

    image_response = ec2_client.describe_images(ImageIds=[image_id])
    image_name = image_response['Images'][0]['Name']

    if 'amzn2' in image_name:
      tag_response = ec2_client.create_tags(
        Resources=[instance],
        Tags=[
            {"Key": "Patch Group", "Value": f"{environment}-amzn2-patch-group"}
        ],
      )
    if 'amzn-linux' in image_name:
      tag_response = ec2_client.create_tags(
        Resources=[instance],
        Tags=[
            {"Key": "Patch Group", "Value": f"{environment}-amzn1-patch-group"}
        ],
      )
    if 'ubuntu' in image_name:
      tag_response = ec2_client.create_tags(
        Resources=[instance],
        Tags=[
            {"Key": "Patch Group", "Value": f"{environment}-ubuntu-patch-group"}
        ],
      )


      get_tag_response = ec2_client.describe_tags(
        Filters=[{
          "Name": "resource-id", 
          "Values": [instance]
          }]
      )
      print(f"Tags: {get_tag_response['Tags']}")

  return {
    "statusCode": 200,
    "body": json.dumps(
        {
            "message": "Lambda Run Success",
            # "location": ip.text.replace("\n", "")
        }
    ),
  }

if __name__ == '__main__':
  lambda_handler(None, None)
</pre>