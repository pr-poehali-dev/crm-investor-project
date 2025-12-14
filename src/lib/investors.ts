import api from './api';
import type {
  InvestorDto,
  CreateInvestorDto,
  InvestorSettingsDto,
  InvestorLimitsDto,
  ModerationDto,
} from '@/types/api';
import type { InvestorStatus } from '@/types/enums';

export const investorsApi = {
  create: (data: CreateInvestorDto) =>
    api.post<InvestorDto>('/investors', data),

  getAll: (status?: InvestorStatus) =>
    api.get<InvestorDto[]>('/investors', { params: { status } }),

  getById: (id: number) =>
    api.get<InvestorDto>(`/investors/${id}`),

  submit: (id: number, comment?: string) =>
    api.post(`/investors/${id}/submit`, { comment }),

  approve: (id: number, moderatorComment?: string) =>
    api.put(`/investors/${id}/approve`, { moderatorComment }),

  reject: (id: number, moderatorComment: string) =>
    api.put(`/investors/${id}/reject`, { moderatorComment }),

  getModeration: (id: number) =>
    api.get<ModerationDto>(`/investors/${id}/moderation`),

  getModerationHistory: (id: number) =>
    api.get<ModerationDto[]>(`/investors/${id}/moderation-history`),

  getSettings: (id: number) =>
    api.get<InvestorSettingsDto>(`/investors/${id}/settings`),

  updateSettings: (id: number, data: InvestorSettingsDto) =>
    api.put<InvestorSettingsDto>(`/investors/${id}/settings`, data),

  getLimits: (id: number) =>
    api.get<InvestorLimitsDto>(`/investors/${id}/limits`),

  updateLimits: (id: number, data: InvestorLimitsDto) =>
    api.put<InvestorLimitsDto>(`/investors/${id}/limits`, data),
};
