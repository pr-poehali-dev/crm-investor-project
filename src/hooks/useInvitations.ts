import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invitationsApi, rolesApi } from '@/lib/invitations';
import type { CreateInvitationDto } from '@/types/api';

export const useInvitations = (investorId: number) => {
  return useQuery({
    queryKey: ['invitations', investorId],
    queryFn: async () => {
      const response = await invitationsApi.getAll(investorId);
      return response.data;
    },
    enabled: !!investorId,
  });
};

export const useCreateInvitation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ investorId, data }: { investorId: number; data: CreateInvitationDto }) =>
      invitationsApi.create(investorId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invitations', variables.investorId] });
    },
  });
};

export const useCancelInvitation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ investorId, invitationId }: { investorId: number; invitationId: number }) =>
      invitationsApi.cancel(investorId, invitationId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invitations', variables.investorId] });
    },
  });
};

export const usePublicInvitation = (token: string) => {
  return useQuery({
    queryKey: ['invitation', token],
    queryFn: async () => {
      const response = await invitationsApi.getPublic(token);
      return response.data;
    },
    enabled: !!token,
  });
};

export const useAcceptInvitation = () => {
  return useMutation({
    mutationFn: (token: string) => invitationsApi.accept(token),
  });
};

export const useRejectInvitation = () => {
  return useMutation({
    mutationFn: (token: string) => invitationsApi.reject(token),
  });
};

export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const response = await rolesApi.getAll();
      return response.data;
    },
  });
};
