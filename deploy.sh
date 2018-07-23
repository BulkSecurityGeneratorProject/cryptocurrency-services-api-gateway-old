#!/bin/bash


kubectl create namespace cryptocurrency-services

#helm --namespace cryptocurrency-services install -n cryptocurrency-services-api-gateway helm-charts/gateway

helm --namespace default install -n cryptocurrency-services-api-gateway helm-charts/gateway
