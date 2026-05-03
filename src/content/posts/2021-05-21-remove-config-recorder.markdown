---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
---

AWS Control Tower sets up a number of required rules in each account’s Config service to protect the integrity of the configuration checks and logs. 
Adding an existing account to Control Tower’s Landing Zone will fail if there’s an existing Config service configuration recorder or delivery trail.

These can be deleted using the AWS CLI.

If you get an access denied error when deleting an existing Config service recorder or delivery trail, you will need to temporarily detach the Service Control Policy from that account.

<h4>Instructions</h4>
1. Detach Service Control Policy from an account.

2. Login to the AWS Management account in the console, and go to the AWS Organizations service 

3. Find the Organization containing the account you want to enroll in Control Tower and click the link to it

4. Click the Policies tab in the lower section of the account page

5. Select radio button for  the ‘aws-guardrails-xxxxxx’ policy in the Applied Policies section and select Detach

6. Delete the configuration-recorder and delivery trail in the AWS CLI, then click Attach for the policy

    

_If the radio button for the ‘aws-guardrails-xxxxxx’ policy is not enabled, double-check that you clicked the link for the **Organization** in step 2 above, and not the account link._