#!/bin/bash

buildEnv=$1
mavenProfile=$2

case ${buildEnv} in
  local)
        echo "build local"
        eval $(minikube docker-env)
        export MONGO_HOST_TEST="localhost"
        export MONGO_PORT_TEST=0
        export MONGO_HOST="gateway-db-mongodb.default.svc.cluster.local"
        export MONGO_PORT="27017"
        mvn -e -P${mavenProfile},${buildEnv} clean verify dockerfile:build
        ;;
  container)
        echo "build container"
        export MONGO_HOST_TEST="gateway-db-mongodb.default.svc.cluster.local"
        export MONGO_PORT_TEST="27017"
        export MONGO_HOST="gateway-db-mongodb.default.svc.cluster.local"
        export MONGO_PORT="27017"
        mvn -e -P${mavenProfile} -s /host-home/.m2/settings.xml -Dmaven.repo.local=/host-home/.m2/repository clean verify dockerfile:build
        ;;
esac




