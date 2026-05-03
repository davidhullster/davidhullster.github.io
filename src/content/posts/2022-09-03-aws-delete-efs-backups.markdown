---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS CLI Filters and Queries
categories:
- aws
tags:
- aws
- aws-cli
- efs
- backups

---
#### delete aws backup recovery points, so you can delete the vault
<pre>
 #!/bin/bash

set -e

echo "Enter the name of the vault where all backups should be deleted."
read VAULT_NAME

for ARN in $(aws backup list-recovery-points-by-backup-vault --backup-vault-name "${VAULT_NAME}" --query 'RecoveryPoints[].RecoveryPointArn' --output text); do 
  echo "deleting ${ARN} ..."
  aws backup delete-recovery-point --backup-vault-name "${VAULT_NAME}" --recovery-point-arn "${ARN}"
done
</pre>
