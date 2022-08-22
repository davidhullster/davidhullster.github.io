---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS Patch Management
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- aws
- ssm
- patch management
- Tech
tags: []
meta:
author:
  'Scratches'
---
### AWS Patch Management with SSM
<pre>
 Use Patch Manager to patch different SSM-supported OSes. 
Create a patch baseline and see  how it can help maintain and patch a multi-platform infrastructure. 
Observe how SSM inventory can keep us more aware about metadata on managed instances.

Log in to AWS Management Console
Log in to the AWS Management Console using the credentials provided on the lab page.
Head to AWS Systems Manager Console
Navigate to Systems Manager > Managed Instances.
Ensure you see two managed EC2 instances: AmazonLinux-Instance and Windows-Instance.
Configure Patching
Add Patch Group Tags to Both Instances
Navigate to EC2 > Instances.
Select the Windows-Instance.
Click the Tags tab.
Click Add/Edit Tags.
Click Create Tag.
Give it a Key of Patch Group.
Give it a Value of Windows Prod.
Click Save.
Select the AmazonLinux-Instance.
Click the Tags tab.
Click Add/Edit Tags.
Click Create Tag.
Give it a Key of Patch Group.
Give it a Value of Linux Prod.
Apply Patching to Linux Instance
Navigate to Systems Manager > Patch Manager.
Click View predefined patch baselines.
In the search bar, select Operating system: and Amazon Linux 2.
Click to navigate to the resulting patch baseline.
Select Actions > Modify patch groups.
In the Patch groups box, type "Linux Prod" and click Add.
Click Close.
Click Patch Manager in the left-hand menu.
Click View predefined patch baselines.
In the search bar, select Operating system: and Amazon Linux 2.
Select the circle next to the resulting patch baseline.
Click Configure patching.
In the Instances to patch section, choose Select a patch group.
In the dropdown, select Linux Prod.
In the Patching schedule section, choose Skip scheduling and patch instances now.
In the Patching operation section, choose Scan and install.
Click Configure patching.
Click Run Command in the left-hand menu.
Click Command history.
Click the command ID.
Click the instance ID.
Expand the Step 1 - Output section to see the patching that was applied.
Apply Patching to Windows Instance
Click Patch Manager in the left-hand menu.
Click View predefined patch baselines.
In the search bar, select Operating system: and Windows.
Click the patch baseline named AWS-DefaultPatchBaseline.
Select Actions > Modify patch groups.
In the Patch groups box, type "Windows Prod" and click Add.
Click Close.
Click Patch Manager in the left-hand menu.
Click View predefined patch baselines.
In the search bar, select Operating system: and Windows.
Select the circle next to the patch baseline named AWS-DefaultPatchBaseline.
Click Configure patching.
In the Instances to patch section, choose Select a patch group.
In the dropdown, select Windows Prod.
In the Patching schedule section, choose Skip scheduling and patch instances now.
In the Patching operation section, choose Scan only.
Click Configure patching.
Click Run Command in the left-hand menu.
Click the command ID. Refresh till you see a Success status.
Click the instance ID.
Expand the Step 1 - Output section to see the patching that was applied.
Set Up Inventory
Click Inventory in the left-hand menu.
Click Setup inventory.
Leave all the defaults, and click Setup Inventory. Give it about 10 minutes.
On the Inventory page, scroll to the bottom and click the Linux instance.
Click the Inventory tab. We should then see its inventory information after a minute or so.
Click Inventory in the left-hand menu.
Scroll to the bottom and click the Windows instance.
Click the Inventory tab. We should then see its inventory information after a minute or so.
</pre>
