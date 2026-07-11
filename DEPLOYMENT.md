# Інструкція з Імплементації та Деплою (Production Stack)

Цей гайд описує, як перетворити поточний UI-фреймворк на бойовий застосунок, розгорнувши повний бекенд-стек.

## 🛠 1. Локальне розгортання (Local Dev)

Для локальної розробки знадобляться: **Node.js 18+**, **Docker** та **Python 3.10+**.

### Крок 1.1: Підняття Інфраструктури (Docker Compose)
Створіть `docker-compose.yml` в корені:
```yaml
version: '3.8'
services:
  typesense:
    image: typesense/typesense:0.25.0
    ports:
      - "8108:8108"
    volumes:
      - ./typesense-data:/data
    command: '--data-dir /data --api-key=test-key-local --enable-cors'
```
Запустіть `docker-compose up -d`.

### Крок 1.2: Налаштування Supabase
1. Встановіть Supabase CLI: `npx supabase init`
2. Підніміть базу локально: `npx supabase start`
3. Усі ключі (`ANON_KEY`, `URL`) автоматично збережіть у `.env.local` фронтенду.

### Крок 1.3: Запуск FastAPI Worker-а
1. Створіть папку `backend` у корені проєкту.
2. `python -m venv venv && source venv/bin/activate`
3. `pip install fastapi uvicorn celery redis pandas`
4. Запустіть сервер: `uvicorn main:app --reload --port 8000`

### Крок 1.4: Запуск Frontend
```bash
npm install
npm run dev
```

---

## 🚀 2. Розгортання в Продакшені (Production Deployment)

### 2.1 Backend / Дані (Supabase Cloud + Cloudflare R2)
- Створіть проєкт на **Supabase Cloud**.
- Увімкніть розширення `PostGIS`: `CREATE EXTENSION postgis;`
- Налаштуйте **Cloudflare R2** бакет (`leakhunter-dumps`), згенеруйте S3 Credentials і додайте їх у змінні оточення FastAPI.

### 2.2 Модуль парсингу (Render / Railway / AWS ECS)
- Конвертер вимагає багато RAM. Орендуйте контейнер на Render або Railway.
- Зробіть деплой `backend` папки через `Dockerfile` (зв'язка `Gunicorn + Uvicorn`).
- Разом із ним розгорніть інстанс кешу (Redis) для черг Celery.

### 2.3 Пошуковий Рушій (Typesense Cloud / VPS)
- Реєстрація у **Typesense Cloud** (або підняття власного DigitalOcean Droplet на 16-32GB RAM).
- Отримайте `Admin API Key` (для FastAPI) і `Search-Only API Key` (для Frontend React).

### 2.4 Frontend (Cloudflare Pages / Vercel)
1. Підключіть цей GitHub-репозиторій до Cloudflare Pages або Vercel.
2. У `Build Settings` вкажіть:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output output: `dist`
3. Додайте Environment Variables (`VITE_SUPABASE_URL`, `VITE_TYPESENSE_KEY`).
4. Натисніть **Deploy**.

## 🔒 3. Безпека
- Завжди ховайте `Admin` ключі на рівні FastAPI, не світіть їх у React.
- На Supabase налаштуйте жорсткі **Row Level Security (RLS)** політики: щоб координати і таблиці з витоками могли читати тільки авторизовані аналітики (роль `authenticated`).