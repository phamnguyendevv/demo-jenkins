pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                script {
                    try {
                        git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/Enestar-28/Backend_Twitter.git'
                    } catch (Exception e) {
                        // Log error and fail the build if git operation fails
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
                        sh "docker build -t ${imageName}:${imageTag} ."
                    } catch (Exception e) {
                        // Log error and fail the build if Docker build fails
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
            // Clean up or post-build actions, e.g., push Docker image or clean workspace
            echo "Pipeline completed with result: ${currentBuild.result}"
        }
    }
}
