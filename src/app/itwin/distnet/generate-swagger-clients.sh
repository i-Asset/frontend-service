#curl -o swagger-codegen-cli.jar https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.42/swagger-codegen-cli-3.0.42.jar
java -jar swagger-codegen-cli.jar generate -i ./distnet-openapi3.yaml -l typescript-angular -o openapi3-gen/ -c ./options.json