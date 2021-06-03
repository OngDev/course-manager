export interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
  username: string;
}

export interface TokenPayload {
  username: string;
  userId: string;
}
