# 📝 Task Management API (NestJS)

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

> Một hệ thống RESTful API quản lý công việc chuyên nghiệp, được xây dựng với kiến trúc Modular và bảo mật chặt chẽ.

## 🚀 Giới thiệu dự án

Dự án này là hệ thống Backend cung cấp các API cho ứng dụng Quản lý công việc (Task Management). Hệ thống được thiết kế theo **Kiến trúc 3 lớp (3-Tier Architecture)** kết hợp với mô hình **Data Mapper**, đảm bảo tính mở rộng, dễ bảo trì và hiệu năng cao.

*(Thêm 1 ảnh chụp màn hình Postman lúc test API thành công vào đây: `![Postman Screenshot](./docs/postman.png)`)*

## ✨ Tính năng nổi bật

* **Xác thực & Phân quyền (Auth):** * Đăng ký / Đăng nhập an toàn.
    * Bảo mật API bằng **JSON Web Tokens (JWT)** và Passport.js.
    * Mật khẩu được băm (hashing & salting) bằng bcrypt.
* **Quản lý Công việc (Tasks CRUD):**
    * Tạo, đọc, cập nhật (trạng thái), và xóa công việc.
    * Tìm kiếm và lọc công việc thông minh (Filter & Search).
    * **Data Ownership:** Người dùng nào chỉ được phép xem và thao tác trên công việc của chính người đó.
* **Bảo mật & Chuẩn hóa Dữ liệu:**
    * Sử dụng **DTOs (Data Transfer Objects)** và Pipes để validate dữ liệu đầu vào.
    * Sử dụng Interceptors và Class-Transformer để ẩn dữ liệu nhạy cảm (như mật khẩu) trước khi trả về Client.

## 🏗 Kiến trúc hệ thống (Architecture)

Hệ thống tuân thủ nghiêm ngặt mô hình **Data Mapper** của TypeORM, tách biệt hoàn toàn logic nghiệp vụ và logic truy xuất cơ sở dữ liệu.

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