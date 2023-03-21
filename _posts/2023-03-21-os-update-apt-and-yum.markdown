---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS SystemsManager CLI Examples
categories:
- aws
- yum
- apt-get
- apt
- ubuntu
- security
tags:
- aws
---
### Ubuntu install only security updates
<pre>
apt-get install -y --only-upgrade $( apt-get --just-print upgrade | awk 'tolower($4) ~ /.*security.*/ || tolower($5) ~ /.*security.*/ {print $2}' | sort | uniq )

</pre>

### Run patch baseline install on specific Patch Group Tag
<pre>
PATCH_GROUP=development
aws ssm send-command --document-name "AWS-RunPatchBaseline" --document-version "1" --targets '[{"Key":"tag:Patch Group","Values":[${PATCH_GROUP}]}]' --parameters '{"Operation":["Install"],"SnapshotId":[""],"InstallOverrideList":[""],"AssociationId":[""],"BaselineOverride":[""],"RebootOption":["RebootIfNeeded"]}' --timeout-seconds 600 --max-concurrency "1" --max-errors "1" --region us-east-1 --profile ${PROFILE}
</pre>