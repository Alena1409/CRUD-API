import { create } from 'domain';
import { User } from '../models/user.model';
import { users } from '../models/users.model.js';
import { v4 as uuidv4 } from 'uuid';

export const getAllUsers = (): User[] => {
  return users;
};

export const createUser = (
  username: string,
  age: number,
  hobbies: string[]
): User => {
  const newUser: User = { id: uuidv4(), username, age, hobbies };
  users.push(newUser);
  return newUser;
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id)
}

export const updateUser = (id: string, data: Partial<User>): User | undefined => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return undefined;

  users[index] = { ...users[index], ...data };
  return users[index];
};
