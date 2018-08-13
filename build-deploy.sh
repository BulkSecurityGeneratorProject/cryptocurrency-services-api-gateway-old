#!/bin/bash

buildEnv=$1
mavenProfile=$2
mavenCommand=$3

./build.sh ${buildEnv} ${mavenProfile} ${mavenCommand}

./deploy.sh

if [ $? -eq 0 ]
then
  echo "Build Deploy Success"
else
  echo "Build Deploy Error" >&2
fi
