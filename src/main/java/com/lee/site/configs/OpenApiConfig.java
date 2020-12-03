package com.lee.site.configs;

import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Component
public class OpenApiConfig {

	@Bean
	public OpenAPI openAPI(@Value("${demo.version}") String appVersion,
			@Value("${demo.url}") String url, @Value("${spring.profiles.active}") String active) {
		Info info = new Info().title("Demo API - " + active).version(appVersion)
				.description("Spring Boot를 이용한 웹 애플리케이션입니다.")
				.termsOfService("http://swagger.io/terms/")
				//.contact(new Contact().name("hyun").url("https://blog.test.com/").email("test@test.com"))
				.license(new License().name("Apache License Version 2.0").url("http://www.apache.org/licenses/LICENSE-2.0"));

		List<Server> servers = Arrays.asList(new Server().url(url).description("demo (" + active +")"));

		SecurityScheme securityScheme = new SecurityScheme()
				.type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")
				.in(SecurityScheme.In.HEADER).name("Authorization");
		SecurityRequirement schemaRequirement = new SecurityRequirement().addList("bearerAuth");

		return new OpenAPI()
				.components(new Components().addSecuritySchemes("bearerAuth", securityScheme))
				.addSecurityItem(schemaRequirement)
				.security(Arrays.asList(schemaRequirement))
				.info(info)
				.servers(servers);
	}

}
