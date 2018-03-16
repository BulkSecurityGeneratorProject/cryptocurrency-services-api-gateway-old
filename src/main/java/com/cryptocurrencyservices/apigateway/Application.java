package com.cryptocurrencyservices.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
@SpringBootApplication
public class Application {

  @Bean
  public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
    return builder.routes()
      .route(r -> r.host("**")
        .uri("http://springboot-demo-springboot-demoweb:8081")
//        .route(r -> r.host("**.abc.org").and().path("/image/png")
//        .filters(f ->
//          f.addResponseHeader("X-TestHeader", "foobar"))
//        .uri("http://httpbin.org:80")
      )
      .build();
  }


  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

}