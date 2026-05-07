export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface TaskResponse {
  success: boolean;
  message?: string;
  tasks?: Task[];
  task?: Task;
}

export interface RootStackParamList {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
}
