export interface RegisterDto {
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface VerifyEmailDto {
  email: string;
  code: string;
}

export interface TokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface UserDto {
  id: number;
}

export interface SessionDto {
  id: number;
  userId: number;
  createdAt: number;
  ip: string;
  location: string | null;
  isCurrent: boolean;
}
