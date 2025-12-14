import api from './api';
import type {
  InvitationDto,
  CreateInvitationDto,
  PublicInvitationDto,
  RoleDto,
} from '@/types/api';

export const invitationsApi = {
  create: (investorId: number, data: CreateInvitationDto) =>
    api.post<InvitationDto>(`/investors/${investorId}/invitations`, data),

  getAll: (investorId: number) =>
    api.get<InvitationDto[]>(`/investors/${investorId}/invitations`),

  cancel: (investorId: number, invitationId: number) =>
    api.delete(`/investors/${investorId}/invitations/${invitationId}`),

  getPublic: (token: string) =>
    api.get<PublicInvitationDto>(`/invitations/${token}`),

  accept: (token: string) =>
    api.post(`/invitations/${token}/accept`),

  reject: (token: string) =>
    api.post(`/invitations/${token}/reject`),
};

export const rolesApi = {
  getAll: () =>
    api.get<RoleDto[]>('/roles'),

  getById: (id: number) =>
    api.get<RoleDto>(`/roles/${id}`),
};
