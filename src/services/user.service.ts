import { User } from "../models/user.model";
import { users } from "../models/users.model";

export const getAllUsers = (): User[] => {
  return users;
};