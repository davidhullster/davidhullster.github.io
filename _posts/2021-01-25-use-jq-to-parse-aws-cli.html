---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Use jq to parse AWS CLI
categories:
- aws
- jq
---

<p><code>## outputs JSON</code><br /><code>aws ec2 describe-instances --region us-east-2 |jq "[<br />.Reservations | .[] | .Instances | .[] |<br />{instanceId: .InstanceId, launchTime: .LaunchTime,<br />state: .State, stateReason: .StateReason}<br />]"</code></p>


<p><code>aws ec2 describe-instances --region us-east-2 | jq "[.Reservations | .[] | .Instances | .[] | {instanceId: .InstanceId, launchTime: .LaunchTime, state: .State, stateReason: .StateReason}]"</code></p>


<p><code>aws ec2 describe-instances --region us-east-2 | select(.State.Name == \"running\")" | jq "[ .Reservations | .[] | .Instances | .[] | {instanceId: .InstanceId, launchTime: .LaunchTime, state: .State, stateReason: .StateReason} ]"</code></p>


<p><code>aws ec2 describe-vpcs | jq "[.Vpcs | .[] | .CidrBlock ]"</code></p>


<p><code>aws ec2 describe-subnets | jq '[.Subnets|.[]|{Subnet:.SubnetId,AZ:.AvailabilityZone}]'</code></p>

<p>aws ec2 describe-instances --profile exp-dev --region us-east-1 | jq -c '.Reservations | .[] | .Instances | .[] | select (.ImageId == ${AMIID}) | .InstanceId,.PrivateIpAddress'</p>

<h4>ConfigService get rule names that contain a string</h4>
<p>aws configservice describe-config-rules --profile exp-dev --region us-east-1 | jq -c '.ConfigRules| .[] | select(.ConfigRuleName | test("AWSControlTower") | not) | .ConfigRuleName'</p>