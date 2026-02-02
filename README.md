
# 🍽️ Proyecto Final Máster - Frontend

Este repositorio contiene la aplicación **Frontend (SPA)** desarrollada con **React** y **Vite** para la gestión de pedidos de hostelería. Se conecta a la API del backend para permitir a los usuarios visualizar productos, gestionar su carrito y realizar pedidos según su rol.
El backend está levantado con render FREE, al no usarse la api, el render duerme la api, hasta que un usuario interactua con ella, cuando realiza la primera interacción, tarda 1 minuto en levantarse.

## 🏫 Información del Proyecto

* **Escuela:** Prometeo
* **Profesor:** Antonio Rosales
* **Alumno:** Jorge Sánchez
* **Tipo de Proyecto:** Frontend (React + Vite)
* **Url:** [Enlace a la web](https://worder-student.vercel.app/)

---

## 🚀 Tecnologías Utilizadas

El proyecto ha sido construido utilizando las siguientes librerías y herramientas modernas:

* **Core:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (Build tool ultrarrápida).
* **Enrutado:** `react-router-dom` (Gestión de rutas y navegación SPA).
* **Estado Global:** React **Context API** (Gestión del Carrito de compras).
* **Formularios:** `react-hook-form` (Manejo eficiente de formularios y validaciones).
* **Feedback UI:** `sonner` (Notificaciones Toast elegantes y ligeras).
* **Estilos:** CSS3 nativo con variables CSS y diseño Responsive.
* **Lógica asíncrona:** Custom Hooks propios (ej: `useFetch`) para la comunicación con la API.

---

## ✨ Funcionalidades Principales

* **🔐 Autenticación:**
  * Login seguro con almacenamiento de Token (JWT) en LocalStorage.
  * Protección de rutas según el estado de sesión.
* **📦 Catálogo de Productos:**
  * Visualización de productos con imágenes traídas desde Cloudinary.
  * Filtrado y búsqueda.
* **🛒 Carrito de Compras:**
  * Gestión de estado global mediante `CartContext`.
  * Añadir, eliminar y calcular totales en tiempo real.
* **📝 Gestión de Pedidos:**
  * Envío de pedidos al backend.
  * Visualización del historial de pedidos (para Encargados).
* **🛠️ Panel de Administración (Roles):**
  * Funcionalidades específicas habilitadas según si el usuario es `trabajador`, `encargado` o `comercial`.

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu máquina local:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/JorgeSanchezGallego/ProyectoFinalMaster-FRONTEND.git
    cd ProyectoFinalMaster-FRONTEND
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto (junto al `package.json`) y define la URL de tu backend:

    ```env
    VITE_BACKEND_URL=http://localhost:3000/api
    ```
    *(Asegúrate de que tu backend esté corriendo en ese puerto).*

4.  **Ejecutar el Servidor de Desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible generalmente en `http://localhost:5173`.

---

## 📂 Estructura del Proyecto

La arquitectura sigue las mejores prácticas de React, organizando el código por funcionalidad:

```text
/src
  ├── assets/       # Imágenes estáticas y logotipos
  ├── components/   # Componentes reutilizables (NavBar, Login, ProductList, etc.)
  ├── context/      # Contextos globales (CartContext)
  ├── hooks/        # Custom Hooks (useFetch para lógica de API)
  ├── pages/        # Vistas principales (Home, ProductsPage, CartPage, OrdersPage)
  ├── App.jsx       # Configuración de Rutas y Layout principal
  └── main.jsx      # Punto de entrada de la aplicación