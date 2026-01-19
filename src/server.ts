import express, { Request, Response } from 'express';
import cors from 'cors';
import { faker } from '@faker-js/faker';
import { Post, Comment, ApiResponse } from './types/index.js';
import { generateId } from './utils/idGenerator.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Генерация тестовых постов
const generatePosts = (count: number = 10): Post[] => {
  return Array.from({ length: count }, (): Post => ({
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
const generateComments = (postId: string, count: number = 3): Comment[] => {
  return Array.from({ length: count }, (): Comment => ({
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
let posts: Post[] = generatePosts();

// Эндпоинт для получения последних постов
app.get('/posts/latest', (req: Request, res: Response) => {
  // Возвращаем не более 10 последних постов
  const latestPosts = posts.slice(0, 10);
  
  const response: ApiResponse<Post[]> = {
    status: 'ok',
    data: latestPosts
  };
  
  res.json(response);
});

// Эндпоинт для получения последних комментариев к посту
app.get('/posts/:postId/comments/latest', (req: Request<{ postId: string }>, res: Response) => {
  const { postId } = req.params;
  
  // Проверяем, существует ли пост с таким ID
  const postExists = posts.some(post => post.id === postId);
  if (!postExists) {
    return res.status(404).json({
      status: 'error',
      message: 'Post not found'
    });
  }
  
  // Генерируем комментарии для указанного поста
  if (!postId) {
    return res.status(400).json({
      status: 'error',
      message: 'Post ID is required'
    });
  }
  
  const comments = generateComments(postId, 3);
  
  const response: ApiResponse<Comment[]> = {
    status: 'ok',
    data: comments
  };
  
  res.json(response);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;