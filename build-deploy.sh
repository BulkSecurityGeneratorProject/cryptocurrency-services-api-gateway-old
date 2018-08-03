#!/bin/bash

buildEnv=$1
mavenProfile=$2

./build.sh ${buildEnv} ${mavenProfile}

./deploy.sh

if [ $? -eq 0 ]
then
  echo "Build Deploy Success"
else
  echo "Build Deploy Error" >&2
fi
