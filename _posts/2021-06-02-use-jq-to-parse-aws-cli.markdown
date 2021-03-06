---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Use jq to parse AWS CLI
categories:
- aws
- jq
tags:
- aws
- jq
- json
- describe-instances
- describe-subnets
---
#### list instances with instanceId, launchTime, state and stateReason
<pre>aws ec2 describe-instances --region us-east-2 |
    jq "[.Reservations | .[] | .Instances | .[] |
        {instanceId: .InstanceId, launchTime: .LaunchTime,
            state: .State, stateReason: .StateReason}]"</pre>

#### ec2 list instances with State and stateReason and launchTime
<pre>aws ec2 describe-instances --region us-east-2 | 
    jq "[.Reservations | .[] | .Instances | .[] |
        {instanceId: .InstanceId, launchTime: .LaunchTime, 
            state: .State, stateReason: .StateReason}]"</pre>

#### ec2 list instances that are running with instanceId and launchTime
<pre>aws ec2 describe-instances --region us-east-2 | 
    select(.State.Name == \"running\")" | jq "[ .Reservations | .[] |
     .Instances | .[] |
        {instanceId: .InstanceId, launchTime: .LaunchTime, 
            state: .State, stateReason: .StateReason} ]"</pre>

#### ec2 list VPC's and CIDRs
<pre>aws ec2 describe-vpcs | jq "[.Vpcs | .[] | .CidrBlock ]"</pre>

#### ec2 lisit subnets with subnetId and AZ 
<pre>aws ec2 describe-subnets | jq '[.Subnets|.[]|{Subnet:.SubnetId,AZ:.AvailabilityZone}]'</pre>

#### ec2 list amiId , instanceId and privateIp
<pre>aws ec2 describe-instances --profile exp-dev --region us-east-1 |
 jq -c '.Reservations | .[] | .Instances | .[] | 
    select (.ImageId == ${AMIID}) | .InstanceId,.PrivateIpAddress'</pre>

#### ConfigService get rule names that do not contain a string
<pre>aws configservice describe-config-rules --profile exp-dev --region us-east-1 | 
    jq -c '.ConfigRules| .[] | select(.ConfigRuleName | 
        test("AWSControlTower") | not) | .ConfigRuleName'</pre>

#### ec2 describe-key-pairs that start with string
<pre>aws ec2 describe-key-pairs 
    --profile exp-devsecops --region us-east-1 
        | jq -c '.KeyPairs | .[] | select( .KeyName | startswith("test-string"))'</pre>

#### ec2 describe-instances select "Name" tags, launchTime, PubDNSName
<pre>aws ec2 describe-instances --profile exp-labs --region us-east-1 \
    | jq '.Reservations | .[] | .Instances | .[] \
    | [(.Tags[]|select(.Key=="Name")|.Value), .LaunchTime, .PublicDnsName ]' 
[
  "instance1",
  "2021-07-30T18:55:23+00:00",
  "ec2-3-86-245-113.compute-1.amazonaws.com"
]
[
  "instance2",
  "2021-07-30T18:55:23+00:00",
  "ec2-52-91-167-140.compute-1.amazonaws.com"
]
</pre>