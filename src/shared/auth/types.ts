export interface RequestAuthLogin {
  email: string;
  password: string;
}

export interface ResponseAuthLogin {
  data: {
    token: string;
  };
}

export interface User {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export type AuthPayload = User;
