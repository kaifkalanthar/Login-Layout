import { redirect } from 'next/navigation';
import { LogOut, User, Mail, Phone, Briefcase, ShieldCheck } from 'lucide-react';
import { deleteSession, getSession } from '@/features/auth/actions/session';
import { TextStyle } from '@/components/typography';
import { Button } from '@/components/ui/button';

async function logout() {
  'use server';
  await deleteSession();
  redirect('/login');
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-primary-border last:border-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary-bg text-brand-primary-fg">
        <Icon size={18} />
      </span>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <TextStyle variant="xs-regular" as="p" className="text-muted-text">
          {label}
        </TextStyle>
        <TextStyle variant="sm-medium" as="p" className="text-primary-text truncate">
          {value}
        </TextStyle>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect('/login');

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || '—';
  const displayType = user.accountType
    ? user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)
    : '—';

  return (
    <div className="min-h-screen bg-default-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-1">
            <TextStyle variant="lg-semibold" as="h1" className="text-primary-text">
              Welcome back, {user.firstName ?? 'there'}!
            </TextStyle>
            <TextStyle variant="sm-regular" as="p" className="text-muted-text">
              Here are your account details
            </TextStyle>
          </div>

          <form action={logout}>
            <Button type="submit" variant="secondary" className="gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </form>
        </div>

        {/* Details card */}
        <div className="rounded-2xl border border-primary-border bg-white p-6 shadow-sm">
          <InfoRow icon={User} label="Full Name" value={displayName} />
          <InfoRow icon={Mail} label="Email Address" value={user.email ?? '—'} />
          <InfoRow icon={Phone} label="Mobile Number" value={user.mobile ?? '—'} />
          <InfoRow icon={Briefcase} label="Account Type" value={displayType} />
        </div>

        {/* Security note */}
        <div className="flex items-center gap-2 mt-4 justify-center">
          <ShieldCheck size={14} className="text-success-fg shrink-0" />
          <TextStyle variant="xs-regular" as="p" className="text-muted-text">
            Your account is secured with bank-grade security
          </TextStyle>
        </div>
      </div>
    </div>
  );
}
