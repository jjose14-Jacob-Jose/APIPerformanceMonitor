FROM maven:3.8.4-openjdk-17-slim AS build
LABEL authors="jacob"
COPY backend/pom.xml .
COPY backend/src ./src
COPY backend/src/main/resources/application-docker.properties ./src/main/resources/application.properties
RUN mvn clean install
FROM openjdk:22-ea-21-jdk-oraclelinux8
WORKDIR /app
COPY --from=build target/apm-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
CMD ["java", "-jar", "apm-0.0.1-SNAPSHOT.jar"]
