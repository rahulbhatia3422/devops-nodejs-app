pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'develop', 
                    url: 'https://github.com/rahulbhatia3422/devops-nodejs-app.git'
            }
        }

        stage('Set Git Commit Hash') {
            steps {
                script {
                    env.GIT_COMMIT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    echo "Using Git Commit: ${env.GIT_COMMIT}"
                }
            }
        }

        stage('Terraform Init & Apply') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-cred',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    dir('infra') {
                        sh 'terraform init -input=false'
                        sh 'terraform validate'
                        sh 'terraform apply -auto-approve -input=false'
                    }
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    sh 'docker buildx install || true'

                    withCredentials([
                        usernamePassword(
                            credentialsId: 'dockerhub-credentials',
                            usernameVariable: 'DOCKER_USERNAME',
                            passwordVariable: 'DOCKER_PASSWORD'
                        )
                    ]) {
                        sh '''
                            echo "Logging into DockerHub..."
                            docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

                            echo "Making script executable..."
                            chmod +x scripts/build_and_push.sh

                            echo "Building and pushing Docker image with tag: ${GIT_COMMIT}"
                            ./scripts/build_and_push.sh ${GIT_COMMIT}
                        '''
                    }
                }
            }
        }

        stage('Prepare Ansible') {
            steps {
                script {
                    env.EC2_IP = sh(
                        script: "cd infra && terraform output -raw public_ip", 
                        returnStdout: true
                    ).trim()

                    echo "EC2 Public IP: ${env.EC2_IP}"

                    // Prepare inventory file
                    sh 'mkdir -p ansible'
                    writeFile file: 'ansible/hosts.ini', text: """
[ec2]
${env.EC2_IP} ansible_user=ubuntu

[ec2:vars]
ansible_python_interpreter=/usr/bin/python3
ansible_ssh_common_args='-o StrictHostKeyChecking=no'
"""
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'aws-ec2-ssh-key',
                        keyFileVariable: 'SSH_KEY_PATH'
                    )
                ]) {
                    script {
                        try {
                            sh """
                                mkdir -p ~/.ssh
                                chmod 600 $SSH_KEY_PATH
                                ssh-keyscan -H ${env.EC2_IP} >> ~/.ssh/known_hosts

                                echo "Running Ansible Playbook with GIT_COMMIT=${env.GIT_COMMIT}"
                                ansible-playbook -i ansible/hosts.ini ansible/deploy.yml \
                                    --private-key=$SSH_KEY_PATH \
                                    -u ubuntu \
                                    -e "GIT_COMMIT=${env.GIT_COMMIT}"
                            """
                        } catch (Exception e) {
                            error "Ansible deployment failed: ${e.getMessage()}"
                        }
                    }
                }
            }
        }
    }
}
