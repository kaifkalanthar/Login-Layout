'use client';

import { TextStyle } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { StepProgress } from '@/features/auth/components/StepProgress';
import { createSession } from '@/features/auth/actions/session';
import { useUserRegistrationStore } from '@/features/auth/hooks/useUserRegistrationStore';
import {
  passwordSchema,
  type PasswordFormValues,
} from '@/features/auth/schemas/RegistrationSchema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, CircleCheck, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const REQUIREMENTS = [
  { label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
  { label: 'One uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'One number', test: (v: string) => /[0-9]/.test(v) },
];

function PasswordRequirements({ value }: { value: string }) {
  if (!value) return null;
  return (
    <ul className="flex flex-col gap-1.5 mt-1">
      {REQUIREMENTS.map(req => {
        const met = req.test(value);
        return (
          <li
            key={req.label}
            className={cn(
              'flex items-center gap-2 text-xs',
              met ? 'text-success-text' : 'text-muted-text'
            )}
          >
            <span
              className={cn(
                'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                met
                  ? 'bg-success-solid-bg border-success-solid-bg text-inverse-fg'
                  : 'border-strong-border'
              )}
            >
              {met && <Check size={10} strokeWidth={3} />}
            </span>
            {req.label}
          </li>
        );
      })}
    </ul>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-primary-border last:border-0">
      <TextStyle variant="sm-regular" as="p" className="text-muted-text">
        {label}
      </TextStyle>
      <TextStyle variant="sm-medium" as="p" className="text-primary-text">
        {value}
      </TextStyle>
    </div>
  );
}

function maskEmail(email: string) {
  const [local, domain] = email.split('@');
  return `${local.slice(0, 2)}${'•'.repeat(4)}@${domain}`;
}

export default function PasswordPage() {
  const router = useRouter();
  const { data, setData, reset } = useUserRegistrationStore();
  const [open, setOpen] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onChange',
  });

  const passwordValue = useWatch({ control: form.control, name: 'password' });

  function onSubmit(values: PasswordFormValues) {
    setData({ password: values.password });
    setOpen(true);
  }

  async function handleDashboard() {
    await createSession({
      accountType: data.accountType,
      mobile: data.mobile,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
    reset();
    router.push('/dashboard');
  }

  const displayName = [data.firstName, data.lastName].filter(Boolean).join(' ') || '—';
  const displayEmail = data.email ? maskEmail(data.email) : '—';
  const displayMobile = data.mobile ?? '—';
  const displayType = data.accountType
    ? data.accountType.charAt(0).toUpperCase() + data.accountType.slice(1)
    : '—';

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent hideClose>
          <div className="flex flex-col items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-bg border border-success-border text-success-fg">
              <CircleCheck size={28} />
            </span>

            <DialogHeader>
              <DialogTitle>You&apos;re all set!</DialogTitle>
              <DialogDescription>
                Here&apos;s a quick summary of your account details
              </DialogDescription>
            </DialogHeader>

            <div className="w-full mt-1">
              <SummaryRow label="Account Type" value={displayType} />
              <SummaryRow label="Email" value={displayEmail} />
              <SummaryRow label="Name" value={displayName} />
              <SummaryRow label="Mobile Number" value={displayMobile} />
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-success-fg shrink-0" />
              <TextStyle variant="xs-regular" as="p" className="text-muted-text">
                Your account is secured with bank-grade security
              </TextStyle>
            </div>

            <Button className="w-full" onClick={handleDashboard}>
              Go To Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col h-full gap-8">
        <StepProgress current={4} />

        <div className="flex flex-col gap-1">
          <TextStyle variant="lg-semibold" as="p" className="text-primary-text">
            Create your password
          </TextStyle>
          <TextStyle variant="sm-regular" as="p" className="text-muted-text">
            Choose a strong password for your account
          </TextStyle>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 gap-5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <PasswordRequirements value={passwordValue ?? ''} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 mt-auto">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => router.push('/login/details')}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
