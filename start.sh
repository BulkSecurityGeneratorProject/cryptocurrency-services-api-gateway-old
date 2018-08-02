#!/bin/bash


./stop.sh

docker-compose -f src/main/docker/mongodb.yml up -d
docker-compose -f src/main/docker/jhipster-registry.yml up -d

trap "kill 0" EXIT

./yarn-start.sh &

./mvnw &

wait

