import Image from 'next/image';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center h-screen relative">
      <Image src="background.svg" alt="Background" fill className="inset-0 object-cover -z-10" />
      <div className="w-[50%] h-[90vh] flex items-center justify-center relative">
        <Image
          src="login-layout-illustrator.svg"
          className="absolute bottom-0 right-0"
          alt="Login Background"
          width={600}
          height={380}
        />
      </div>
      <div className="w-[50%]">{children}</div>
    </div>
  );
}
