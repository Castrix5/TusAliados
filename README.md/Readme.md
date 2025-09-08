# TusAliados — Frontend (MVP)

Landing page + sistema de autenticación (login/registro) desarrollado en **HTML, CSS y JavaScript puro**.  
Este repositorio contiene el **frontend** del proyecto TusAliados. El **backend** (API en Python/FastAPI o similar) debe integrarse aparte.

---

## 📂 Estructura del proyecto
tusaliados-frontend/
│
├── index.html              # Landing principal
├── auth.html               # Página de Login/Registro con pestañas
├── profesionales.html      # Listado de profesionales (demo)
├── planes.html             # Página de planes de suscripción (demo)
├── quienes-somos.html      # Información de la empresa (demo)
│
├── css/
│   └── styles.css          # Estilos globales y específicos
│
├── js/
│   ├── main.js             # Menú hamburguesa + interacciones de la landing
│   └── auth.js             # Lógica de login/registro (tabs + fetch al backend)
│
└── assets/                 # Logos, imágenes de profesionales, etc.


Autenticación (Auth)

La página auth.html incluye dos pestañas:
	•	Iniciar sesión (login)
	•	Crear cuenta (registro)

La lógica está en js/auth.js.
Por ahora valida campos en el front y envía peticiones fetch a un backend.

Endpoints esperados del backend:
	•	Registro
POST /api/v1/auth/register
{ "full_name": "Daniel", "email": "daniel@test.com", "password": "123456", "role": "CLIENT" }

	•	Login
POST /api/v1/auth/login
{ "email": "daniel@test.com", "password": "123456" }

Respuesta esperada:
{ "access": "jwt-token", "refresh": "refresh-token" }

	•	Perfil
GET /api/v1/me
Retorna datos básicos del usuario autenticado (nombre, email, rol).

Configuración importante:
	•	El frontend hace fetch con credentials: 'include' para manejar cookies httpOnly.
	•	En desarrollo puedes usar localStorage (ya implementado como fallback en auth.js).