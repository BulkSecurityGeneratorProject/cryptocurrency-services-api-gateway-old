#!/bin/bash

context=$1

kubeContextArg=""
if [[ ${context} != "" ]]
then
    kubeContextArg="--kube-context ${context}"
fi


helm ${kubeContextArg} del --purge cryptocurrency-services-api-gateway


#./undeploy-helm.sh minikube
#./undeploy-helm.sh ""
