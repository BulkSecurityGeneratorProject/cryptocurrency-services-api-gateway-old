#!/bin/bash


#./undeploy.sh

#kubectl --namespace cryptocurrency-services delete pods -l app=cryptocurrency-services-api-gateway-cryptocurrency-services-api

#kubectl --namespace default delete pods -l app=cryptocurrency-services-api-gateway-cryptocurrency-services-api


#kubectl create namespace cryptocurrency-services

#helm --namespace cryptocurrency-services install -n cryptocurrency-services-api-gateway helm-charts/gateway

#helm --namespace default install -n cryptocurrency-services-api-gateway helm-charts/gateway


kubectl --namespace default delete pods -l app=cryptocurrency-services-api-gateway-cryptocurrency-services-api


if [ $? -eq 0 ]
then
  echo "Deploy Success"
else
  echo "Deploy Error" >&2
fi
