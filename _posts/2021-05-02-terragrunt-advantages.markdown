---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
---


  <h4>Terraform weaknesses that can be helped with Terragrunt:</h4>

  * <strong>the lack of Terraform module dependencies:</strong>

    it is not possible to dependency chain two modules 
    in Terraform because it’s simply not supported. 
    Terragrunt solves this by implementing the 
    _dependencies_ statement that allows other 
    modules to be executed first.

  * <strong>no retries on known errors:</strong>
   some Terraform errors will go away just by rerunning the apply command

  * <strong>no possibility to deploy the same version of a 
    Terraform module across all our environments: </strong>
    let’s say we want to make a change to our VPC 
    Terraform module. Ideally, that change should be 
    deployed as an artifact, tagged with a proper 
    version and distributed to all environments. 
    Terragrunt solves this by sourcing a particular 
    branch/tag for its deployment.

  * <strong>no possibility of keeping the Terraform backend 
    configuration DRY across all our environments 
    (S3 state bucket, region, DynamoDB table etc): </strong>
    for every sub-component (EKS, S3, IAM, MSK etc) 
    of our infrastructure we had to redefine the 
    Terraform backend configuration over and over 
    again. More sub-components, and more pain for 
    our SRE team. Terragrunt solves this issue by 
    using the path_relative_to_include() function to figure out the current directory.
    
  * <strong>when the Terraform code grows significantly 
    enough, it must be organised into folders:</strong> 
    Terraform has no way of running a global 
    plan or apply command across all those folders. 
    Terragrunt has a plan-all and apply-all 
    to make it easier to run the Terraform code 
    across all folders.
 
