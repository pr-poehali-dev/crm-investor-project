import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactsApi } from '@/lib/contacts';
import type { CreateContactDto, CreateDocumentDto } from '@/types/api';

export const useContacts = (investorId: number) => {
  return useQuery({
    queryKey: ['contacts', investorId],
    queryFn: async () => {
      const response = await contactsApi.getAll(investorId);
      return response.data;
    },
    enabled: !!investorId,
  });
};

export const useContact = (investorId: number, contactId: number) => {
  return useQuery({
    queryKey: ['contact', investorId, contactId],
    queryFn: async () => {
      const response = await contactsApi.getById(investorId, contactId);
      return response.data;
    },
    enabled: !!investorId && !!contactId,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ investorId, data }: { investorId: number; data: CreateContactDto }) =>
      contactsApi.create(investorId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contacts', variables.investorId] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ investorId, contactId, data }: { investorId: number; contactId: number; data: Partial<CreateContactDto> }) =>
      contactsApi.update(investorId, contactId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contact', variables.investorId, variables.contactId] });
      queryClient.invalidateQueries({ queryKey: ['contacts', variables.investorId] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ investorId, contactId }: { investorId: number; contactId: number }) =>
      contactsApi.delete(investorId, contactId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contacts', variables.investorId] });
    },
  });
};

export const useContactDocuments = (investorId: number, contactId: number) => {
  return useQuery({
    queryKey: ['documents', investorId, contactId],
    queryFn: async () => {
      const response = await contactsApi.getDocuments(investorId, contactId);
      return response.data;
    },
    enabled: !!investorId && !!contactId,
  });
};

export const useCreateDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ investorId, contactId, data }: { investorId: number; contactId: number; data: CreateDocumentDto }) =>
      contactsApi.createDocument(investorId, contactId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['documents', variables.investorId, variables.contactId] });
    },
  });
};

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ investorId, contactId, documentId, data }: { 
      investorId: number; 
      contactId: number; 
      documentId: number; 
      data: Partial<CreateDocumentDto> 
    }) =>
      contactsApi.updateDocument(investorId, contactId, documentId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['documents', variables.investorId, variables.contactId] });
    },
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ investorId, contactId, documentId }: { investorId: number; contactId: number; documentId: number }) =>
      contactsApi.deleteDocument(investorId, contactId, documentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['documents', variables.investorId, variables.contactId] });
    },
  });
};

export const useAttachFiles = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ investorId, contactId, documentId, files }: { 
      investorId: number; 
      contactId: number; 
      documentId: number; 
      files: FormData 
    }) =>
      contactsApi.attachFiles(investorId, contactId, documentId, files),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['documents', variables.investorId, variables.contactId] });
      queryClient.invalidateQueries({ queryKey: ['document-files', variables.investorId, variables.contactId, variables.documentId] });
    },
  });
};

export const useDocumentFiles = (investorId: number, contactId: number, documentId: number) => {
  return useQuery({
    queryKey: ['document-files', investorId, contactId, documentId],
    queryFn: async () => {
      const response = await contactsApi.getDocumentFiles(investorId, contactId, documentId);
      return response.data;
    },
    enabled: !!investorId && !!contactId && !!documentId,
  });
};
