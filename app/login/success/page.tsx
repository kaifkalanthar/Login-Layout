'use client';

import { useRouter } from 'next/navigation';
import { ShieldCheck, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TextStyle } from '@/components/typography';
import { StepProgress } from '@/features/auth/components/StepProgress';
import { useUserRegistrationStore } from '@/features/auth/hooks/useUserRegistrationStore';
import { cn } from '@/lib/utils';

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

export default function SuccessPage() {
  const router = useRouter();
  const { data, reset } = useUserRegistrationStore();

  const displayName = [data.firstName, data.lastName].filter(Boolean).join(' ') || '—';
  const displayEmail = data.email ? maskEmail(data.email) : '—';
  const displayMobile = data.mobile ?? '—';
  const displayType = data.accountType
    ? data.accountType.charAt(0).toUpperCase() + data.accountType.slice(1)
    : '—';

  function handleDashboard() {
    reset();
    router.push('/dashboard');
  }

  return (
    <div className="flex flex-col h-full gap-8">
      <StepProgress current={6} />

      {/* Success card */}
      <div className="flex flex-col flex-1 items-center justify-center gap-8">
        <div className={cn(
          'flex flex-col items-center gap-3 w-full rounded-2xl border border-primary-border p-8',
          'bg-default-bg shadow-sm',
        )}>
          {/* Icon */}
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-bg border border-success-border text-success-fg">
            <CircleCheck size={28} />
          </span>

          <div className="flex flex-col items-center gap-1 text-center">
            <TextStyle variant="lg-semibold" as="p" className="text-primary-text">
              You&apos;re all set!
            </TextStyle>
            <TextStyle variant="sm-regular" as="p" className="text-muted-text">
              Here&apos;s a quick summary of your account details
            </TextStyle>
          </div>

          {/* Summary rows */}
          <div className="w-full mt-2">
            <SummaryRow label="Account Type" value={displayType} />
            <SummaryRow label="Email" value={displayEmail} />
            <SummaryRow label="Name" value={displayName} />
            <SummaryRow label="Mobile Number" value={displayMobile} />
          </div>

          {/* Security note */}
          <div className="flex items-center gap-2 mt-1">
            <ShieldCheck size={14} className="text-success-fg shrink-0" />
            <TextStyle variant="xs-regular" as="p" className="text-muted-text">
              Your account is secured with bank-grade security
            </TextStyle>
          </div>

          <Button className="w-full mt-2" onClick={handleDashboard}>
            Go To Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
