---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
---
you can define your backend configuration just once in the root terragrunt.hcl file
   <pre> # stage/terragrunt.hcl

      remote_state {
        backend = "s3"
        generate = {
        path      = "backend.tf"
        if_exists = "overwrite_terragrunt"
      }
      config = {
        bucket = "my-terraform-state"

        key = "${path_relative_to_include()}/terraform.tfstate"
        region         = "us-east-1"
        encrypt        = true
        dynamodb_table = "my-lock-table"
      }
    }</pre>

The <b>generate</b> attribute is used to inform Terragrunt to generate the 
  Terraform code for configuring the backend. 
  When you run any Terragrunt command, Terragrunt 
  will generate a <i>backend.tf</i> file with the contents 
  set to the terraform block that configures the s3 backend, 
  just like what we had before in each <i>main.tf</i> file.
  The final step is to update each of the child terragrunt.hcl 
  files to tell them to include the configuration
  from the root terragrunt.hcl:
  
  <pre># stage/mysql/terragrunt.hcl

  include {
    path = find_in_parent_folders()
  }</pre>

