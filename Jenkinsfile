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


      //stage('deploy') {
      //  //environment {
      //    //VAR_MONGO_PROD_TEST_USER_PASS = "$MONGO_PROD_TEST_USER_PASS"
      //  //}
      //  steps {
      //    //container('maven') {
      //    //  sh "ls -al"
      //    //  //sh "./build-deploy.sh container prod verify -DskipTests"
      //    //  sh "./build.sh container prod verify"
      //    //}
      //    //release(null)
      //    //promote()
      //  }
      //}

      //stage('Build And Test') {
      //  steps {
      //    container('maven') {
      //      sh "ls -al"
      //      sh "./build.sh container prod verify"
      //    }
      //  }
      //}

      stage('Release Feature') {
        when {
          branch 'feature-*'
        }
        steps {
          release(null)
        }
      }
      stage('Promote Feature') {
        when {
          branch 'feature-*'
        }
        steps {
          promote()
        }
      }

      stage('Push Local') {
        steps {
          container('maven') {
            //sh "./push.sh"
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
            //sh "mvn install"
            //sh "./build.sh container prod verify"
            sh "./build.sh container prod package"

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
            release('master')
        }
      }
      stage('Promote to Environments') {
        when {
          branch 'master'
        }
        steps {
          promote()
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

def release(branch) {

        container('maven') {
            // ensure we're not on a detached head
            //sh "git checkout master"

            if (branch?.trim()) {
                sh "git checkout $branch"
            }

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
            //sh 'mvn clean deploy'
            //sh "./build.sh container prod verify -DskipTests"

            sh "ls -al"
            //sh "./build.sh container prod package -DskipTests"
            sh "./build.sh container prod package

            sh 'export VERSION=`cat VERSION` && skaffold build -f skaffold.yaml'

            sh "jx step post build --image $DOCKER_REGISTRY/$ORG/$APP_NAME:\$(cat VERSION)"
        }

    }

    def promote() {

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

