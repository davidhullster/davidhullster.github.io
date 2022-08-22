---
layout: posts
header-img: "img/post-bg-2015a.jpeg"
title: Python function to tag aws instances based on AMI name
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- jenkins
- git
tags: []
meta:
author:
  'Scratches'
---
### sample jenkinsfile to run script from git repo
```groovy
pipeline {
    parameters {
        string defaultValue: '1234567890', name: 'account-number'
    }
    environment {
        WORKPLACE_TOKEN = credentials('example-auth-token')
    }
    agent any
    stages {
        stage('Hello') {
            steps {
                sh 'echo Running Step 1'
            }
        }
    }
    post {
        always {
            git(url: 'https://github.org/davidhullster/jenkins-git-integration.git', branch: 'jenkins-git-integration', credentialsId: 'git-credentials')
            script {
                    sh '''
                    chmod +x scripts/example_python_script.py
                    python3 -m venv venv; source venv/bin/activate; pip install requests; python3 scripts/example_python_script.py "${account-number}"
                    '''
                }
        }
    }
}
```