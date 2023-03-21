---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS SystemsManager CLI Examples
categories:
- aws
- systems manager
- patching
- yum
tags:
- aws
---
### Run yum update against specific Patch Group Tag
<pre>
PATCH_GROUP=development
aws ssm send-command --document-name "eXp-YumUpdateSecurityOnly" --document-version "1" --targets '[{"Key":"tag:Patch Group","Values":[${PATCH_GROUP}]}]' --parameters '{"workingDirectory":["/tmp"]}' --comment "sudo -u root yum update --security -y" --timeout-seconds 600 --max-concurrency "1" --max-errors "1" --region us-east-1 --profile ${PROFILE}
</pre>

### Run patch baseline install on specific Patch Group Tag
<pre>
PATCH_GROUP=development
aws ssm send-command --document-name "AWS-RunPatchBaseline" --document-version "1" --targets '[{"Key":"tag:Patch Group","Values":[${PATCH_GROUP}]}]' --parameters '{"Operation":["Install"],"SnapshotId":[""],"InstallOverrideList":[""],"AssociationId":[""],"BaselineOverride":[""],"RebootOption":["RebootIfNeeded"]}' --timeout-seconds 600 --max-concurrency "1" --max-errors "1" --region us-east-1 --profile ${PROFILE}
</pre>