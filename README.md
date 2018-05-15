# cryptocurrency-services-api-gateway

# Deploy to Google Kubernetes Engine
eval $(minikube docker-env)
./mvnw verify -Pprod dockerfile:build
gcloud docker -- push gcr.io/cryptocurrencyservices-197520/cryptocurrency-services-api-gateway:0.1.0

helm del --purge cryptocurrency-services-api-gateway
helm install -n cryptocurrency-services-api-gateway helm-charts/gateway
