pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub-credentials'
        SSH_CREDENTIALS_ID = 'ssh-credentials'
        DOCKER_IMAGE = 'duchaidev/beshopweb'
        NODE_VERSION = '20'
        DEPLOY_HOST = '152.42.164.162'
        DEPLOY_USER = 'root'
    }

    stages {
        stage('Checkout code') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    nodejs(NODE_VERSION) {
                        echo "Node.js version ${NODE_VERSION} setup complete."
                    }
                }
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker image') {
            steps {
                sh 'docker build -t beshopweb .'
            }
        }

        stage('Push Docker image to registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker tag beshopweb $DOCKER_IMAGE
                        docker push $DOCKER_IMAGE
                        """
                    }
                }
            }
        }

        stage('Deploy to server') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: SSH_CREDENTIALS_ID, keyFileVariable: 'SSH_KEY')]) {
                        sh """
                        ssh -i $SSH_KEY $DEPLOY_USER@$DEPLOY_HOST '
                        docker pull $DOCKER_IMAGE &&
                        docker stop beshopweb || true &&
                        docker rm beshopweb || true &&
                        docker image prune -f &&
                        docker run -d --name beshopweb -p 8090:8989 $DOCKER_IMAGE
                        '
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
            mail to: 'team@example.com',
                 subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                 body: "Something went wrong with the pipeline.\n\n${env.BUILD_URL}"
        }
    }
}
