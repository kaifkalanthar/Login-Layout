'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { detailsSchema, type DetailsFormValues } from '@/features/auth/schemas/RegistrationSchema';

export default function DetailsPage() {
  const router = useRouter();
  const { data, setData } = useUserRegistrationStore();

  const form = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      email: data.email ?? '',
    },
  });

  function onSubmit(values: DetailsFormValues) {
    setData(values);
    router.push('/login/password');
  }

  return (
    <div className="flex flex-col h-full gap-8">
      <StepProgress current={3} />

      <div className="flex flex-col gap-1">
        <TextStyle variant="lg-semibold" as="p" className="text-primary-text">
          Personal details
        </TextStyle>
        <TextStyle variant="sm-regular" as="p" className="text-muted-text">
          Tell us a bit about yourself
        </TextStyle>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 gap-5">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    inputMode="email"
                    autoComplete="email"
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
              onClick={() => router.push('/login/verify')}
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
  );
}
