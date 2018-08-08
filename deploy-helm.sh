#!/bin/bash


helm --kube-context minikube install -n cryptocurrency-services-api-gateway helm-charts/gateway


if [ $? -eq 0 ]
then
  echo "Deploy Success"
else
  echo "Deploy Error" >&2
fi
