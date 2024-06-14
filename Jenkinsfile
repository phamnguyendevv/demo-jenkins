pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/Enestar-28/App-Ecommerce.git'
            }
        }
    }
}
