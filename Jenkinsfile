pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('aws-cred')
        AWS_SECRET_ACCESS_KEY = credentials('aws-cred')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'aws-ec2-ssh-key', url: 'git@github.com:rahulbhatia3422/devops-nodejs-app.git', branch: 'develop'
            }
        }

        stage('Terraform Init') {
            dir('infra') {
                steps {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Validate') {
            dir('infra') {
                steps {
                    sh 'terraform validate'
                }
            }
        }

        stage('Terraform Plan') {
            dir('infra') {
                steps {
                    sh 'terraform plan'
                }
            }
        }

        stage('Terraform Apply') {
            dir('infra') {
                steps {
                    sh 'terraform apply -auto-approve'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Terraform apply completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check logs.'
        }
    }
}
