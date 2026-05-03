### run shared libraries from github
* https://github.com/darinpope/github-api-global-lib/blob/main/vars/helloWorld.groovy
<pre>
@Library("shared-library") _
pipeline {
    agent  any 
    stages {
        stage("Example") {
            steps {
                sh 'echo Hello World'
                // https://github.com/darinpope/github-api-global-lib/blob/main/vars/helloWorld.groovy
                    helloWorldSimple("David", "Thursday")
                    helloWorld(name:"David",dayOfWeek:"Thursday")
                    
            }
        }
    }
}
</pre>