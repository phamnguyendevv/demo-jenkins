pipeline {
    agent any  // Ensure Jenkins uses an agent that has Docker installed
    stages {
        stage('Check Docker') {
            steps {
                script {
                    sh 'docker --version' // Make sure this runs on a node with Docker
                }
            }
        }
    }
}