#!/bin/bash

context=$1

kubectl --context=${context} --namespace jx delete -f ./jenkins-pod-preset-master.yml
kubectl --context=${context} --namespace jx delete -f ./jenkins-pod-preset-slave.yml




