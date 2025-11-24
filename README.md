# Aplicación de Gestión - Evaluación TI3041

Proyecto de ejemplo para la evaluación: backend en Node.js (Express + Sequelize) conectado a MySQL/MariaDB, y frontend en Vue 3 (Vite).

Rasgos principales:
- Conexión a base de datos MySQL/MariaDB mediante `mysql2` y Sequelize.
- CRUD completo para `Vehicle` y `Maintenance`.
- Autenticación con sesiones (login/logout), contraseñas hasheadas con `bcrypt`.
- Frontend Vue 3 con login y CRUD de vehículos.

Instrucciones rápidas

1) Backend

```powershell
cd "c:\Users\jeral rios\Downloads\evaluación\backend\django_project"
python manage.py runserver
```

2) Frontend

```powershell
cd "c:\Users\jeral rios\Downloads\evaluación\frontend"
npm install
npm run dev
```

3) Uso

- Abrir `http://localhost:5173` (Vite dev) y registrarse/ingresar.
- El backend está en `http://127.0.0.1:8000/admin`.