# NestJS Task Management REST API

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

> A robust, production-ready RESTful API for task management. Engineered with NestJS and PostgreSQL, this project strictly adheres to a modular, 3-tier architecture and implements enterprise-grade security practices.

## Project Overview

This repository contains the backend infrastructure for a Task Management application. It is designed with scalability and maintainability in mind, leveraging the Data Mapper pattern to decouple business logic from data access, ensuring a clean and testable codebase.

*(Optional: Insert a screenshot of your successful API test here: `![API Demo](./docs/postman.png)`)*

## Key Features

* **Authentication & Authorization:** * Secure user registration and login workflows.
    * Stateless authentication using JSON Web Tokens (JWT) and Passport.js.
    * Cryptographic password hashing and salting via `bcrypt`.
* **Advanced Task Management (CRUD):**
    * Create, read, update (status), and delete tasks.
    * Sophisticated querying capabilities including dynamic filtering and search.
* **Data Segregation & Ownership:**
    * Strict tenant-level data isolation: Users can only retrieve, modify, or delete tasks associated with their own accounts.
* **Security & Data Integrity:**
    * **Input Validation:** Utilizes Data Transfer Objects (DTOs) and NestJS Pipes to sanitize and validate incoming payloads.
    * **Data Serialization:** Implements custom Interceptors and `class-transformer` to automatically strip sensitive information (e.g., passwords, raw user objects) from outgoing JSON responses, preventing data leakage.

## System Architecture

The application enforces a strict separation of concerns, utilizing TypeORM's Data Mapper pattern to isolate database interactions from core business logic.

```mermaid
graph TD
    Client([Client / Postman]) -->|HTTP Request + JWT| Controller(Controllers)
    
    subgraph NestJS Application
    Controller -->|DTO| ValidationPipe(Validation Pipes)
    ValidationPipe --> Service(Services\nBusiness Logic)
    Service -->|Entities| Repository(Repositories\nData Mapper)
    end
    
    Repository -->|TypeORM / SQL| Database[(PostgreSQL)]
    
    classDef nest fill:#e0234e,stroke:#fff,stroke-width:2px,color:#fff;
    class Controller,Service,ValidationPipe,Repository nest;