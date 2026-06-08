import Image from 'next/image';
import { TextStyle } from '@/components/typography';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen relative">
      <Image src="/background.svg" alt="Background" fill className="inset-0 object-cover -z-10" />
      <div className="p-12 max-w-354 mx-auto flex items-center justify-center h-screen relative">
        <div className="w-[50%] h-[90vh] relative">
          <header className="flex flex-col gap-2 mb-8">
            <TextStyle variant="sm-regular">Let&apos;s get started</TextStyle>
            <TextStyle variant="2xl-bold">Create your account</TextStyle>
            <TextStyle variant="md-regular" subdued>
              Follow the steps to create your account
            </TextStyle>
          </header>
          <Image
            src="/login-layout-illustrator.svg"
            className="absolute bottom-0 left-0"
            alt="Login Background"
            width={600}
            height={380}
          />
        </div>
        <div className="w-[50%] h-[90vh] bg-white rounded-2xl p-8 shadow-[-16px_4px_35px_rgba(0,0,0,0.03)]">
          {children}
        </div>
      </div>
    </div>
  );
}
