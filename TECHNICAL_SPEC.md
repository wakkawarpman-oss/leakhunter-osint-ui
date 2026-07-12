# 📘 Повна Технічна Специфікація (Technical Spec)
**LeakHunter OSINT Platform**

Цей документ є глибоким інженерним розрізом платформи. Тут описані всі залежності мікросервісів, потоки даних (Data Flows) та потенційні вузькі місця (Bottlenecks) високопродуктивної архітектури.

---

## 1. Матриця Залежностей та Зв'язків Системи

Рівні системи сильно ізольовані, щоб уникнути каскадних збоїв.

| Компонент / Сервіс | Залежить від (Upstream) | Постачає дані для (Downstream) | Тип зв'язку |
| :--- | :--- | :--- | :--- |
| **React UI (Vite)** | Supabase (Auth), Typesense (Search) | OSINT Аналітика | HTTP/REST, WebSocket |
| **FastAPI Gateway**| React UI (Uploads) | Cloudflare R2, Redis Queue | REST, S3 API, TCP |
| **Celery Workers** | Redis (Tasks), Cloudflare R2 (Files)| Supabase (Write), Typesense | TCP, PostgreSQL Protocol |
| **Cloudflare R2**  | FastAPI (Upload) | Celery Worker (Stream read) | S3 HTTPS |
| **Supabase (DB)**  | React UI (Read), Celery (Write) | React UI, FastAPI | PostgREST / TCP (5432) |
| **Typesense**      | Celery (Bulk Write) | React UI (Instant Search)| REST (Port 8108) |

---

## 2. Аналіз Вузьких Місць (Bottlenecks) та Мітигація

Робота з сирими дампами даних (Data Leaks) об'ємом у сотні гігабайтів створює екстремальні навантаження на інфраструктуру. 

### 🔴 Bottleneck 1: OOM (Out of Memory) на рівні веб-сервера API
*   **Опис ризику:** Якщо клієнт вантажитиме 15GB файл дампу через `POST /upload` на FastAPI, сервер намагатиметься зчитати його у RAM або тимчасовий буфер, що призведе до швидкого падіння вузла (OOM Killed).
*   **Рішення (Мітигація):** 
    1. Використовувати **Pre-signed URLs** (Клієнт звертається до FastAPI, отримує S3 Token і завантажує файл *безпосередньо* у Cloudflare R2, минаючи бекенд).
    2. FastAPI лише отримує webhook "файл успішно завантажено" і ставить задачу в Redis.

### 🔴 Bottleneck 2: Замороження DOM від масиву точок на карті (GeoExtract)
*   **Опис ризику:** Рендеринг 50,000 HTML/SVG маркерів на веб-карті (Leaflet/Mapbox) призведе до повного зависання вкладки у браузері.
*   **Рішення (Мітигація):**
    1. Перехід з DOM-маркерів на **WebGL / Deck.gl** або використання `Supercluster API` (агрегація точок у "бульбашки" з цифрами при віддаленні камери).

### 🔴 Bottleneck 3: Переповнення RAM у пошуковому рушії (Typesense)
*   **Опис ризику:** Typesense зберігає індекси (in-memory) для досягнення <50ms ping. Мільярд записів може вимагати від 64GB до 128GB дорогої оперативної пам'яті.
*   **Рішення (Мітигація):**
    1. **TTL Policies:** Зберігати в Typesense лише свіжі витоки (останні 6 місяців), а архівацію переносити в "холодну" БД.
    2. **Альтернатива:** Якщо бюджет не дозволяє 128GB RAM інстанси, перенесення пошукового рушія на **ClickHouse** (який швидко читає стовпцеві індекси з NVMe-диска замість RAM).

### 🔴 Bottleneck 4: Вичерпання Pool Connections у PostgreSQL
*   **Опис ризику:** Під час масового парсингу Celery запускає сотні паралельних воркерів. Кожен воркер відкриє своє TCP-з'єднання з Supabase. За замовчуванням Postgres відхиляє запити після 100 з'єднань.
*   **Рішення (Мітигація):**
    1. Обов'язкове використання пулеру з'єднань: **Supavisor** або **PgBouncer**, які мультиплексують тисячі запитів-транзакцій в один потік до бази.

---

## 3. Внутрішня Графова Топологія (Frontend)

Згідно з інструментом Graphify, UI розділено на строгі ізольовані спільноти (Isolations).

*   `GeoMapArea.tsx` ізольована від `MainContent.tsx`. 
*   **Cross-Domain Imports:** `MainContent` (UI) імпортує `formatNumber` із `mockData.ts` (Data Layer). На етапі впровадження бекенду `mockData` буде повністю видалено і замінено на API-клієнт (`@supabase/supabase-js`), що забезпечить безшовність переходу.

> **Статус Готовності:** Проєкт технічно пройшов аудит архітектури і готовий до TDD (Test Driven Development) імплементації бекенду.
