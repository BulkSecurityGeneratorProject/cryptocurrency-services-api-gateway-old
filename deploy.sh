#!/bin/bash


#./undeploy.sh

#kubectl --namespace cryptocurrency-services delete pods -l app=cryptocurrency-services-api-gateway-cryptocurrency-services-api

#kubectl --namespace default delete pods -l app=cryptocurrency-services-api-gateway-cryptocurrency-services-api


#kubectl create namespace cryptocurrency-services

#helm --namespace cryptocurrency-services install -n cryptocurrency-services-api-gateway helm-charts/gateway

helm --namespace default install -n cryptocurrency-services-api-gateway helm-charts/gateway
