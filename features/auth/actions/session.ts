'use server';

import { cookies } from 'next/headers';
import type { RegistrationData } from '../types/User';

type SessionData = Omit<RegistrationData, 'otp' | 'password' | 'confirmPassword'>;

export async function createSession(data: SessionData) {
  const cookieStore = await cookies();
  cookieStore.set('auth_session', JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_session');
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get('auth_session')?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionData;
  } catch {
    return null;
  }
}
