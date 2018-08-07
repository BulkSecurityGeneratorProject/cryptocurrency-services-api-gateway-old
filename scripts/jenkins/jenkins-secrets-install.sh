#!/bin/bash


context=$1
mongoProdTestUser=$2
mongoProdTestPass=$3

if [[ ("${mongoProdTestUser}"!="") && ("${mongoProdTestPass}" != "") ]]
then
    mongoProdTestUser=`echo "${mongoProdTestUser}" | base64`
    mongoProdTestPass=`echo "${mongoProdTestPass}" | base64`
else
    mongoProdTestUser=""
    mongoProdTestPass=""
fi

echo "mongoProdTestUser: ${mongoProdTestUser}"
echo "mongoProdTestPass: ${mongoProdTestPass}"

cat ./jenkins-secrets.yml | sed "s/\X_MONGO_PROD_TEST_USER_X/${mongoProdTestUser}/" | sed "s/\X_MONGO_PROD_TEST_PASS_X/${mongoProdTestPass}/" | kubectl --context=${context} --namespace jx create -f -



