#!/bin/bash

buildEnv=$1
mavenProfile=$2

mongoHost="gateway-db-mongodb.default.svc.cluster.local"
mongoPort="27017"
mongoDatabase="CryptocurrencyServicesApiGateway"

if [ ${KUBE_ENV} == "" ]
then
    mongoHost="ds113122.mlab.com"
    mongoPort="13122"
    mongoDatabase="cryptocurrency-services-prod-test"
fi

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
        mvn -e -P${mavenProfile},${buildEnv} clean install dockerfile:build
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
        mvn -e -P${mavenProfile} ${SETTINGS_XML} ${MAVEN_REPO} clean verify dockerfile:build
        ;;
esac

if [ $? -eq 0 ]
then
  echo "Build Success"
else
  echo "Build Error" >&2
fi



