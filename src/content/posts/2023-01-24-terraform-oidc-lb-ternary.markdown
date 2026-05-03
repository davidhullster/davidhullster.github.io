---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Python Loop over List and swap elements
categories:
- python
- list
- 
tags:
- aws
---

### Terraform module aws_lb_listener_rule oidc

the module accepts a variable called lb_listener_rules which is a list of objects containing the rule name, type, and endpoint. The aws_lb_listener_rule resource is created with a count equal to the number of rules in the list.

A ternary expression is used to determine the type of the action, either "authenticate-oidc" or "forward". If the rule type is "authenticate-oidc", the action's authenticate_oidc block is filled with the required OIDC authentication information. If the rule type is "forward", the action's forward block is filled with the target group ARN and stickiness settings.

<pre>
variable "lb_listener_rules" {
  type = list(object({
    rule_name = string
    rule_type = string
    endpoint = string
  }))
}

resource "aws_lb_listener_rule" "lb_listener_rules" {
  count = length(var.lb_listener_rules)
  listener_arn = aws_lb_listener.example.arn
  priority    = count.index + 1
  action {
    type = var.lb_listener_rules[count.index].rule_type == "authenticate-oidc" ? "authenticate-oidc" : "forward"
    authenticate_oidc {
      issuer = "https://example.com"
      authorization_endpoint = "https://example.com/authorize"
      token_endpoint = "https://example.com/token"
      userinfo_endpoint = "https://example.com/userinfo"
      client_id = "client_id"
      client_secret = "client_secret"
    }
    forward {
      target_group_arn = aws_lb_target_group.example.arn
      stickiness {
        enabled = true
        duration = 3600
      }
    }
  }
}

</pre>