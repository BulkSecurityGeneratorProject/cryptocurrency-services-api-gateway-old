# cryptocurrency-services-api-gateway

# Deploy to Google Kubernetes Engine
eval $(minikube docker-env)
./mvnw verify -Pprod dockerfile:build
gcloud docker -- push gcr.io/cryptocurrencyservices-197520/cryptocurrency-services-api-gateway:0.1.0

helm install -n cryptocurrency-services-api-gateway helm-charts/gateway
helm del --purge cryptocurrency-services-api-gateway


# Deploy using jenkins x

Add environment variables to maven container template:
	
Key	        MONGO_PROD_TEST_USER
SecretName  jenkins-secrets
SecretKey   mongo-prod-test-user

Key	        MONGO_PROD_TEST_PASS
SecretName	jenkins-secrets
SecretKey	mongo-prod-test-pass


# promote to production
jx promote cryptocurrency-services-api-gateway --version 0.0.93 --env production




