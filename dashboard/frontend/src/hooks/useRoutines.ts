import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../lib/api';
import type { RoutineOverview, RoutineDetail, RoutineRun } from '../types/routine';

export function useRoutines() {
  return useQuery<RoutineOverview[]>({
    queryKey: ['routines'],
    queryFn: () => fetchApi('/routines'),
    refetchInterval: 60_000,
    refetchIntervalInBackground: true,
  });
}

export function useRoutineDetail(name: string) {
  return useQuery<RoutineDetail>({
    queryKey: ['routine', name],
    queryFn: () => fetchApi(`/routines/${encodeURIComponent(name)}`),
    enabled: !!name,
    refetchInterval: 60_000,
    refetchIntervalInBackground: true,
  });
}

export function useRoutineHistory(name: string, days: number = 30) {
  return useQuery<RoutineRun[]>({
    queryKey: ['routine-history', name, days],
    queryFn: () => fetchApi(`/routines/${encodeURIComponent(name)}/history?days=${days}`),
    enabled: !!name,
    refetchInterval: 60_000,
    refetchIntervalInBackground: true,
  });
}
