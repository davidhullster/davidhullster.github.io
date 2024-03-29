---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: AWS CodeBuild Sample buildspec.yaml
type: post
parent_id: "0"
published: true
password: ""
status: publish
categories:
  - aws
  - codebuild
  - buildspec.yaml
tags: []
meta:
author: "Scratches"
---

### CodeBuild buildspec.yaml example

<pre>
version: 0.2

phases:
  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - aws --version
    # - REPOSITORY_URI=<>ACCOUNT-ID>.dkr.ecr.<REGION>.amazonaws.com/<APPLICATION-REPO-NAME> 
      - REPOSITORY_URI=000000000000.dkr.ecr.rrrrrrr.amazonaws.com/my-webapp-repo
      - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $REPOSITORY_URI
      - IMAGE_TAG=build-$(echo $CODEBUILD_BUILD_ID | awk -F":" '{print $2}')
  build:
    commands:
      - echo Build started on `date`
      - echo Building the Docker image...
      - docker build -t $REPOSITORY_URI:latest .
      - docker tag $REPOSITORY_URI:latest $REPOSITORY_URI:$IMAGE_TAG
  post_build:
    commands:
      - echo Build completed on `date`
      - echo Pushing the Docker images...
      - docker push $REPOSITORY_URI:latest
      - docker push $REPOSITORY_URI:$IMAGE_TAG
      - echo Writing image definitions file...
      - printf '{"ImageURI":"%s"}' $REPOSITORY_URI:$IMAGE_TAG > imageDetail.json

artifacts:
  files:
    - imageDetail.json
</pre>
