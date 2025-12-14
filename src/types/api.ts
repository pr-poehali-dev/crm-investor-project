import type { InvestorStatus, InvitationStatus, DocumentType } from './enums';

export interface InvestorDto {
  id: number;
  name: string;
  inn?: string;
  ogrn?: string;
  kpp?: string;
  okpo?: string;
  legalAddress?: string;
  actualAddress?: string;
  contactPhone?: string;
  additionalPhone?: string;
  contactEmail?: string;
  website?: string;
  description?: string;
  status: InvestorStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvestorDto {
  name: string;
  inn?: string;
  ogrn?: string;
  kpp?: string;
  okpo?: string;
  legalAddress?: string;
  actualAddress?: string;
  contactPhone?: string;
  additionalPhone?: string;
  contactEmail?: string;
  website?: string;
  description?: string;
}

export interface InvestorSettingsDto {
  defaultInstallmentPeriods: number[];
  defaultMarkupPercent: number;
  minDealAmount: number;
  maxDealAmount: number;
  minInitialPaymentPercent: number;
  currency: string;
  contractNumberPrefix: string;
  contractAutoNumbering: boolean;
}

export interface InvestorLimitsDto {
  maxActiveOrders: number;
  maxClients: number;
  isTrial: boolean;
  trialEndsAt?: string;
}

export interface ModerationDto {
  id: number;
  investorId: number;
  status: InvestorStatus;
  comment?: string;
  moderatorComment?: string;
  createdAt: string;
  moderatorId?: number;
  moderatedAt?: string;
}

export interface ContactDto {
  id: number;
  investorId: number;
  lastName: string;
  firstName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  snils?: string;
  inn?: string;
  registrationAddress: string;
  residentialAddress?: string;
  phone?: string;
  email?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactDto {
  lastName: string;
  firstName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  snils?: string;
  inn?: string;
  registrationAddress: string;
  residentialAddress?: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface DocumentDto {
  id: number;
  contactId: number;
  type: DocumentType;
  series: string;
  number: string;
  issuedBy: string;
  issueDate?: string;
  expiryDate?: string;
  departmentCode?: string;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDocumentDto {
  type: DocumentType;
  series: string;
  number: string;
  issuedBy: string;
  issueDate?: string;
  expiryDate?: string;
  departmentCode?: string;
  isMain?: boolean;
}

export interface DocumentFileDto {
  key: string;
  url: string;
  filename: string;
  contentType: string;
  size: number;
}

export interface InvitationDto {
  id: number;
  investorId: number;
  email: string;
  roleId: number;
  roleName: string;
  status: InvitationStatus;
  token: string;
  expiresAt: string;
  createdAt: string;
  invitedBy: number;
  invitedByName: string;
}

export interface CreateInvitationDto {
  email: string;
  roleId: number;
}

export interface PublicInvitationDto {
  investorName: string;
  email: string;
  roleName: string;
  invitedByName: string;
  expiresAt: string;
}

export interface RoleDto {
  id: number;
  name: string;
  description?: string;
}
