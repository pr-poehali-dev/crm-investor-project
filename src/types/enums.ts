export enum UserRole {
  ADMIN = 'ADMIN',
  INVESTOR_OWNER = 'INVESTOR_OWNER',
  INVESTOR_MANAGER = 'INVESTOR_MANAGER',
}

export enum InvestorStatus {
  NEW = 'new',
  PENDING = 'pending',
  REJECTED = 'rejected',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

export enum DocumentType {
  PASSPORT = 'passport',
  DRIVER_LICENSE = 'driver_license',
  MILITARY_ID = 'military_id',
  INTERNATIONAL_PASSPORT = 'international_passport',
  OTHER = 'other',
}

export const DocumentTypeLabels: Record<DocumentType, string> = {
  [DocumentType.PASSPORT]: 'Паспорт',
  [DocumentType.DRIVER_LICENSE]: 'Водительское удостоверение',
  [DocumentType.MILITARY_ID]: 'Военный билет',
  [DocumentType.INTERNATIONAL_PASSPORT]: 'Загранпаспорт',
  [DocumentType.OTHER]: 'Другой',
};

export const InvestorStatusLabels: Record<InvestorStatus, string> = {
  [InvestorStatus.NEW]: 'Новый',
  [InvestorStatus.PENDING]: 'На модерации',
  [InvestorStatus.REJECTED]: 'Отклонён',
  [InvestorStatus.ACTIVE]: 'Активен',
  [InvestorStatus.SUSPENDED]: 'Приостановлен',
};

export const InvitationStatusLabels: Record<InvitationStatus, string> = {
  [InvitationStatus.PENDING]: 'Ожидает',
  [InvitationStatus.ACCEPTED]: 'Принято',
  [InvitationStatus.REJECTED]: 'Отклонено',
  [InvitationStatus.EXPIRED]: 'Истекло',
  [InvitationStatus.CANCELLED]: 'Отменено',
};
