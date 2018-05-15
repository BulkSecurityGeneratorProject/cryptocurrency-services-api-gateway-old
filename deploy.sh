#!/bin/bash


eval $(minikube docker-env)

#mvn package
#
#cd target/
#
#docker build -t minikube/cryptocurrency-services-api-gateway:0.1.0 .
#
#cd ..

./mvnw verify -Pprod dockerfile:build

helm install -n cryptocurrency-services-api-gateway helm-charts/gateway
