import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI, tasksAPI } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task, AuthResponse, TaskResponse } from '../types';

// Auth Queries
export const useSignup = () => {
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) =>
      authAPI.signup(data.name, data.email, data.password, data.confirmPassword),
    onSuccess: async (data: AuthResponse) => {
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authAPI.login(data.email, data.password),
    onSuccess: async (data: AuthResponse) => {
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
    },
  });
};

// Task Queries
export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response: TaskResponse = await tasksAPI.getTasks();
      return response.tasks || [];
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; description: string; priority: string }) =>
      tasksAPI.createTask(data.title, data.description, data.priority),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; updates: Partial<Task> }) =>
      tasksAPI.updateTask(data.id, data.updates as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tasksAPI.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
