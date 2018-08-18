#!/bin/bash


context=$1
namespace=$2
mongoProdTestUser=$3
mongoProdTestPass=$4
adminUser=$5
adminPass=$6
mongoAddress=$7

echo "mongodb://${adminUser}:${adminPass}@${mongoAddress}"


if [[ ("${mongoProdTestUser}"!="") && ("${mongoProdTestPass}" != "") ]]
then
    mongoProdTestUser=`echo -n "${mongoProdTestUser}" | base64`
    mongoProdTestPass=`echo -n "${mongoProdTestPass}" | base64`
    eurekaClientServiceUrlDefaultzone=`echo -n "http://${adminUser}:${adminPass}@jhipster-registry-service.${namespace}.svc.cluster.local:8761/eureka" | base64`
    springCloudConfigUri=`echo -n "http://${adminUser}:${adminPass}@jhipster-registry-service.${namespace}.svc.cluster.local:8761/config" | base64`
    springDataMongodbUri=`echo -n "mongodb://${adminUser}:${adminPass}@${mongoAddress}" | base64`
else
    mongoProdTestUser=""
    mongoProdTestPass=""
    eurekaClientServiceUrlDefaultzone=""
    springCloudConfigUri=""
    springDataMongodbUri=""
fi

echo "mongoProdTestUser: ${mongoProdTestUser}"
echo "mongoProdTestPass: ${mongoProdTestPass}"
echo "eurekaClientServiceUrlDefaultzone: ${eurekaClientServiceUrlDefaultzone}"
echo "springCloudConfigUri: ${springCloudConfigUri}"
echo "springDataMongodbUri: ${springDataMongodbUri}"

cat ./jenkins-secrets.yml | sed "s/\X_MONGO_PROD_TEST_USER_X/${mongoProdTestUser}/" | \
sed "s/\X_MONGO_PROD_TEST_PASS_X/${mongoProdTestPass}/" | \
sed "s/\X_EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE_X/${eurekaClientServiceUrlDefaultzone}/" | \
sed "s/\X_SPRING_CLOUD_CONFIG_URI_X/${springCloudConfigUri}/" | \
sed "s/\X_SPRING_DATA_MONGODB_URI_X/${springDataMongodbUri}/" | \
kubectl --context=${context} --namespace ${namespace} create -f -



