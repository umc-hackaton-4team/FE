export type UserRole = "USER" | "ADMIN";

export interface User {
  id: number;
  email: string;
  name: string;
  profileImage?: string;
  role?: UserRole;
}

// 로그인 응답
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  isNewUser: boolean;
  user: User;
}
