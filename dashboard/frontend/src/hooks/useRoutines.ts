import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../lib/api';
import type { RoutineOverview, RoutineDetail, RoutineRun } from '../types/routine';

export function useRoutines() {
  return useQuery<RoutineOverview[]>({
    queryKey: ['routines'],
    queryFn: () => fetchApi('/routines'),
  });
}

export function useRoutineDetail(name: string) {
  return useQuery<RoutineDetail>({
    queryKey: ['routine', name],
    queryFn: () => fetchApi(`/routines/${name}`),
    enabled: !!name,
  });
}

export function useRoutineHistory(name: string, days: number = 30) {
  return useQuery<RoutineRun[]>({
    queryKey: ['routine-history', name, days],
    queryFn: () => fetchApi(`/routines/${name}/history?days=${days}`),
    enabled: !!name,
  });
}
