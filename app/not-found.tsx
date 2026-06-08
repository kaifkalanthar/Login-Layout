import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { TextStyle } from '@/components/typography';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-default-bg flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm w-full">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted-bg border border-primary-border text-muted-fg">
          <FileQuestion size={32} />
        </span>

        <div className="flex flex-col gap-2">
          <TextStyle variant="2xl-bold" as="h1" className="text-primary-text">
            404
          </TextStyle>
          <TextStyle variant="lg-semibold" as="p" className="text-primary-text">
            Page not found
          </TextStyle>
          <TextStyle variant="sm-regular" as="p" className="text-muted-text">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </TextStyle>
        </div>

        <Button asChild className="w-full">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    </div>
  );
}
