#!/bin/bash

context=$1
namespace=$2

kubectl --context=${context} --namespace ${namespace} delete -f ./jenkins-secrets.yml

#./jenkins-secrets-uninstall.sh minikube cryptocurrency-services
#./jenkins-secrets-uninstall.sh minikube jx
