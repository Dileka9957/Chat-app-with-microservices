export interface User {
  email: string;
  password: string;
}

export interface Message {
  id: string;
  text: string;
  user: string;
}

export interface AuthResponse {
  token: string;
}
