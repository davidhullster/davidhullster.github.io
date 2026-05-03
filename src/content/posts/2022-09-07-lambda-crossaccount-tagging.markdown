---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Python aws lambda cross account tagging
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- python
- aws lambda
- tagging
- cross-account
tags: []
meta:
author:
  'Scratches'
---
### Format Specification Mini-Language
```python
import json
import boto3
from boto3.session import Session


acct_ids = {
    "qa": "123456789",
    "production": "987654321",
}

role_name = "AddEC2TagRole"
instance_list = []
region_names = ["us-east-1", "us-west-2", "ca-central-1", "eu-central-1"]


def lambda_handler(event, context):
    get_ec2_client()

    return {
        "statusCode": 200,
        "body": json.dumps({"message": "Lambda Run Success"}),
    }


def get_ec2_client():
    for region_name in region_names:
        for profile, acct_id in acct_ids.items():
            print(
                f"\n\n###### Profile: {profile} Region: {region_name} AcctId: {acct_id} ######"
            )
            session = create_session(acct_id, region_name)
            ec2_client = session.client("ec2")
            get_image_id(ec2_client, profile)


def get_image_id(ec2_client, profile):
    image_id = ''
    response = ec2_client.describe_instances()
    for reservation in response["Reservations"]:
        for instance in reservation["Instances"]:
            if "running" in instance["State"]["Name"].lower():
                instance_id = instance["InstanceId"]
                image_id = instance["ImageId"]
                instance_details = instance["PlatformDetails"]
                print(
                    f"\nset_patch_group_tag({image_id}, {instance_details}, {instance_id}, {ec2_client}, {profile})"
                )
                set_patch_group_tag(
                    image_id, instance_details, instance_id, ec2_client, profile
                )
    return image_id


def set_patch_group_tag(image_id, instance_details, instance_id, ec2_client, profile):
    platform = ""
    instance_name_tag = ""
    tag_response = ''
    if "Windows" in instance_details:
        platform = "windows"
        # check if AMI is still in AWS
    elif ec2_client.describe_images(ImageIds=[image_id])["Images"]:
        print(f"InstanceId: {instance_id}")
        image_type = ec2_client.describe_images(ImageIds=[image_id])["Images"][0][
            "ImageLocation"
        ].lower()
        print(f"ImageType: {image_type}")
        instance_list = ec2_client.describe_instances(InstanceIds=[instance_id])
        tag_list = instance_list["Reservations"][0]["Instances"][0]["Tags"]
        patch_group_tag = "".join(
            [tag["Value"] for tag in tag_list if tag["Key"].startswith("Patch Group")]
        )
        instance_name_tag = "".join(
            [tag["Value"] for tag in tag_list if tag["Key"].startswith("Name")]
        )
        print(f"instance name tag: {instance_name_tag}")
        # Skip evaluation if Patch Group tag already exists
        if not patch_group_tag:
          if "onboarding-status" in image_type:
              platform = "amzn2"
          elif "amzn2" in image_type:
              platform = "amzn2"
          elif "amazon_linux_2" in image_type:
              platform = "amzn2"
          elif "aws-marketplace/debian" in image_type:
              platform = "ubuntu"
          elif "amzn-" in image_type:
              platform = "amzn1"
          elif "ubuntu" in image_type:
              platform = "ubuntu"
          ## Name Tag Values requiring special handling
          if "different-server-test" in instance_name_tag:
              platform = "amzn2"

          tag_response = ec2_client.create_tags(
              Resources=[instance_id],
              Tags=[{"Key": "Patch Group", "Value": f"{profile}-{platform.lower()}"}],
          )
    return f'{profile}-{platform.lower()}'



"""Create boto session using AWS STS in passed-in AWS account"""
def create_session(target_account_id, aws_region):
    """This function creates a Boto3 session by retrieving a security token from STS"""
    sts_client = boto3.client("sts")
    target_role_name = role_name

    resp = sts_client.assume_role(
        RoleArn=f"arn:aws:iam::{target_account_id}:role/{target_role_name}",
        RoleSessionName=f"{target_role_name}_" + str(target_account_id),
    )

    # Now we have a session under assumed role
    session = Session(
        aws_access_key_id=resp["Credentials"]["AccessKeyId"],
        aws_secret_access_key=resp["Credentials"]["SecretAccessKey"],
        aws_session_token=resp["Credentials"]["SessionToken"],
        region_name=aws_region,
    )
    return session
```