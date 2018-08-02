#!/bin/bash

#pkill -f yarn.sh
#pkill -f webpack
#pkill -f localhost:9000
#pkill -f cryptocurrency-services-api-gateway


docker-compose -f src/main/docker/mongodb.yml down
docker-compose -f src/main/docker/jhipster-registry.yml down


