pipeline{
    agent any

    stages {
        stage ('Git Pull') {
            steps {
                git url: 'https://github.com/Ashish-A-Kulkarni/ChatApp.git',
                	branch: 'master'
            }
        }

         stage('Build Docker Image') {
            steps {
                sh 'docker build -t ashishkulkarni410/chatappbackend:latest .'
                sh 'docker build -t ashishkulkarni410/chatappfrontend:latest .'
            }
        }

        stage('Publish Docker Image') {
            steps {
                withDockerRegistry([ credentialsId: "docker-jenkins", url: "" ]) {
                    sh 'docker push ashishkulkarni410/chatappbackend:latest'
                    sh 'docker push ashishkulkarni410/chatappfrontend:latest'
                }
            }
        }

        // stage('Clean Docker Images and Containers') {
        //      steps {
        //          sh 'docker rm -f scientificcalculator'
        //          sh 'docker rmi -f ashishkulkarni410/scientificcalculator'
        //      }
        //  }

         stage('Deploy and Run Image'){
             steps {
                 ansiblePlaybook playbook: 'deploy-docker/playbook.yml'
             }
         }

        stage('Docker Compose'){
             steps {
                 sh 'docker-compose -f deploy-docker/docker-compose.yml up'
             }
        }
    }
}