pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/Enestar-28/Base-react-native.git'
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
