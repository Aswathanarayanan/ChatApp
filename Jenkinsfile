pipeline{
    agent any

    stages {
        stage ('Git Pull') {
            steps {
                git url: 'https://github.com/Ashish-A-Kulkarni/ChatApp.git',
                	branch: 'master'
            }
        } 
        
    
        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t ashishkulkarni410/chatappbackend:latest .'
               
            }
        }

        stage('Build Frontend Docker Image') {
            
            steps {
                 dir("frontend") {
               sh 'docker build -t ashishkulkarni410/chatappfrontend:latest .'
                }
               
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

        stage ('Remove previous images') {
            steps {
               sh 'docker rm -f deploy-docker_backend_1'
               sh 'docker rm -f deploy-docker_frontend_1'
               sh 'docker rmi -f ashishkulkarni410/chatappfrontend:latest'
               sh 'docker rmi -f ashishkulkarni410/chatappbackend:latest'
            }
        } 

        stage('Deploy Image'){
            steps {
                ansiblePlaybook playbook: 'deploy-docker/playbook.yml'
            }
        }

        stage('Docker Compose'){
            steps {
                sh 'docker-compose -f deploy-docker/docker-compose.yml up -d'
            }
        }
    }
}