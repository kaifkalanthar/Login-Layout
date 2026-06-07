import { create } from 'zustand';
import type { RegistrationData } from '../types/User';

interface RegistrationStore {
  data: RegistrationData;
  setData: (patch: Partial<RegistrationData>) => void;
  reset: () => void;
}

export const useUserRegistrationStore = create<RegistrationStore>(set => ({
  data: {},
  setData: patch => set(s => ({ data: { ...s.data, ...patch } })),
  reset: () => set({ data: {} }),
}));
