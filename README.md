# CRUD-API

Create, Read, Update, Delete

## Структура проекта
```
CRUD-API/
├─ src/
│ ├─ index.ts
│ ├─ models/
│ │ ├─ user.model.ts
│ │ └─ users.model.ts
│ └─ services/
│ └─ user.service.ts
├─ .env.example
├─ package.json
├─ tsconfig.json
└─ README.md
```

## Установка

Клонируйте репозиторий:

```
git clone https://github.com/Alena1409/CRUD-API.git
```
```
cd CRUD-API
```

Установите зависимости:

```
npm install
```

Создайте файл .env на основе .env.example:

```
cp .env.example .env
```

## Скрипты

Запуск в режиме разработки:

```
npm run start:dev
```
Cборка и запуск в продакшн режиме:
```
npm run start:prod
```
## Использование
Базовый URL: http://localhost:4000/api/users

### Получить всех пользователей
```
GET /api/users
Response 200:
[
  {
    "id": "uuid",
    "username": "Alice",
    "age": 25,
    "hobbies": ["reading", "coding"]
  }
]
```

### Получить пользователя по ID
```
GET /api/users/{userId}
Response 200: объект пользователя
Response 404: { "message": "User not found" }
```

### Создать нового пользователя
```
POST /api/users
Body (JSON):
{
  "username": "Alice",
  "age": 25,
  "hobbies": ["reading", "coding"]
}
Response 201: созданный пользователь
Response 400: { "message": "Invalid request body" }
```

### Обновить пользователя
```
PUT /api/users/{userId}
Body (JSON): { "username": "Bob" }
Response 200: обновленный пользователь
Response 404: { "message": "User not found" }
Response 400: { "message": "Invalid JSON" }
```
### Удалить пользователя
```
DELETE /api/users/{userId}
Response 204: успешно удален
Response 404: { "message": "User not found" }
```
