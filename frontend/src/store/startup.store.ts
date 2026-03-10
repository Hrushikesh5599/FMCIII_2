import { create } from 'zustand';
import { Startup } from '../types';
import { api } from '../lib/api';

interface StartupState {
  startups: Startup[];
  selectedStartup: Startup | null;
  isLoading: boolean;
  error: string | null;
  fetchStartups: () => Promise<void>;
  fetchStartupById: (id: string) => Promise<void>;
  createStartup: (data: Partial<Startup>) => Promise<Startup>;
  updateStartup: (id: string, data: Partial<Startup>) => Promise<void>;
}

export const useStartupStore = create<StartupState>((set) => ({
  startups: [],
  selectedStartup: null,
  isLoading: false,
  error: null,

  fetchStartups: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/startups');
      set({ startups: data.data || [] });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch startups';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStartupById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get(`/startups/${id}`);
      set({ selectedStartup: data.data });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch startup';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  createStartup: async (startupData: Partial<Startup>) => {
    const { data } = await api.post('/startups', startupData);
    set((state) => ({ startups: [...state.startups, data.data] }));
    return data.data;
  },

  updateStartup: async (id: string, startupData: Partial<Startup>) => {
    const { data } = await api.put(`/startups/${id}`, startupData);
    set((state) => ({
      startups: state.startups.map((s) => (s.id === id ? data.data : s)),
    }));
  },
}));
