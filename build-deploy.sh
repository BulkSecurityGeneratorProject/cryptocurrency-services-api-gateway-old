#!/bin/bash

set -e

buildEnv=$1
mavenProfile=$2
mavenCommand=$3
skipTests=$4

./build.sh ${buildEnv} ${mavenProfile} ${mavenCommand} ${skipTests}

./deploy.sh

if [ $? -eq 0 ]
then
  echo "Build Deploy Success"
else
  echo "Build Deploy Error: $?"
fi
