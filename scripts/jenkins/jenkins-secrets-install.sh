#!/bin/bash


context=$1
mongoProdTestUser=$2
mongoProdTestPass=$3
mongoProdTestUserPass=`echo "${mongoProdTestUser}:${mongoProdTestPass}@" | base64`

echo "encrypted mongoProdTestUserPass: ${mongoProdTestUserPass}"

cat ./jenkins-secrets.yml | sed "s/\X_MONGO_PROD_TEST_USER_PASS_X/${mongoProdTestUserPass}/" | kubectl --context=${context} --namespace jx create -f -



