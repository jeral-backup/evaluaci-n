# Django backend (minimal)

This Django project implements the backend API using Django REST Framework and is configured to use MySQL/MariaDB via `PyMySQL`.

Setup (Windows PowerShell):

```powershell
cd "c:\Users\jeral rios\Downloads\evaluación\backend\django_project"
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
# Edit .env with your DB credentials and DJANGO_SECRET_KEY
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

API endpoints:
- `http://localhost:8000/api/vehicles/` (CRUD)
- `http://localhost:8000/api/maintenances/` (CRUD)

Notes:
- Session authentication is enabled; use the browsable API or POST to `/api/auth/login/` via the DRF login.
- If you want the backend at port 3000, run with `runserver 0.0.0.0:3000`.
