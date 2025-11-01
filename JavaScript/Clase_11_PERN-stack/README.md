# 📝 Aplicación de Gestión de Tareas con Autenticación

¡Bienvenido! Este proyecto es una aplicación web completa para la **gestión de tareas**, que incluye funcionalidades de **autenticación** de usuarios (registro e inicio de sesión).

---

## ✨ Funcionalidades

La aplicación permite a los usuarios registrados realizar las siguientes operaciones sobre las tareas:

* **Crear** nuevas tareas.
* **Modificar** tareas existentes.
* **Listar** todas sus tareas.
* **Eliminar** tareas.
* **Registro** de nuevos usuarios (nombre, correo y contraseña).
* **Inicio de Sesión** para acceder a las funcionalidades de gestión de tareas.

---

## 🚀 Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando el *stack* **PERN** (PostgreSQL, Express, React, Node.js), complementado con librerías clave para la gestión de datos y la seguridad:

| Área | Tecnología | Propósito Principal |
| :--- | :--- | :--- |
| **Base de Datos** | **PostgreSQL** | Almacenamiento persistente de datos de usuarios y tareas. |
| **Backend** | **Node.js** | Entorno de ejecución del servidor. |
| **Backend** | **JavaScript** | Lenguaje de programación del servidor. |
| **Frontend** | **React** | Biblioteca para construir la interfaz de usuario. |
| **Autenticación** | **JWT (JSON Web Tokens)** | Generación y validación de *tokens* de sesión para el inicio de sesión. |
| **Manejo HTTP** | **Axios** | Cliente HTTP para realizar peticiones desde el frontend al backend. |
| **Validación** | **Zod** | Creación de esquemas para la validación de datos (entrada de formularios, etc.). |

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para poner en marcha la aplicación en tu entorno local:

### 1. Configuración de la Base de Datos

Antes de iniciar la aplicación, debes configurar la base de datos:

1.  Crea una nueva base de datos en PostgreSQL y **nómbrala `PERN`**.
2.  Ejecuta el script SQL situado en `./PERN-stack/database/init.sql` para inicializar la base de datos con las tablas `TAREAS` y `USUARIOS`.

### 2. Inicio del Servidor (Backend)

Una vez creada y poblada la base de datos:

1.  Navega a la ruta principal del proyecto: `cd ./PERN-stack`.
2.  Ejecuta el siguiente comando para instalar dependencias e iniciar el servidor:

    ```bash
    npm run dev
    ```

    El servidor backend se iniciará y estará escuchando en el puerto **`3000`**.

### 3. Inicio del Cliente (Frontend)

En una terminal separada:

1.  Navega a la carpeta del cliente: `cd ./PERN-stack/frontend`.
2.  Ejecuta el siguiente comando:

    ```bash
    npm run dev
    ```

    El cliente frontend se iniciará.

---

## 🌐 Acceso a la Aplicación

Una vez que el backend y el frontend estén en ejecución, puedes acceder a la aplicación desde tu navegador en la siguiente URL:

👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🏫 Información del Proyecto

Este proyecto fue desarrollado en el marco de la **Tecnicatura Universitaria en Programación** de la **Universidad Tecnológica Nacional (UTN) Facultad Regional San Rafael**, Mendoza, Argentina.

* **Grupo Desarrollador:** DynamicDevs
* **Cohorte:** 2024