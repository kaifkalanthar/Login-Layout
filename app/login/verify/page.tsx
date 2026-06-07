'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OtpInput } from '@/components/ui/otp-input';
import { TextStyle } from '@/components/typography';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { StepProgress } from '@/features/auth/components/StepProgress';
import { useUserRegistrationStore } from '@/features/auth/hooks/useUserRegistrationStore';
import { mobileSchema, type MobileFormValues } from '@/features/auth/schemas/RegistrationSchema';

type Phase = 'mobile' | 'otp';

export default function VerifyPage() {
  const router = useRouter();
  const { data, setData } = useUserRegistrationStore();

  const [phase, setPhase] = useState<Phase>('mobile');
  const [mobile, setMobile] = useState(data.mobile ?? '');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resendCount, setResendCount] = useState(0);

  const form = useForm<MobileFormValues>({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile: data.mobile ?? '' },
  });

  function onSendOtp(values: MobileFormValues) {
    setMobile(values.mobile);
    setData({ mobile: values.mobile });
    setOtp('');
    setOtpError('');
    setPhase('otp');
  }

  function handleOtpChange(value: string) {
    setOtp(value);
    if (otpError) setOtpError('');
  }

  function handleVerify() {
    if (otp.length < 6) {
      setOtpError('Enter all 6 digits');
      return;
    }
    setData({ otp });
    router.push('/login/details');
  }

  function handleResend() {
    setOtp('');
    setOtpError('');
    setResendCount(c => c + 1);
  }

  function handleBack() {
    if (phase === 'otp') {
      setPhase('mobile');
      setOtp('');
      setOtpError('');
    } else {
      router.push('/login');
    }
  }

  return (
    <div className="flex flex-col h-full gap-8">
      <StepProgress current={2} />

      {phase === 'mobile' ? (
        <>
          <div className="flex flex-col gap-1">
            <TextStyle variant="lg-semibold" as="p" className="text-primary-text">
              Verify your mobile
            </TextStyle>
            <TextStyle variant="sm-regular" as="p" className="text-muted-text">
              We&apos;ll send a one-time code to confirm your number
            </TextStyle>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSendOtp)} className="flex flex-col flex-1 gap-6">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-fg">
                          <Phone size={16} />
                        </span>
                        <Input
                          placeholder="e.g. 9711677290"
                          inputMode="numeric"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 mt-auto">
                <Button type="button" variant="secondary" className="flex-1" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Send OTP
                </Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <TextStyle variant="lg-semibold" as="p" className="text-primary-text">
              Enter verification code
            </TextStyle>
            <TextStyle variant="sm-regular" as="p" className="text-muted-text">
              Code sent to <span className="font-medium text-secondary-text">{mobile}</span>
            </TextStyle>
          </div>

          <div className="flex flex-col flex-1 gap-6">
            <div className="flex flex-col gap-2">
              <OtpInput value={otp} onChange={handleOtpChange} error={!!otpError} />
              {otpError && (
                <TextStyle variant="xs-regular" as="p" className="text-error-text">
                  {otpError}
                </TextStyle>
              )}
            </div>

            <button
              type="button"
              onClick={handleResend}
              className="self-start text-sm font-medium text-brand-text hover:opacity-80 transition-opacity"
            >
              Resend code{resendCount > 0 ? ` (${resendCount})` : ''}
            </button>

            <div className="flex gap-3 mt-auto">
              <Button type="button" variant="secondary" className="flex-1" onClick={handleBack}>
                Back
              </Button>
              <Button
                type="button"
                className="flex-1"
                disabled={otp.length < 6}
                onClick={handleVerify}
              >
                Continue
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
