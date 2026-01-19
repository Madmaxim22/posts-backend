const express = require("express");
const cors = require("cors");
const { faker } = require("@faker-js/faker");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Генерация случайного ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Генерация тестовых постов
const generatePosts = (count = 10) => {
  return Array.from({ length: count }, () => ({
    id: generateId(),
    author_id: generateId(),
    title: faker.lorem.sentence(),
    author: faker.person.fullName(),
    avatar: faker.image.avatar(),
    image: faker.image.url(),
    created: faker.date.recent().toISOString(),
  }));
};

// Генерация тестовых комментариев
const generateComments = (postId, count = 3) => {
  return Array.from({ length: count }, () => ({
    id: generateId(),
    post_id: postId,
    author_id: generateId(),
    author: faker.person.fullName(),
    avatar: faker.image.avatar(),
    content: faker.lorem.paragraph(),
    created: faker.date.recent().toISOString(),
  }));
};

// Массив для хранения постов
let posts = generatePosts();

// Эндпоинт для получения последних постов
app.get("/posts/latest", (req, res) => {
  // Возвращаем не более 10 последних постов
  const latestPosts = posts.slice(0, 10);

  res.json({
    status: "ok",
    data: latestPosts,
  });
});

// Эндпоинт для получения последних комментариев к посту
app.get("/posts/:postId/comments/latest", (req, res) => {
  const { postId } = req.params;

  // Генерируем комментарии для указанного поста
  const comments = generateComments(postId, 3);

  res.json({
    status: "ok",
    data: comments,
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
