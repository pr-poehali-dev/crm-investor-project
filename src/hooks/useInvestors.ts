import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { investorsApi } from '@/lib/investors';
import type { InvestorStatus } from '@/types/enums';
import type { CreateInvestorDto, InvestorSettingsDto, InvestorLimitsDto } from '@/types/api';

export const useInvestors = (status?: InvestorStatus) => {
  return useQuery({
    queryKey: ['investors', status],
    queryFn: async () => {
      const response = await investorsApi.getAll(status);
      return response.data;
    },
  });
};

export const useInvestor = (id: number) => {
  return useQuery({
    queryKey: ['investor', id],
    queryFn: async () => {
      const response = await investorsApi.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateInvestor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateInvestorDto) => investorsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investors'] });
    },
  });
};

export const useSubmitInvestor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, comment }: { id: number; comment?: string }) =>
      investorsApi.submit(id, comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['investor', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['investors'] });
    },
  });
};

export const useApproveInvestor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, comment }: { id: number; comment?: string }) =>
      investorsApi.approve(id, comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['investor', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['investors'] });
    },
  });
};

export const useRejectInvestor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, comment }: { id: number; comment: string }) =>
      investorsApi.reject(id, comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['investor', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['investors'] });
    },
  });
};

export const useInvestorSettings = (id: number) => {
  return useQuery({
    queryKey: ['investor', id, 'settings'],
    queryFn: async () => {
      const response = await investorsApi.getSettings(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useUpdateInvestorSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: InvestorSettingsDto }) =>
      investorsApi.updateSettings(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['investor', variables.id, 'settings'] });
    },
  });
};

export const useInvestorLimits = (id: number) => {
  return useQuery({
    queryKey: ['investor', id, 'limits'],
    queryFn: async () => {
      const response = await investorsApi.getLimits(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useUpdateInvestorLimits = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: InvestorLimitsDto }) =>
      investorsApi.updateLimits(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['investor', variables.id, 'limits'] });
    },
  });
};

export const useInvestorModeration = (id: number) => {
  return useQuery({
    queryKey: ['investor', id, 'moderation'],
    queryFn: async () => {
      const response = await investorsApi.getModeration(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useInvestorModerationHistory = (id: number) => {
  return useQuery({
    queryKey: ['investor', id, 'moderation-history'],
    queryFn: async () => {
      const response = await investorsApi.getModerationHistory(id);
      return response.data;
    },
    enabled: !!id,
  });
};
