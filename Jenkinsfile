pipeline {
    agent any
    stages {
        stage('Check Docker') {
            steps {
                sh 'docker --version'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def imageName = "myapp"
                    def imageTag = "v1.0"
                    sh "docker build -t ${imageName}:${imageTag} ."
                }
            }
        }
    }
}
