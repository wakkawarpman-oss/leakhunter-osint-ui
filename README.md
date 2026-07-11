<div align="center">
  
# 🕵️‍♂️ LeakHunter OSINT UI

**High-Performance Neo-Brutalist Dashboard for OSINT Investigations**

[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#)

*Швидкий, мінімалістичний та готовий до масованого аналізу витоків даних (Data Leaks) фронтенд компонент.*

</div>

---

## 📌 Огляд Проєкту

Цей репозиторій містить **високопродуктивний Frontend UI**, який розділений на потужні незалежні модулі:

*   📊 **Дашборд:** Моніторинг активних баз, лайв-сповіщення та статистика.
*   🌍 **GeoExtract:** Карта для злиття координат із розширеним таймлайном подій та фільтрацією "свіжих/старих" слідів.
*   🔄 **Конвертер & Дедуплікатор:** Інтерфейс для мапінгу та створення структурованих JSON зі сирих SQL/TXT дампів.

## 🏗 Архітектура (High-Level)

Проєкт підготовлений до переходу на повноцінний **Microservices Stack**. Нижче наведена схема архітектури (Mermaid):

```mermaid
graph TD
    UI[🖥 React/Vite UI] -->|REST / PostgREST| Auth[(🗄 Supabase Auth & Core DB)]
    UI -->|Millisecond Search| Search[⚡ Typesense Engine]
    UI -->|Task Trigger| API[🐍 Python FastAPI Worker]
    API -->|Raw Downloads| Store[☁️ Cloudflare R2]
    API -->|Background Parse| Celery[⚙️ Celery / Redis Queue]
    Celery -->|Store Cleaned Metadata| Auth
    Celery -->|Index Data| Search
```

### Додаткова документація:
- 📖 [**ARCHITECTURE.md**](./ARCHITECTURE.md) — Детальна C4 контейнерна діаграма повного стеку.
- 🚀 [**DEPLOYMENT.md**](./DEPLOYMENT.md) — Покрокова інструкція з локального налаштування Docker-середовища та розгортання в Production.

## 💻 Tech Stack (UI Foundation)

*   **Core:** React 19 + TypeScript + Vite
*   **Styling:** Neo-Brutalism Design System (Custom CSS Variables, High Contrast)
*   **Icons:** Lucide-React
*   **Performance:** Lazy loading (`React.lazy`), Chunk splitting, Component modularity.

## 🛠 Запуск в Dev-режимі

Запустіть платформу локально всього у три кроки:

```bash
# 1. Клонування репозиторію
git clone https://github.com/wakkawarpman-oss/leakhunter-osint-ui.git
cd leakhunter-osint-ui

# 2. Встановлення залежностей 
npm install

# 3. Запуск дев-сервера з HMR
npm run dev

# Для збірки під Production виконайте:
npm run build
```

---
<div align="center">
  <i>Розроблено для OSINT-аналітиків, які цінують швидкість та читабельність даних.</i>
</div>
