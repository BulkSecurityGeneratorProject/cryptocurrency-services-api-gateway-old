#!/bin/bash

set -e

#kubectl --namespace default delete pods -l app=cryptocurrency-services-api-gateway-cryptocurrency-services-api


if [ $? -eq 0 ]
then
  echo "Deploy Success"
else
  echo "Deploy Error: $?"
fi
