import type { RegisterDto, LoginDto, VerifyEmailDto, TokenResponseDto, UserDto, SessionDto } from '@/types/auth';

const DEMO_USER = {
  email: 'demo@halal.invest',
  password: 'demo1234',
  id: 1001,
};

const DEMO_TOKENS: TokenResponseDto = {
  accessToken: 'demo_access_token_12345',
  refreshToken: 'demo_refresh_token_67890',
};

const DEMO_SESSIONS: SessionDto[] = [
  {
    id: 1,
    userId: 1001,
    createdAt: Date.now() - 3600000,
    ip: '192.168.1.100',
    location: 'Москва, Россия',
    isCurrent: true,
  },
  {
    id: 2,
    userId: 1001,
    createdAt: Date.now() - 86400000 * 2,
    ip: '192.168.1.50',
    location: 'Казань, Россия',
    isCurrent: false,
  },
  {
    id: 3,
    userId: 1001,
    createdAt: Date.now() - 86400000 * 5,
    ip: '10.0.0.25',
    location: 'Стамбул, Турция',
    isCurrent: false,
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthApi = {
  register: async (data: RegisterDto) => {
    await delay(500);
    if (data.email === DEMO_USER.email) {
      throw { response: { data: { message: 'Email уже используется' }, status: 409 } };
    }
    return { data: {}, status: 201 };
  },

  verifyEmail: async (data: VerifyEmailDto) => {
    await delay(500);
    if (data.code === '123456' || data.code === '000000') {
      return { data: {}, status: 200 };
    }
    throw { response: { data: { message: 'Неверный код' }, status: 400 } };
  },

  resendCode: async (email: string) => {
    await delay(500);
    return { data: {}, status: 200 };
  },

  login: async (data: LoginDto) => {
    await delay(800);
    if (data.email === DEMO_USER.email && data.password === DEMO_USER.password) {
      return { data: DEMO_TOKENS, status: 200 };
    }
    throw { response: { data: { message: 'Неверный email или пароль' }, status: 401 } };
  },

  refresh: async (refreshToken: string) => {
    await delay(300);
    return { data: DEMO_TOKENS, status: 200 };
  },

  getMe: async () => {
    await delay(300);
    return { data: { id: DEMO_USER.id } as UserDto, status: 200 };
  },

  getSessions: async () => {
    await delay(500);
    return { data: DEMO_SESSIONS, status: 200 };
  },

  deleteSession: async (sessionId: number) => {
    await delay(500);
    return { data: {}, status: 204 };
  },
};
