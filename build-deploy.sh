#!/bin/bash

buildEnv=$1
mavenProfile=$2

./build.sh ${buildEnv} ${mavenProfile}

./deploy.sh
