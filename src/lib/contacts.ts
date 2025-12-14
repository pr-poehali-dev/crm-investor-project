import api from './api';
import type {
  ContactDto,
  CreateContactDto,
  DocumentDto,
  CreateDocumentDto,
  DocumentFileDto,
} from '@/types/api';

export const contactsApi = {
  create: (investorId: number, data: CreateContactDto) =>
    api.post<ContactDto>(`/investors/${investorId}/contacts`, data),

  getAll: (investorId: number) =>
    api.get<ContactDto[]>(`/investors/${investorId}/contacts`),

  getById: (investorId: number, id: number) =>
    api.get<ContactDto>(`/investors/${investorId}/contacts/${id}`),

  update: (investorId: number, id: number, data: Partial<CreateContactDto>) =>
    api.put<ContactDto>(`/investors/${investorId}/contacts/${id}`, data),

  delete: (investorId: number, id: number) =>
    api.delete(`/investors/${investorId}/contacts/${id}`),

  createDocument: (investorId: number, contactId: number, data: CreateDocumentDto) =>
    api.post<DocumentDto>(`/investors/${investorId}/contacts/${contactId}/documents`, data),

  getDocuments: (investorId: number, contactId: number) =>
    api.get<DocumentDto[]>(`/investors/${investorId}/contacts/${contactId}/documents`),

  getDocument: (investorId: number, contactId: number, documentId: number) =>
    api.get<DocumentDto>(`/investors/${investorId}/contacts/${contactId}/documents/${documentId}`),

  updateDocument: (investorId: number, contactId: number, documentId: number, data: Partial<CreateDocumentDto>) =>
    api.put<DocumentDto>(`/investors/${investorId}/contacts/${contactId}/documents/${documentId}`, data),

  deleteDocument: (investorId: number, contactId: number, documentId: number) =>
    api.delete(`/investors/${investorId}/contacts/${contactId}/documents/${documentId}`),

  attachFiles: (investorId: number, contactId: number, documentId: number, files: FormData) =>
    api.post(`/investors/${investorId}/contacts/${contactId}/documents/${documentId}/attach`, files, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  detachFiles: (investorId: number, contactId: number, documentId: number, keys: string[]) =>
    api.delete(`/investors/${investorId}/contacts/${contactId}/documents/${documentId}/detach`, {
      data: keys,
    }),

  getDocumentFiles: (investorId: number, contactId: number, documentId: number) =>
    api.get<DocumentFileDto[]>(`/investors/${investorId}/contacts/${contactId}/documents/${documentId}/files`),
};
