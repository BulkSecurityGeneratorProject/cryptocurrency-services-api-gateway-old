pipeline {
    agent {
      label "jenkins-maven"
    }
    environment {
      ORG               = 'kevinstl'
      APP_NAME          = 'cryptocurrency-services-api-gateway'
      CHARTMUSEUM_CREDS = credentials('jenkins-x-chartmuseum')
    }
    stages {

      stage('deploy') {
        steps {
          container('maven') {
            //sh "pwd"
            //sh "whoami"
            //sh "curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -"
            //sh "yum install -y nodejs"
            //sh "curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo"
            //sh "yum install -y yarn"
            //sh "yarn install"
            //sh "npm install -g n"
            //sh "n 8.10.0"
            //sh "npm install -g npm@5.10.0"
            //sh "npm install -g yarn@1.5.1"
            //sh "ls -al"
            //sh "mvn -e -Pprod -DskipTests -s /host-home/.m2/settings.xml clean verify dockerfile:build"
            //sh "kubectl --namespace default delete pods -l app=cryptocurrency-services-api-gateway-cryptocurrency-services-api"

            sh "./build-deploy.sh container prod"
            sh "[[ $? -ne 0 ]] && exit"


          }
        }
      }

      stage('push') {
        steps {
          container('maven') {
            sh "git config remote.origin.url https://github.com/kevinstl/cryptocurrency-services-api-gateway.git"
            sh "git config --global credential.helper store"
            sh "jx step git credentials"
            sh "git push origin HEAD"

          }
        }
      }

      stage('CI Build and push snapshot') {
        when {
          branch 'PR-*'
        }
        environment {
          PREVIEW_VERSION = "0.0.0-SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER"
          PREVIEW_NAMESPACE = "$APP_NAME-$BRANCH_NAME".toLowerCase()
          HELM_RELEASE = "$PREVIEW_NAMESPACE".toLowerCase()
        }
        steps {
          container('maven') {
            sh "mvn versions:set -DnewVersion=$PREVIEW_VERSION"
            sh "mvn install"
            sh 'export VERSION=$PREVIEW_VERSION && skaffold build -f skaffold.yaml'


            sh "jx step post build --image $DOCKER_REGISTRY/$ORG/$APP_NAME:$PREVIEW_VERSION"
          }

          dir ('./charts/preview') {
           container('maven') {
             sh "make preview"
             sh "jx preview --app $APP_NAME --dir ../.."
           }
          }
        }
      }
      stage('Build Release') {
        when {
          branch 'master'
        }
        steps {
          container('maven') {
            // ensure we're not on a detached head
            sh "git checkout master"
            sh "git config --global credential.helper store"

            sh "jx step git credentials"
            // so we can retrieve the version in later steps
            sh "echo \$(jx-release-version) > VERSION"
            sh "mvn versions:set -DnewVersion=\$(cat VERSION)"
          }
          dir ('./charts/cryptocurrency-services-api-gateway') {
            container('maven') {
              sh "make tag"
            }
          }
          container('maven') {
            sh 'mvn clean deploy'

            sh 'export VERSION=`cat VERSION` && skaffold build -f skaffold.yaml'


            sh "jx step post build --image $DOCKER_REGISTRY/$ORG/$APP_NAME:\$(cat VERSION)"
          }
        }
      }
      stage('Promote to Environments') {
        when {
          branch 'master'
        }
        steps {
          dir ('./charts/cryptocurrency-services-api-gateway') {
            container('maven') {
              sh 'jx step changelog --version v\$(cat ../../VERSION)'

              // release the helm chart
              sh 'jx step helm release'

              // promote through all 'Auto' promotion Environments
              sh 'jx promote -b --all-auto --timeout 1h --version \$(cat ../../VERSION)'
            }
          }
        }
      }
    }
    post {
        always {
            cleanWs()
        }
        failure {
            input """Pipeline failed.
We will keep the build pod around to help you diagnose any failures.

Select Proceed or Abort to terminate the build pod"""
        }
    }
  }
