import { z } from 'zod';

export const mobileSchema = z.object({
  mobile: z
    .string()
    .min(1, 'Mobile number is required')
    .regex(/^\d{10,15}$/, 'Enter a valid mobile number'),
});

export const otpSchema = z.object({
  otp: z.string().length(6, 'Enter all 6 digits'),
});

export const detailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'At least 8 characters')
      .regex(/[A-Z]/, 'Include at least one uppercase letter')
      .regex(/[0-9]/, 'Include at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type MobileFormValues = z.infer<typeof mobileSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type DetailsFormValues = z.infer<typeof detailsSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;
