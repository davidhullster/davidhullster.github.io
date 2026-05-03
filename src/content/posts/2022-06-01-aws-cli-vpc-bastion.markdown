---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Use AWS CLI to build a VPC with a Bastion
categories:
- aws
- cli
- vpc
- bastion
tags:
- aws
- cli
- vpc
- bastion
---
#### Create VPC
<pre>aws ec2 create-vpc --cidr-block $VPC_CIDR --tag-specifications 'ResourceType=vpc,Tags=[{Key="Name",Value="TOOLS_VPC"}]'</pre>

#### Create Subnets
<pre>
aws ec2 create-subnet --availability-zone us-west-2a --cidr-block 10.0.0.0/26 --vpc-id $VPC_ID --tag-specifications 'ResourceType=subnet,Tags=[{Key="Name",Value="TOOLS_Public1"}]'
aws ec2 create-subnet --availability-zone us-west-2b --cidr-block 10.0.0.64/26 --vpc-id $VPC_ID --tag-specifications 'ResourceType=subnet,Tags=[{Key="Name",Value="TOOLS_Public2"}]'
aws ec2 create-subnet --availability-zone us-west-2a --cidr-block 10.0.0.128/26 --vpc-id $VPC_ID --tag-specifications 'ResourceType=subnet,Tags=[{Key="Name",Value="TOOLS_Private1"}]'
aws ec2 create-subnet --availability-zone us-west-2b --cidr-block 10.0.0.192/26 --vpc-id $VPC_ID --tag-specifications 'ResourceType=subnet,Tags=[{Key="Name",Value="TOOLS_Private2"}]'
</pre>

#### Create Internet Gateway with Name tag
<pre>aws ec2 create-internet-gateway --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key="Name",Value="TOOLS_IGW"}]'</pre>

#### Attach IGW to new VPC
<pre>aws ec2 attach-internet-gateway --internet-gateway-id $IGW_ID --vpc-id $VPC_ID</pre>

#### Create Route Tables
<pre>
aws ec2 create-route-table --vpc-id $VPC_ID --tag-specifications 'ResourceType=route-table,Tags=[{Key="Name",Value="TOOLS_PublicRT"}]'
aws ec2 create-route-table --vpc-id $VPC_ID --tag-specifications 'ResourceType=route-table,Tags=[{Key="Name",Value="TOOLS_PrivateRT"}]'
</pre>

#### Associate Route Tables with Subnets (Need public1 for app server, public2 for NAT GW)
<pre>aws ec2 associate-route-table --subnet-id $TOOLS_SUBNET_PUBLIC1 --route-table-id $PUBLIC_ROUTE_TABLE_ID</pre>
<pre>aws ec2 associate-route-table --subnet-id $TOOLS_SUBNET_PUBLIC2 --route-table-id $PUBLIC_ROUTE_TABLE_ID</pre> 

#### Create Route Entries
<pre>
aws ec2 create-route --route-table-id $PUBLIC_ROUTE_TABLE_ID --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW_ID
</pre>


#### Create NACL: Note that if the NACL is not in the default VPC, you'll be unable to associate this NACL with any subnet using the AWS CLI
#### You can use the AWS Console to associate NACL's without an associationID, but not with the AWS CLI
<pre>
aws ec2 create-network-acl --tag-specifications 'ResourceType=network-acl,Tags=[{Key="Name",Value="TOOLS_Public1"}]'
</pre>

#### Create NACL Entry
<pre>
MY_IP=$(curl ifconfig.co)
aws ec2 create-network-acl-entry --ingress --rule-number 110 --rule-action allow --port-range From=22,To=22 --protocol tcp --cidr-block $MY_IP/32 --network-acl-id $PUBLIC_NACL_ID
aws ec2 create-network-acl-entry --egress --rule-number 110 --rule-action allow --port-range From=1024,To=65535 --protocol tcp --cidr-block $MY_IP/32 --network-acl-id $PUBLIC_NACL_ID
</pre>

#### Describe NACL with filter
#### When you create a new NACL, it is automatically associated with the default subnet if the subnet is in the default VPC.
#### We need to find the associationId for the NACL so we can replace it with a new one, to the correct subnet
#### Default subnets can only be created in the default VPC, so NACL cannot be associated using the CLI
<pre>
aws ec2 describe-network-acls --filters 'Name="association.association-id",Values=$NACL_ASSOCIATION_ID'
aws ec2 describe-network-acls --filters Name=network-acl-id,Values=$NACL_ID ## Remove all quotes for interpolation of shell variable

aws ec2 describe-network-acls --filters Name=network-acl-id,Values=$PUBLIC_NACL_ID --query 'NetworkAcls[*].Associations[*].[NetworkAclAssociationId, NetworkAclId, SubnetId]'

</pre>

#### Replace NACL AssociationId with a new AssociationId
#### 
<pre>
aws ec2 replace-network-acl-association --association-id $CURRENT_NACL_ASSOCIATION_ID --network-acl-id $NACL_ID
</pre>

#### Create Bastion Security Group
<pre>aws ec2 create-security-group --group-name ATD_BASTION_SG --description ATD_BASTION_SG --vpc-id $VPC_ID</pre>

#### Add Port 22 Ingress Rule to Bastion Security Group
<pre>aws ec2 authorize-security-group-ingress --group-id $BASTION_SECURITY_GROUP --protocol tcp --port 22 --cidr $MY_CIDR</pre>

#### Get Latest Amazon2 Linux Instance ID
<pre>aws ec2 describe-images --filters "Name=name,Values=amzn2-ami-hvm*" --query 'reverse(sort_by(Images, &CreationDate))[0]' --owners amazon</pre>

#### Create EC2 KeyPair
<pre>aws ec2 create-key-pair --key-name $TOOLS_BASTION_KEYNAME --key-type rsa --tag-specifications 'ResourceType=key-pair,Tags=[{Key="Name",Value="TOOLS_BASTION_KEYPAIR"}]' | jq -r ".KeyMaterial" > ./$TOOLS_BASTION_KEYNAME.pem</pre>

#### Create Bastion Instance
<pre>
aws ec2 run-instances --image-id $AMI_ID --instance-type t2.micro --subnet-id $TOOLS_SUBNET_PUBLIC1 --associate-public-ip-address --key-name $TOOLS_BASTION_KEYNAME --tag-specifications 'ResourceType=instance,Tags=[{Key="Name",Value="TOOLS_BASTION"}]'
</pre>

#### You Can't Specify a Network Interface like a public-ip-address at the same time as you specify a Security Group, so we do it here
<pre>aws ec2 modify-instance-attribute --instance-id i-0a1366d91f36caf34 --groups $BASTION_SECURITY_GROUP</pre>

#### Update Bastion SG to allow outbound port 22 to all instances in VPC
<pre>aws ec2 authorize-security-group-egress --group-id $BASTION_SECURITY_GROUP --protocol tcp --port 22 --cidr $VPC_CIDR</pre>

#### Update Public NACL to allow port 22 from instances to Bastion, and Bastion responses on ephemeral ports (1024-65535)
<pre>aws ec2 create-network-acl-entry --ingress --protocol tcp --rule-action allow --rule-number 120 --port-range From=1024,To=65535 --network-acl-id $PUBLIC_NACL_ID --cidr-block $VPC_CIDR</pre>
<pre>aws ec2 create-network-acl-entry --egress  --protocol tcp --rule-action allow --rule-number 120 --port-range From=22,To=22 --network-acl-id $PUBLIC_NACL_ID --cidr-block $VPC_CIDR</pre>

#### Create Private3 NACL
<pre>aws ec2 create-network-acl --vpc-id $VPC_ID  --tag-specifications 'ResourceType=network-acl,Tags=[{Key="Name",Value="TOOLS_Private3"}]'</pre>
Check that the new NACL is associate with a subnet, with the CLI there's no way to associate a NACL with a subnet without an 'associationId'
AssociationId's are only available when a NACL has a subnet associated. If there's no default subnet, the association won't happen after the create-network-acl command.

#### Update Private3 NACL to allow port 22 inbound from Public1 CIDR
<pre>aws ec2 create-network-acl-entry --ingress --protocol tcp --rule-action allow --rule-number 110 --port-range From=22,To=22 --network-acl-id $PRIVATE3_NACL_ID --cidr-block $PUBLIC1_SUBNET_CIDR</pre>

#### Update Private3 NACL to allow ICMP pings from 0.0.0.0/0
<pre>aws ec2 create-network-acl-entry --ingress --protocol icmp --icmp-type-code Code="-1",Type="-1" --rule-action allow --rule-number 120 --network-acl-id $PRIVATE3_NACL_ID --cidr-block 0.0.0.0/0</pre>

#### Update Private3 NACL to allow ephemeral from 0.0.0.0/0
<pre>aws ec2 create-network-acl-entry --ingress  --rule-action allow --protocol tcp --port-range From=1024,To=65535 --rule-number 140 --network-acl-id $PRIVATE3_NACL_ID --cidr-block 0.0.0.0/0</pre>

#### Update Private NACL to allow Outbound 443 to 0.0.0.0/0
<pre>aws ec2 create-network-acl-entry --egress --protocol tcp --rule-action allow --rule-number 110 --port-range From=443,To=443 --network-acl-id $PRIVATE3_NACL_ID --cidr-block 0.0.0.0/0</pre>

#### Update Private3 NACL to allow Outbound ICMP to 0.0.0.0/0
<pre>aws ec2 create-network-acl-entry --egress --protocol icmp --icmp-type-code Code="-1",Type="-1" --rule-action allow --rule-number 120 --network-acl-id $PRIVATE3_NACL_ID --cidr-block 0.0.0.0/0</pre>

#### Create SecurityGroup for Private Subnets
<pre>aws ec2 create-security-group --group-name ATD_Private34_SG --description ATD_Private34_SG --vpc-id $VPC_ID --tag-specifications 'ResourceType=security-group,Tags=[{Key="Name",Value="ATD_Private34_SG"}]'</pre>

#### Create ingress rule for SSH port 22 from Bastion Subnet in Private34 security group
<pre>aws ec2 authorize-security-group-ingress --group-id $PRIVATE34_SG --protocol tcp --port 22 --cidr $PUBLIC1_SUBNET_CIDR</pre>

#### Create egress rule for HTTPS 443 to 0.0.0.0/0 in Private34 security group
<pre>aws ec2 authorize-security-group-egress --group-id $PRIVATE34_SG --protocol tcp --port 443 --cidr 0.0.0.0/0</pre>

#### Create egress rule for ICMP to 0.0.0.0/0 in Private34 security group
<pre>aws ec2 authorize-security-group-egress --group-id $PRIVATE34_SG --ip-permissions IpProtocol=icmp,FromPort=-1,ToPort=-1,IpRanges='[{CidrIp=0.0.0.0/0}]'</pre>

#### Create PrivateAppServer ec2 instance
<pre>aws ec2 run-instances --image-id $AMI_ID --instance-type t2.micro --subnet-id $PRIVATE1_SUBNET_ID --key-name tools-private-keypair --tag-specifications 'ResourceType=instance,Tags=[{Key="Name",Value="TOOLS_PrivateAppServer"}]'</pre>

#### Update PrivateAppServer with Private34 SG
<pre>aws ec2 modify-instance-attribute --instance-id $PRIVATE_INSTANCE_ID --groups $PRIVATE1_SG</pre>

#### Update Private3 NACL to allow ephemeral Outbound to 0.0.0.0/0
<pre>aws ec2 create-network-acl-entry --egress --rule-action allow --protocol tcp --port-range From=1024,To=65535 --rule-number 130 --network-acl-id $PRIVATE3_NACL_ID --cidr-block 0.0.0.0/0</pre>

<pre>
aws ec2 create-network-acl --tag-specifications 'ResourceType=network-acl,Tags=[{Key="Name",Value="TOOLS_Public2"}]' --vpc-id $VPC_ID
aws ec2 create-network-acl-entry --ingress --rule-number 110 --rule-action allow --port-range From=443,To=443 --protocol tcp --cidr-block $VPC_CIDR --network-acl-id $PUBLIC2_NACL_ID
aws ec2 create-network-acl-entry --ingress --rule-number 120 --rule-action allow --port-range From=1024,To=65535 --protocol tcp --cidr-block 0.0.0.0/0 --network-acl-id $PUBLIC2_NACL_ID
aws ec2 create-network-acl-entry --ingress --protocol icmp --icmp-type-code Code="-1",Type="-1" --rule-action allow --rule-number 130 --network-acl-id $PUBLIC2_NACL_ID --cidr-block 0.0.0.0/0
aws ec2 create-network-acl-entry --egress --protocol icmp --icmp-type-code Code="-1",Type="-1" --rule-action allow --rule-number 130 --network-acl-id $PUBLIC2_NACL_ID --cidr-block 0.0.0.0/0
aws ec2 create-network-acl-entry --egress --rule-number 120 --rule-action allow --port-range From=1024,To=65535 --protocol tcp --cidr-block $VPC_CIDR --network-acl-id $PUBLIC2_NACL_ID
aws ec2 create-network-acl-entry --egress --rule-number 110 --rule-action allow --port-range From=443,To=443 --protocol tcp --cidr-block 0.0.0.0/0 --network-acl-id $PUBLIC2_NACL_ID
</pre>


#### Create EIP for NAT Gateway
<pre>aws ec2 allocate-address</pre>

#### Create NAT Gateway in Public2 Subnet
<pre>aws ec2 create-nat-gateway --allocation-id $EIP_ALLOCATION_ID --tag-specifications 'ResourceType=natgateway,Tags=[{Key="Name",Value="TOOLS_Public2_NATGW"}]' --subnet-id $PUBLIC2_SUBNET</pre>

#### If NAT GW is correctly configured, you can ping www.example.com from the Private ec2 instance
#### Mistakes:
#### 1) didn't associate PublicRT with Public2 --> NATGW didn't allow ping to Internet from Private subnet
#### 2) didn't set Private34 NACL to allow ICMP in from 0.0.0.0/0, used VPC CIDR in error --> this also broke ping response from Internet through NATGW
#### NOTE: this is a pain through AWS CLI, could combine some Rule setup, but this is better done with Terraform or CloudFormation