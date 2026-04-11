# Campus

Campus - веб-приложение для поиска команд для студенческих проектов, хакатонов и стартапов.

Репозиторий содержит клиентскую часть приложения, отвечающую за пользовательский интерфейс, взаимодействие с backend API и отображение данных о проектах, командах и мероприятиях.

---

# Архитектура

## Технологический стек

- React
- TypeScript
- Vite

### Тестирование

- Jest
- React Testing Library
- Playwright

### Качество кода

- ESLint
- Prettier
- Stylelint
- Husky

### Документация компонентов

- Storybook

---

## Архитектурные подходы

Приложение построено на принципах масштабируемой компонентной архитектуры.

Основные принципы:

- разделение **UI и бизнес-логики**
- типизированный **API-слой**
- переиспользуемые компоненты
- изоляция логики через hooks
- подготовка к масштабированию приложения

Структура проекта ориентирована на:

- модульность
- удобство поддержки
- расширяемость

Приложение взаимодействует с backend через **REST API**.

---

# Производительность

Для обеспечения стабильной работы интерфейса применяются следующие подходы:

- оптимизация рендеринга компонентов
- lazy loading модулей
- минимизация количества запросов к API
- кэширование данных на клиенте

---

# Переменные окружения

Перед запуском проекта создайте файл `.env` в корне проекта на основе `.env.example`:

```bash
cp .env.example .env
```

| Переменная     | Описание                        | Пример                      |
| -------------- | ------------------------------- | --------------------------- |
| `VITE_API_URL` | Базовый URL backend API сервера | `http://localhost:8000/api` |

Переменные с префиксом `VITE_` доступны в клиентском коде через `import.meta.env`.

---

# Запуск проекта

## Установка зависимостей

```bash
npm install
```

## Запуск в режиме разработки

```bash
npm run dev
```

---

## Сборка проекта

```bash
npm run build
```

---

## Запуск тестов

Unit и integration тесты:

```bash
npm run test
```

E2E тесты:

```bash
npm run test:e2e
```

---

# Генерация API-клиента (Orval)

Проект использует [Orval](https://orval.dev/) для автоматической генерации типизированных React Query хуков и TypeScript-моделей из OpenAPI-спецификации backend'а.

## Как это работает

1. Orval читает OpenAPI-схему с backend'а по адресу `$VITE_API_URL/openapi.json`
2. Генерирует готовые к использованию хуки (`useQuery` / `useMutation`), типы моделей и MSW-моки
3. Сгенерированный код попадает в `src/shared/api/generated/`

## Команды

Разовая генерация:

```bash
npm run generate:api
```

Генерация в watch-режиме (перегенерирует при изменении спецификации):

```bash
npm run generate:api:watch
```

> Для работы команд backend-сервер должен быть запущен и отдавать `/openapi.json`.

## Структура сгенерированных файлов

```
src/shared/api/generated/
├── campus.ts              # Хуки и функции запросов + MSW-моки
└── model/
    ├── index.ts           # Реэкспорт всех моделей
    ├── loginSchema.ts     # Типы для запросов (body)
    ├── accessToken.ts     # Типы для ответов
    ├── userDTO.ts
    └── ...
```

## Примеры использования

### GET-запрос — получение текущего пользователя

```tsx
import { useGetUserApiV1AuthMeGet } from "@shared/api";

function UserProfile() {
    const { data: user, isLoading, error } = useGetUserApiV1AuthMeGet();

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка загрузки профиля</div>;

    return <div>{user?.email}</div>;
}
```

### POST-запрос (мутация) — логин

```tsx
import { useLoginApiV1AuthLoginPost } from "@shared/api";

function LoginForm() {
    const { mutate: login, isPending } = useLoginApiV1AuthLoginPost();

    const handleSubmit = (email: string, password: string) => {
        login(
            { data: { email, password } },
            {
                onSuccess: (data) => {
                    console.log("Токен:", data.access_token);
                },
                onError: (error) => {
                    console.error("Ошибка входа:", error);
                },
            },
        );
    };

    return <button disabled={isPending}>Войти</button>;
}
```

### POST-запрос без body — выход из системы

```tsx
import { useLogoutApiV1AuthLogoutPost } from "@shared/api";

function LogoutButton() {
    const { mutate: logout } = useLogoutApiV1AuthLogoutPost();

    return <button onClick={() => logout()}>Выйти</button>;
}
```

## Конфигурация

Настройки генерации находятся в `orval.config.ts`. Все запросы проходят через кастомный axios-инстанс `src/shared/api/axios.ts`, в котором настроены `baseURL`, `withCredentials` и перехватчики (interceptors).

> **Важно:** файлы в `src/shared/api/generated/` не нужно редактировать вручную — они перезаписываются при каждой генерации.
