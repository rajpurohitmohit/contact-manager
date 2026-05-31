import client from "./client";
import { User } from "@/types";

export const authApi = {
  register: (username: string, email: string, password: string) =>
    client.post<{ _id: string; email: string }>("/api/users/register", {
      username,
      email,
      password,
    }),

  login: (email: string, password: string) =>
    client.post<{ accessToken: string }>("/api/users/login", {
      email,
      password,
    }),

  current: () => client.get<User>("/api/users/current"),
};
