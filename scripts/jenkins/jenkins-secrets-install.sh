#!/bin/bash


context=$1
mongoProdTestUser=$2
mongoProdTestPass=$3
springDataMongodbUri=$3

if [[ ("${mongoProdTestUser}"!="") && ("${mongoProdTestPass}" != "") ]]
then
    mongoProdTestUser=`echo -n "${mongoProdTestUser}" | base64`
    mongoProdTestPass=`echo -n "${mongoProdTestPass}" | base64`
    springDataMongodbUri=`echo -n "${springDataMongodbUri}" | base64`
else
    mongoProdTestUser=""
    mongoProdTestPass=""
    springDataMongodbUri=""
fi

echo "mongoProdTestUser: ${mongoProdTestUser}"
echo "mongoProdTestPass: ${mongoProdTestPass}"
echo "springDataMongodbUri: ${springDataMongodbUri}"

cat ./jenkins-secrets.yml | sed "s/\X_MONGO_PROD_TEST_USER_X/${mongoProdTestUser}/" | \
sed "s/\X_MONGO_PROD_TEST_PASS_X/${mongoProdTestPass}/" | \
sed "s/\X_SPRING_DATA_MONGODB_URI_X/${springDataMongodbUri}/" | \
kubectl --context=${context} --namespace jx create -f -



