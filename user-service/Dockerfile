FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app
COPY target/user-service-*.jar user-service.jar

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "user-service.jar"]