#!/bin/bash

buildEnv=$1
mavenProfile=$2
mavenCommand=$3
skipTests=$4

mongoHost="gateway-db-mongodb.cryptocurrency-services.svc.cluster.local"
mongoPort="27017"
#mongoDatabase="CryptocurrencyServicesApiGateway"
mongoDatabase="cryptocurrency-services-local-test"
dockerFileBuild="dockerfile:build"


if [[ -z ${KUBE_ENV} ]]
then
    mongoHost="ds113122.mlab.com"
    mongoPort="13122"
    mongoDatabase="cryptocurrency-services-prod-test"
    dockerFileBuild=""
fi

if [[ -z ${mavenCommand} ]]
then
    mavenCommand="install"
fi


echo "KUBE_ENV: ${KUBE_ENV}"
echo "MONGO_PROD_TEST_USER: ${MONGO_PROD_TEST_USER}"
echo "MONGO_PROD_TEST_PASS: ${MONGO_PROD_TEST_PASS}"
echo "mongoHost: ${mongoHost}"
echo "mongoPort: ${mongoPort}"
echo "mongoDatabase: ${mongoDatabase}"

case ${buildEnv} in
  local)
        echo "build local"
        eval $(minikube docker-env)
        export MONGO_HOST_TEST="localhost"
        export MONGO_PORT_TEST=0
        export MONGO_DATABASE_TEST=${mongoDatabase}
        export MONGO_HOST=${mongoHost}
        export MONGO_PORT=${mongoPort}
        export MONGO_DATABASE=${mongoDatabase}
        echo "mvn args: -e -P${mavenProfile},${buildEnv} ${skipTests} clean ${mavenCommand} ${dockerFileBuild}"
        mvn -e -P${mavenProfile},${buildEnv} ${skipTests} clean ${mavenCommand} ${dockerFileBuild}
        ;;
  container)
        echo "build container"
        export MONGO_HOST_TEST=${mongoHost}
        export MONGO_PORT_TEST=${mongoPort}
        export MONGO_DATABASE_TEST=${mongoDatabase}
        export MONGO_HOST=${mongoHost}
        export MONGO_PORT=${mongoPort}
        export MONGO_DATABASE=${mongoDatabase}
#        mvn -e -P${mavenProfile} -s /host-home/.m2/settings.xml -Dmaven.repo.local=/host-home/.m2/repository clean verify dockerfile:build
#        mvn -e -Pprod -DskipTests clean verify dockerfile:build
        echo "mvn args: -e -P${mavenProfile} ${skipTests} ${SETTINGS_XML} ${MAVEN_REPO} clean ${mavenCommand} ${dockerFileBuild}"
        mvn -e -U -P${mavenProfile} ${skipTests} ${SETTINGS_XML} ${MAVEN_REPO} clean ${mavenCommand} ${dockerFileBuild}
        ;;
esac

#echo "MONGO_HOST_TEST: ${MONGO_HOST_TEST}"

if [ $? -eq 0 ]
then
  echo "Build Success"
else
  echo "Build Error" >&2
fi


#sleep 1000000

