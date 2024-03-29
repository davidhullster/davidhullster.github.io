---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Get Size of S3 Buckets with Boto3
categories:
- aws
- python
tags:
- aws
- boto3
- python
- s3
- cloudwatch
---
#### Get Size of S3 Buckets with Boto3
https://www.slsmk.com/getting-the-size-of-an-s3-bucket-using-boto3-for-aws/
<pre>
import boto3
import datetime

now = datetime.datetime.now()

cw = boto3.client('cloudwatch')
s3client = boto3.client('s3')

# Get a list of all buckets
allbuckets = s3client.list_buckets()

# Header Line for the output going to standard out
print('Bucket'.ljust(45) + 'Size in Bytes'.rjust(25))

# Iterate through each bucket
for bucket in allbuckets['Buckets']:
    # For each bucket item, look up the cooresponding metrics from CloudWatch
    response = cw.get_metric_statistics(Namespace='AWS/S3',
                                        MetricName='BucketSizeBytes',
                                        Dimensions=[
                                            {'Name': 'BucketName', 'Value': bucket['Name']},
                                            {'Name': 'StorageType', 'Value': 'StandardStorage'}
                                        ],
                                        Statistics=['Average'],
                                        Period=3600,
                                        StartTime=(now-datetime.timedelta(days=1)).isoformat(),
                                        EndTime=now.isoformat()
                                        )
    # The cloudwatch metrics will have the single datapoint, so we just report on it. 
    for item in response["Datapoints"]:
        print(bucket["Name"].ljust(45) + str("{:,}".format(int(item["Average"]))).rjust(25))
        # Note the use of "{:,}".format.   
        # This is a new shorthand method to format output.
        # I just discovered it recently. 
</pre>