# EcommerceGapsiApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

## ECommerce GapsiAPP

Este proyecto contiene una aplicación desarrollada en dos partes:

    Back-End: API RESTful desarrollada con Spring Boot.

    Front-End: Interfaz de usuario desarrollada con Angular (versión LTS).

## Requisitos Previos

## Back-End
    Java 11+
    Maven 3.8+
    IDE recomendado: Spring Tool Suite (STS) o IntelliJ

 ## Front-End
    Node.js 18+
    Angular CLI (versión LTS):
        npm install -g @angular/cli

## Instrucciones para Ejecutar el Back-End

1. Clona el repositorio o descarga el proyecto.
    https://github.com/jhon1603/backend-proveedores
2. Abre el proyecto en tu IDE (Se recomienda Spring Tool Suites.).
3. Ejecuta la clase ClientesApplication.java como una aplicación Spring Boot.
4. Verifica que el servidor esté activo en: http://localhost:8080
5. Endpoint principal de versión:
    GET http://localhost:8080/version
6. Endpoint para proveedores (paginado):
    GET http://localhost:8080/proveedores?page=0&size=10
7. Base de datos: Se utiliza H2 embebida. Acceso en:
    URL: http://localhost:8080/h2-console
    JDBC URL: jdbc:h2:mem:testdb
8. Documentación SwaggerUI en:
    http://localhost:8080/swagger-ui/index.html    

## Instrucciones para Ejecutar el Front-End

1. Clona el repositorio o descarga el proyecto.
    https://github.com/jhon1603/frontend-proveedores
2. Abre el proyecto en tu IDE (Se recomienda Visual Studio Code.)
3. En una terminal, navega al directorio del proyecto Angular.
4. Instala las dependencias:
    npm install
5. Ejecuta la aplicación:
    ng serve
6. Abre tu navegador y accede a:
    http://localhost:4200

## Funcionalidades

1. Pantalla de bienvenida con versión obtenida desde el Back-End
2. CRUD de proveedores con modal de inserción y eliminación
3. Scroll infinito con paginación backend

