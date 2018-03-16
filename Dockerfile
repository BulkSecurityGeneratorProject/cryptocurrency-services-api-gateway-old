FROM maven:3-jdk-9-slim
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN mvn clean package
#USER 0
EXPOSE 8080
CMD ["java", "-jar", "./target/cryptocurrency-services-api-gateway-1.0-SNAPSHOT.jar"]