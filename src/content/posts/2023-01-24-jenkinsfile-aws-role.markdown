---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Jenkinsfile using AWS assumed-role
categories:
- aws
- assumed-role
- 
tags:
- aws
---

### Jenkinsfile using AWS assumed role to deploy a docker container

<pre>
    stage('Deploy - Prod') {
            when {
                branch 'main'
            }
      steps {
        git(url: 'https://github.com/davidhullster/jenkinsfile-aws-roles.git', branch: 'master', credentialsId: 'jenkins')
        script {
            ASSUME_ROLE_ARN='arn:aws:iam::XXX:role/jenkins'
            TEMP_ROLE = sh (
                script: "aws sts assume-role --role-arn ${ASSUME_ROLE_ARN} --role-session-name jenkins-prod",
                returnStdout: true
            ).trim()
            ROLE_JSON = readJSON text: "${TEMP_ROLE}"
            AWS_ACCESS_KEY_ID = ROLE_JSON.Credentials.AccessKeyId
            AWS_SECRET_ACCESS_KEY = ROLE_JSON.Credentials.SecretAccessKey
            AWS_SESSION_TOKEN = ROLE_JSON.Credentials.SessionToken
            wrap([$class: 'MaskPasswordsBuildWrapper', varPasswordPairs: [[password: AWS_ACCESS_KEY_ID],[password: AWS_SESSION_TOKEN],[password: AWS_SECRET_ACCESS_KEY]]]) 
            {
                docker.image('public.ecr.aws/l2j8b6z4/docker-terragrunt:jenkins-3').inside("-u 0 -v $WORKSPACE:/data -v /var/lib/jenkins/.ssh:/data/.ssh  -e BITBUCKET_USER=exp-jenkins -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} -e AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN}") 
                    {
                    sh """
                    aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID --profile exp-prod
                    aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY --profile exp-prod
                    aws configure set aws_session_token $AWS_SESSION_TOKEN --profile exp-prod
                    aws configure set region us-east-1 --profile exp-prod
                    cd /data/davidhullster/us-east-1/excelsior-app/app
                    terragrunt init -reconfigure
                    terragrunt plan --terragrunt-log-level trace -input=false -var 'image=${TF_VAR_app_image}'
                    terragrunt apply -auto-approve -input=false -var 'image=${TF_VAR_app_image}'
                    aws ecs run-task --cluster tf-ecs-cluster --task-definition \$(terragrunt output family_revision | tr -d '"') --region us-east-1 --launch-type FARGATE --network-configuration "awsvpcConfiguration={subnets=[subnet-XXX,subnet-XXX,subnet-XXX],securityGroups=[sg-XXX],assignPublicIp=DISABLED}"'
                    """
              }
            }
        }
      }
    }
</pre>