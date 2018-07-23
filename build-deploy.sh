#!/bin/bash


eval $(minikube docker-env)

./mvnw verify -Pprod dockerfile:build

./deploy.sh
