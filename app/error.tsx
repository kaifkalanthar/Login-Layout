'use client';

import { useEffect } from 'react';
import { TriangleAlert } from 'lucide-react';
import { TextStyle } from '@/components/typography';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-default-bg flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm w-full">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-error-bg border border-error-border text-error-fg">
          <TriangleAlert size={32} />
        </span>

        <div className="flex flex-col gap-2">
          <TextStyle variant="lg-semibold" as="p" className="text-primary-text">
            Something went wrong
          </TextStyle>
          <TextStyle variant="sm-regular" as="p" className="text-muted-text">
            An unexpected error occurred. You can try again or come back later.
          </TextStyle>
          {error.digest && (
            <TextStyle variant="xs-regular" as="p" className="text-muted-text font-mono">
              Error ID: {error.digest}
            </TextStyle>
          )}
        </div>

        <div className="flex gap-3 w-full">
          <Button variant="secondary" className="flex-1" onClick={() => (window.location.href = '/login')}>
            Go to Login
          </Button>
          <Button className="flex-1" onClick={unstable_retry}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
