

pipeline {
    agent any

    stages {
        stage('Check Docker') {
            steps {
                bat 'docker --version'
            }
        }

        stage('Clone') {
            steps {
                script {
                    try {
                        git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/Enestar-28/Base-react-native.git'
                    } catch (Exception e) {
                        echo "Failed to clone repository: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error e
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        def imageName = "myapp"
                        def imageTag = "v1.0"
                        bat "docker build -t ${imageName}:${imageTag} ."
                    } catch (Exception e) {
                        echo "Failed to build Docker image: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error e
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline completed with result: ${currentBuild.result}"
        }
    }
}
