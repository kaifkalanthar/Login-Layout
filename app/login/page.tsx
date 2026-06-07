'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioCard } from '@/components/ui/radio-card';
import { TextStyle } from '@/components/typography';
import { StepProgress } from '@/features/auth/components/StepProgress';
import { useUserRegistrationStore } from '@/features/auth/hooks/useUserRegistrationStore';
import type { AccountType } from '@/features/auth/types/User';

const ACCOUNT_TYPES: {
  value: AccountType;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'personal',
    title: 'Personal',
    description: 'For individual use and personal accounts',
    icon: <User size={20} />,
  },
  {
    value: 'business',
    title: 'Business',
    description: 'For teams, companies and organisations',
    icon: <Building2 size={20} />,
  },
];

export default function AccountTypePage() {
  const router = useRouter();
  const { data, setData } = useUserRegistrationStore();
  const [selected, setSelected] = useState<AccountType | ''>(data.accountType ?? '');

  function handleContinue() {
    if (!selected) return;
    setData({ accountType: selected });
    router.push('/login/verify');
  }

  return (
    <div className="flex flex-col h-full gap-8">
      <StepProgress current={1} />

      <div className="flex flex-col gap-1">
        <TextStyle variant="lg-semibold" as="p" className="text-primary-text">
          Account type
        </TextStyle>
        <TextStyle variant="sm-regular" as="p" className="text-muted-text">
          Select the type of account you want to create
        </TextStyle>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {ACCOUNT_TYPES.map(type => (
          <RadioCard
            key={type.value}
            value={type.value}
            selected={selected === type.value}
            onSelect={v => setSelected(v as AccountType)}
            title={type.title}
            description={type.description}
            icon={type.icon}
          />
        ))}
      </div>

      <Button className="w-full" disabled={!selected} onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
}
