package com.stc.apm;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "API Performance Monitor", version = "2.3.1", description = "API to monitor application logs"))
public class ApiPerformanceMonitorApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiPerformanceMonitorApplication.class, args);
	}

}
