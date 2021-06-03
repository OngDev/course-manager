export interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
}

export interface TokenPayload {
  username: string;
  userId: string;
}
