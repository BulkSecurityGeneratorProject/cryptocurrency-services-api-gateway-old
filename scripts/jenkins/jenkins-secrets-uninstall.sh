#!/bin/bash

context=$1

kubectl --context=${context} --namespace jx delete -f ./jenkins-secrets.yml


