import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../lib/api';
import type { CommunitySnapshot, CommunityTrendPoint } from '../types/community';

export function useCommunityLatest() {
  return useQuery<CommunitySnapshot | null>({
    queryKey: ['community-latest'],
    queryFn: () => fetchApi('/community/latest'),
    refetchInterval: 60_000,
    refetchIntervalInBackground: true,
  });
}

export function useCommunityTrend(days: number = 30) {
  return useQuery<CommunityTrendPoint[]>({
    queryKey: ['community-trend', days],
    queryFn: () => fetchApi(`/community/trend?days=${encodeURIComponent(days)}`),
    refetchInterval: 60_000,
    refetchIntervalInBackground: true,
  });
}
