# API Performance Monitor (APM)

## What is it?

If you have deployed web applications across multiple platforms, and you find difficult to track their usage, 'API Performance Monitor' is the right tool for you.
APM can receive and stores logs from other services in its database, which you later use for analysis. 

## Architecture
Click here, if you want to see the project architecture.  

## Running the APM Locally
### Prerequisites
1. [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/)
2. [Apache Maven](https://maven.apache.org/download.cgi)
2. [MongoDB Server](https://www.mongodb.com/try/download/community)

#### Docker
You can also run the project by building and running the Dockerfile. Your computer must have [Docker](https://www.docker.com/products/docker-desktop/) installed for this.  

### Steps to execute using JDK + MongoDB
1. Update MongoDB configuration information in the  `application.properties` (_src/main/resources/application.properties_).
2. Go to **backend** folder inside the root directory.
2. Open Terminal inside the backend directory.
2. Do the Maven build using the command: `mvn clean install`.
3. Go to the target folder: `cd target`
4. Run the JAR file: `java -jar .\apm-0.0.1-SNAPSHOT.jar`
5. Access Project at [http://localhost:8080/login](http://localhost:8080/login).

### Steps to execute using Dockerfile + MongoDB
1. Update MongoDB configuration information in the  `application-docker.properties` (_src/main/resources/application-docker.properties_).
2. Open Terminal in the root directory. 
2. Run the project via the Dockerfile on the **port 8080**.
3. `docker build -t apm_image:latest .`
4.  `docker run -p 8080:8080 --name apm_container apm_image:latest`
5. Access Project at [http://localhost:8080/login](http://localhost:8080/login).