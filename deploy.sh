#!/bin/bash


kubectl --namespace default delete pods -l app=cryptocurrency-services-api-gateway-cryptocurrency-services-api


if [ $? -eq 0 ]
then
  echo "Deploy Success"
else
  echo "Deploy Error" >&2
fi
