#!/bin/bash

database=$1

helm --namespace cryptocurrency-services --kube-context minikube install -n cryptocurrency-services-api-gateway --set database=${database} charts/cryptocurrency-services-api-gateway


if [ $? -eq 0 ]
then
  echo "Deploy Success"
else
  echo "Deploy Error" >&2
fi
