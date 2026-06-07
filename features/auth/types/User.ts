export type AccountType = 'personal' | 'business';

export interface RegistrationData {
  accountType?: AccountType;
  mobile?: string;
  otp?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
