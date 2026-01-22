export interface Post {
  id: string;
  author_id: string;
  title: string;
  author: string;
  avatar: string;
  image: string;
  created: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  author: string;
  avatar: string;
  content: string;
  created: string;
}

export interface ApiResponse<T> {
  status: 'ok' | 'error';
  data?: T;
  message?: string;
}