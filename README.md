# Posts Backend API

Простой backend-сервер для генерации и предоставления данных о постах и комментариях. Используется для тестирования и демонстрации frontend-приложений.

## Технологии

- Node.js
- TypeScript
- Express
- Faker.js (для генерации тестовых данных)
- UUID (для генерации уникальных идентификаторов)

## Установка

1. Клонируйте репозиторий:
```bash
git clone <ссылка_на_репозиторий>
cd posts-backend
```

2. Установите зависимости:
```bash
npm install
```

## Запуск

### Разработка
Для запуска в режиме разработки с автоматической перезагрузкой:
```bash
npm run dev
```

Сервер будет доступен по адресу: `http://localhost:3000`

### Сборка и продакшн
Для компиляции TypeScript в JavaScript:
```bash
npm run build
```

Для запуска скомпилированного приложения:
```bash
npm start
```

## API endpoints

### GET `/posts/latest`
Возвращает последние 10 сгенерированных постов.

Пример ответа:
```json
{
  "status": "ok",
  "data": [
    {
      "id": "uuid-строка",
      "author_id": "uuid-строка",
      "title": "Заголовок поста",
      "author": "Имя автора",
      "avatar": "URL аватара",
      "image": "URL изображения",
      "created": "ISO дата создания"
    }
  ]
}
```

### GET `/posts/:postId/comments/latest`
Возвращает последние 3 комментария для указанного поста.

Параметры:
- `postId`: ID поста

Пример ответа:
```json
{
  "status": "ok",
  "data": [
    {
      "id": "uuid-строка",
      "post_id": "ID поста",
      "author_id": "uuid-строка",
      "author": "Имя автора",
      "avatar": "URL аватара",
      "content": "Текст комментария",
      "created": "ISO дата создания"
    }
  ]
}
```

## Структура проекта

```
posts-backend/
├── src/
│   ├── server.ts          # Основной файл сервера
│   ├── types/
│   │   └── index.ts       # Типы данных
│   └── utils/
│       └── idGenerator.ts # Генератор ID
├── package.json
└── tsconfig.json
```

## Автор

Maksim Muhomedyarov <madmaxim22@gmail.com>

## Лицензия

ISC