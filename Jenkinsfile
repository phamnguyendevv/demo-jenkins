pipeline {
    agent any

    stages {
        stage('Check Docker') {
            steps {
                script {
                    try {
                        bat 'docker --version'
                        bat 'docker info'
                    } catch (Exception e) {
                        echo "Docker is not installed or not running: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error "Stopping pipeline because Docker is not available."
                    }
                }
            }
        }

        stage('Clone Repository') {
            steps {
                script {
                    try {
                        git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/Enestar-28/demo-jenkins.git'
                    } catch (Exception e) {
                        echo "Failed to clone repository: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error "Stopping pipeline because the repository could not be cloned."
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        def imageName = "nguyendeptrai"
                        def imageTag = "v1.0"
                        echo "Building Docker image..."
                        // Change directory to where the Dockerfile is located
                        bat 'cd /d C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\demo-pipeline'
                        bat "docker build -t ${imageName}:${imageTag} ."
                    } catch (Exception e) {
                        echo "Failed to build Docker image: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error "Stopping pipeline because the Docker image build failed."
                    }
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    try {
                        def dockerHubUsername = "enestars"
                        def dockerHubPassword = "nguyen123"
                        def dockerHubRepo = "${dockerHubUsername}/${imageName}"
                        def dockerHubTag = "${dockerHubRepo}:${imageTag}"
                        
                        // Login to Docker Hub
                        bat "docker login -u ${dockerHubUsername} -p ${dockerHubPassword}"
                        
                        // Tag the local image with Docker Hub repository
                        bat "docker tag ${imageName}:${imageTag} ${dockerHubTag}"
                        
                        // Push the image to Docker Hub
                        bat "docker push ${dockerHubTag}"
                        
                        echo "Docker image ${dockerHubTag} pushed to Docker Hub."
                    } catch (Exception e) {
                        echo "Failed to push Docker image to Docker Hub: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error "Stopping pipeline because the Docker image push failed."
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
