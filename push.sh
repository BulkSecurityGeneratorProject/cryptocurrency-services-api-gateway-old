#!/bin/bash

if [[ ! -z ${KUBE_ENV} ]]
then
    git config remote.origin.url https://github.com/kevinstl/cryptocurrency-services-api-gateway.git
    git config --global credential.helper store
    jx step git credentials

    git pull origin HEAD
    git push origin HEAD
fi

if [ $? -eq 0 ]
then
  echo "Deploy Success"
else
  echo "Deploy Error" >&2
fi
