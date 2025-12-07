# skillnest-m7-evaluacion
# Gestión de Usuarios y Roles (Módulo 7)

Aplicación backend desarrollada con **Node.js**, **Express** y **PostgreSQL** que implementa un sistema de gestión de usuarios y roles. El proyecto utiliza **Sequelize** como ORM para el modelado de datos, manejo de relaciones y transacciones para asegurar la integridad de la información.

## 📋 Características

* **Arquitectura MVC:** Separación de lógica en Modelos, Vistas (Rutas) y Controladores.
* **ORM Sequelize:** Abstracción de base de datos PostgreSQL.
* **Relaciones:** Implementación de relaciones 1:N (Un Rol tiene muchos Usuarios).
* **Transacciones:** Uso de `sequelize.transaction()` para garantizar atomicidad en la creación de registros dependientes.
* **CRUD Completo:** Operaciones de Crear, Leer, Actualizar y Eliminar.

## 🛠 Requisitos Previos

* Node.js instalado.
* PostgreSQL instalado y corriendo.
* Base de datos creada en Postgres (por defecto configurada como `m7_gestion_usuarios_db`).

## ⚙️ Instalación y Configuración

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Configurar Base de Datos:**
    * Abrir el archivo `/config/config.json`.
    * Editar la sección `development` con tus credenciales de PostgreSQL (`username`, `password`, `database`).

3.  **Ejecutar Migraciones:**
    Para crear las tablas `Usuarios` y `Rols` en la base de datos:
    ```bash
    npx sequelize-cli db:migrate
    ```

4.  **Iniciar el Servidor:**
    ```bash
    npm run dev
    # O para producción:
    node app.js
    ```
    El servidor correrá en `http://localhost:3000`.

## 🚀 Endpoints de la API

Puedes probar estos endpoints usando Postman o Thunder Client.

### Roles
* **GET** `/api/roles`: Lista todos los roles.
* **POST** `/api/roles`: Crea un nuevo rol.
    * *Body:* `{ "nombre": "Admin" }`

### Usuarios
* **GET** `/api/usuarios`: Lista usuarios incluyendo su rol asociado.
* **POST** `/api/usuarios`: Crea un usuario (Usa Transacciones). Requiere un `rolId` válido.
    * *Body:* ```json
        {
            "nombre": "Juan",
            "correo": "juan@mail.com",
            "password": "123",
            "rolId": 1
        }
        ```
* **PUT** `/api/usuarios/:id`: Actualiza un usuario.
* **DELETE** `/api/usuarios/:id`: Elimina un usuario.

## 📂 Estructura del Proyecto

* **/config**: Configuración de conexión a BD.
* **/controllers**: Lógica de negocio (aquí se implementan las transacciones).
* **/models**: Modelos Sequelize (Usuario, Rol) y sus asociaciones.
* **/migrations**: Scripts para generación de tablas.
* **/routes**: Definición de endpoints.
* **app.js**: Punto de entrada del servidor.

## 🛡 Transacciones y Buenas Prácticas

Se implementaron transacciones en la creación de usuarios (`usuarioController.js`) para validar la existencia del rol antes de confirmar la inserción del usuario, asegurando que no queden datos inconsistentes en la base de datos si ocurre un error en el proceso.