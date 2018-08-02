#!/bin/bash


echo begin start yarn!!!!!


webAppStatus=`wget -O- http://localhost:8080 2>&1 | grep 200`
echo "webAppStatus: " ${webAppStatus}
if [ "$webAppStatus" == "" ]
then
    echo "web app not running"
    sleep 5
    ./yarn-start.sh
else
    yarn start
    echo "web app running"
fi



echo end start yarn!!!!!






