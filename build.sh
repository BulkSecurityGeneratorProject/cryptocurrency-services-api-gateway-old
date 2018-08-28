#!/bin/bash

set -e

buildEnv=$1
mavenProfile=$2
mavenCommand=$3
skipTests=$4

mongoHostTest="localhost"
mongoPortTest=0
mongoDatabaseTest="cryptocurrency-services-local-test"
mongoHost="gateway-db-mongodb.jx-local.svc.cluster.local"
mongoPort="27017"
mongoDatabase="cryptocurrency-services-local-test"
dockerFileBuild="dockerfile:build"


if [[ -z ${KUBE_ENV} ]]
then
    mongoHostTest="ds113122.mlab.com"
    mongoPortTest="13122"
    mongoDatabaseTest="cryptocurrency-services-prod-test"
    mongoHost="ds123562.mlab.com"
    mongoPort="23562"
    mongoDatabase="cryptocurrency-services-prod"
    dockerFileBuild=""
fi

if [[ -z ${mavenCommand} ]]
then
    mavenCommand="install"
fi


echo "KUBE_ENV: ${KUBE_ENV}"
echo "MONGO_PROD_TEST_USER: ${MONGO_PROD_TEST_USER}"
echo "MONGO_PROD_TEST_PASS: ${MONGO_PROD_TEST_PASS}"
echo "mongoHostTest: ${mongoHostTest}"
echo "mongoPortTest: ${mongoPortTest}"
echo "mongoDatabaseTest: ${mongoDatabaseTest}"
echo "mongoHost: ${mongoHost}"
echo "mongoPort: ${mongoPort}"
echo "mongoDatabase: ${mongoDatabase}"

case ${buildEnv} in
  local)
        echo "build local"
        eval $(minikube docker-env)
        export MONGO_HOST_TEST="localhost"
        export MONGO_PORT_TEST=0
        export MONGO_DATABASE_TEST=${mongoDatabaseTest}
        export MONGO_HOST=${mongoHost}
        export MONGO_PORT=${mongoPort}
        export MONGO_DATABASE=${mongoDatabase}
        echo "mvn args: -e -P${mavenProfile},${buildEnv} ${skipTests} clean ${mavenCommand} ${dockerFileBuild}"
        mvn -e -P${mavenProfile},${buildEnv} ${skipTests} clean ${mavenCommand} ${dockerFileBuild}
#        mvn local-bad-stuff
        ;;
  container)
        echo "build container"
        export MONGO_HOST_TEST=${mongoHostTest}
        export MONGO_PORT_TEST=${mongoPortTest}
        export MONGO_DATABASE_TEST=${mongoDatabaseTest}
        export MONGO_HOST=${mongoHost}
        export MONGO_PORT=${mongoPort}
        export MONGO_DATABASE=${mongoDatabase}
#        mvn -e -P${mavenProfile} -s /host-home/.m2/settings.xml -Dmaven.repo.local=/host-home/.m2/repository clean verify dockerfile:build
#        mvn -e -Pprod -DskipTests clean verify dockerfile:build
#        echo "mvn args: -e -P${mavenProfile} ${skipTests} ${SETTINGS_XML} ${MAVEN_REPO} clean ${mavenCommand} ${dockerFileBuild}"
        echo "mvn args: -e -P${mavenProfile} ${skipTests} ${SETTINGS_XML} ${MAVEN_REPO} clean ${mavenCommand}"
#        mvn -e -P${mavenProfile} ${skipTests} ${SETTINGS_XML} ${MAVEN_REPO} clean ${mavenCommand} ${dockerFileBuild}
        mvn -e -P${mavenProfile} ${skipTests} ${SETTINGS_XML} ${MAVEN_REPO} clean ${mavenCommand}
#        mvn container-bad-stuff
        ;;
esac

#echo "MONGO_HOST_TEST: ${MONGO_HOST_TEST}"

if [ $? -eq 0 ]
then
  echo "Build Success"
else
  echo "Build Error: $?"
fi


#sleep 1000000

