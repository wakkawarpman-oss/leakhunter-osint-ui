# Архітектура LeakHunter OSINT (C4 Model)

Цей документ описує високорівневу архітектуру повноцінної платформи з використанням сучасного AI/OSINT стеку: **React + Supabase + FastAPI + Typesense**.

## Контейнерна Діаграма (С4)

```mermaid
C4Container
title С4 Контейнерна Діаграма: LeakHunter OSINT Platform

Person(operator, "OSINT Аналітик", "Користувач платформи для розслідувань")

System_Boundary(leakhunter, "LeakHunter OSINT") {
    Container(spa, "Web Application", "React, Vite, TS", "Нео-брутальний дашборд. Дає доступ до пошуку, карти та конвертера зливів.")
    
    Container(supabase, "Core Backend & Auth", "Supabase (PostgreSQL + PostGIS)", "Авторизація, зберігання юзерів, гео-точок, файлових метаданих, RLS політики.")
    
    Container(typesense, "Search Engine", "Typesense (C++)", "Надшвидкий RAM-based повнотекстовий пошук по мільярдах витягнутих записів (email, hash, телефон).")
    
    Container(data_pipeline, "Converter & Parser API", "Python, FastAPI", "Мікросервіс обробки 'важких' файлів (SQL, TXT). Розбиває, нормалізує, дедуплікує.")
    
    Container(queue, "Task Queue", "Redis / Celery", "Асинхронна черга парсингу та масових фонових задач.")
}

System_Ext(r2, "Cloudflare R2", "S3-сумісне хмарне сховище для сирих дамбів.")

Rel_Down(operator, spa, "Використовує", "HTTPS")
Rel_Right(spa, supabase, "Отримує UI дані, користувачів", "REST / Realtime (PostgREST)")
Rel_Down(spa, typesense, "Миттєвий масовий пошук", "REST")
Rel_Down(spa, data_pipeline, "Управляє парсингом та конвертацією", "REST/JSON")

Rel_Right(data_pipeline, r2, "Завантажує та витягує сирі дампи", "S3 API")
Rel_Down(data_pipeline, queue, "Відправляє фонові задачі парсингу", "Redis Protocol")
Rel_Up(queue, data_pipeline, "Обробляє Worker-ами", "Redis Protocol")
Rel_Up(data_pipeline, supabase, "Записує оброблені метадані (PostGIS)", "PostgreSQL")
Rel_Up(data_pipeline, typesense, "Індексює нормалізовані записи в пошук", "REST")
```

## Компоненти Системи

1. **Frontend (React + Vite)**: Базується на нео-бруталістичному UI. Відповідає за швидкий рендеринг, мапу через Leaflet/Mapbox та управління станом. 
2. **Core DB (Supabase)**: Зберігає конфіг, сесії користувачів через JWT та гео-просторові дані завдяки `PostGIS`.
3. **Data Pipeline (FastAPI)**: Цей шар потрібен для того, аби не "вішати" браузер чи Node.js. Скрипти на Python через `pandas/polars` "перетравлюють" гігабайтні SQL дампи, витягують хеші та мейли, і пакують їх у Typesense.
4. **Fast Search (Typesense)**: Оптимізована під оперативну пам'ять пошукова система, яка зможе видавати підказки (typo tolerance) при пошуку по мільярдах рядків витоків менш ніж за 50 мс.