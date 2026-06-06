import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  userName: string;
  email: string;
  password: string;
  cPassword: string;
  age: number;
  phone: string;
  gender: string;
  address: string;
};

export type RegisterResponse = {
  message: string;
  user: {
    fName: string;
    lName: string;
    email: string;
    password: string;
    age: number;
    phone: string;
    isTwoFAEnabled: boolean;
    address: string;
    otp: string;
    provider: string;
    gender: string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    userName: string;
    id: string;
  };
};

export type ConfirmPayload = {
  email: string;
  otp: string;
};

export type ConfirmResponse = {
  message: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInResponse = {
  message: string;
  access_token: string;
  refresh_token: string;
  role: string;
};

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginPayload) => api.post("/auth/login", data),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterPayload) =>
      api.post<RegisterResponse>("/users/signup", data),
  });
}

export function useConfirm() {
  return useMutation({
    mutationFn: (data: ConfirmPayload) =>
      api.patch<ConfirmResponse>("/users/confirm", data),
  });
}

export function useSignIn() {
  return useMutation({
    mutationFn: (data: SignInPayload) =>
      api.post<SignInResponse>("/users/signin", data),
  });
}
