pipeline {
    agent any
    environment {
        DOCKERHUB_USER = 'hoatrancntt' 
        REPO_NAME = 'mywebdemo-gitops'
        GIT_URL = 'https://github.com/hoatrancntt-devops/mywebdemo-gitops.git'
        DOCKER_CREDS_ID = 'dockerhub-creds'
        GIT_CREDS_ID = 'github-pat'
    }
    stages {
        stage('Checkout') {
            steps { git branch: 'main', url: GIT_URL, credentialsId: GIT_CREDS_ID }
        }
        stage('Build & Push') {
            steps {
                script {
                    def backTag = "${DOCKERHUB_USER}/${REPO_NAME}:backend-${BUILD_NUMBER}"
                    def backImg = docker.build(backTag, './backend')
                    def frontTag = "${DOCKERHUB_USER}/${REPO_NAME}:frontend-${BUILD_NUMBER}"
                    def frontImg = docker.build(frontTag, './frontend')
                    docker.withRegistry('', DOCKER_CREDS_ID) {
                        backImg.push()
                        frontImg.push()
                    }
                }
            }
        }
        stage('CTO Approval') {
            steps {
                script {
                    input message: 'Sếp ơi, Build xong rồi. Triển khai Production không?', ok: 'Duyệt!', submitter: 'admin'
                }
            }
        }
        stage('GitOps Update') {
            steps {
                script {
                    sh "git config user.email 'jenkins@bot.com'"
                    sh "git config user.name 'Jenkins Bot'"
                    sh "sed -i 's|image: .*${REPO_NAME}:backend-.*|image: ${DOCKERHUB_USER}/${REPO_NAME}:backend-${BUILD_NUMBER}|g' k8s/backend-deployment.yaml"
                    sh "sed -i 's|image: .*${REPO_NAME}:frontend-.*|image: ${DOCKERHUB_USER}/${REPO_NAME}:frontend-${BUILD_NUMBER}|g' k8s/frontend-deployment.yaml"
                    withCredentials([string(credentialsId: GIT_CREDS_ID, variable: 'TOKEN')]) {
                        sh """
                            git add k8s/*.yaml
                            git commit -m "Deploy Build ${BUILD_NUMBER} [skip ci]"
                            git push https://${TOKEN}@github.com/hoatrancntt-devops/mywebdemo-gitops.git HEAD:main
                        """
                    }
                }
            }
        }
    }
}
