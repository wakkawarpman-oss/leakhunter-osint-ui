# LeakHunter OSINT UI (Neo-Brutalism) 🕵️‍♂️

Neo-Brutalist Dashboard для OSINT аналітики. Фокус проекту: мінімалізм, високий контраст (accessibility), миттєве завантаження, компонентна архітектура для масованого аналізу витоків даних (Leaks).

![Архітектура та Зв'язки коду (Graphify)](graphify-out/graph.svg)

## 📌 Огляд Проєкту
Цей репозиторій містить **високопродуктивний Frontend UI**, який розділений на такі модулі:
- **Дашборд:** Лайв-сповіщення та статистика.
- **GeoExtract:** Карта зі злиття координат із розширеним таймлайном подій.
- **Конвертер:** UX для мапінгу та очищення парсованих дампів.

## 🏗 Архітектура та Деплоймент
Ми підготували цей проєкт до повноцінного переходу на бойовий **Microservices Stack**.
Ознайомтеся з деталями:
- 📖 [ARCHITECTURE.md](ARCHITECTURE.md) — Детальна C4 контейнерна діаграма повного стеку (React + Supabase + FastAPI + Typesense).
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) — Покрокова інструкція з локального налаштування Docker-середовища та розгортання в Production (Cloud Options).

## 💻 Tech Stack (UI Foundation)
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Neo-Brutalism (Custom CSS Variables)
- **Icons:** Lucide-React
- **Architecture Readiness:** Lazy loading, Chunk splitting, Component modularity.

## 🛠 Запуск в Dev-режимі

```bash
# Встановлення залежностей (рекомендовано pnpm, але сумісно і з npm)
npm install

# Запуск дев-сервера з HMR
npm run dev

# Збірка під Production
npm run build
```