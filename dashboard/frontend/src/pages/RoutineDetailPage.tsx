import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { StatusBadge } from '@/components/cards/StatusBadge';
import { MetricCard } from '@/components/cards/MetricCard';
import { TrendChart } from '@/components/charts/TrendChart';
import { useRoutineDetail, useRoutineHistory } from '@/hooks/useRoutines';

const PERIODS = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
  { label: '365d', days: 365 },
];

export function RoutineDetailPage() {
  const { name } = useParams<{ name: string }>();
  const [days, setDays] = useState(30);
  const { data: detail, isLoading: loadingDetail, refetch: refetchDetail, dataUpdatedAt } = useRoutineDetail(name || '');
  const { data: history, isLoading: loadingHistory, refetch: refetchHistory } = useRoutineHistory(name || '', days);

  const handleRefresh = () => {
    refetchDetail();
    refetchHistory();
  };

  if (!name) return null;

  const chartData = (history || [])
    .slice()
    .reverse()
    .filter((r) => r.duration_secs != null)
    .map((r) => ({
      date: new Date(r.started_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      value: r.duration_secs as number,
    }));

  const lastUpdatedMinutes = dataUpdatedAt
    ? Math.floor((Date.now() - dataUpdatedAt) / 60_000)
    : undefined;

  return (
    <PageContainer title={`Rotina: ${name}`} onRefresh={handleRefresh} lastUpdatedMinutes={lastUpdatedMinutes}>
      {loadingDetail && <div className="h-24 bg-[#182230] rounded-lg animate-pulse" />}

      {detail && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-gray-400">{detail.agent || '—'}</span>
            {detail.last_run && <StatusBadge status={detail.last_run.status} />}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <MetricCard label="Total Runs" value={detail.total_runs} />
            <MetricCard label="Success Rate" value={`${detail.success_rate}%`} />
            <MetricCard label="Duração Média" value={`${detail.avg_duration_secs.toFixed(1)}s`} />
            <MetricCard label="Tokens Total" value={detail.total_tokens ?? '—'} />
          </div>
        </>
      )}

      <div className="flex gap-1 mb-4">
        {PERIODS.map((p) => (
          <button
            key={p.days}
            type="button"
            onClick={() => setDays(p.days)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              days === p.days
                ? 'bg-[#00FFA7]/20 text-[#00FFA7]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loadingHistory ? (
        <div className="space-y-2">
          <div className="h-[250px] bg-[#182230] rounded-lg animate-pulse mb-6" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-[#182230] rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {chartData.length > 0 && (
            <div className="rounded-lg border border-[#344054] bg-[#182230] p-4 mb-6">
              <p className="text-xs text-gray-400 mb-2">Duração por execução</p>
              <TrendChart data={chartData} label="Duração (s)" height={250} />
            </div>
          )}

          {history && history.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#344054] text-gray-400 text-xs">
                    <th className="text-left py-2 px-3 font-medium">Data/Hora</th>
                    <th className="text-left py-2 px-3 font-medium">Status</th>
                    <th className="text-right py-2 px-3 font-medium">Duração</th>
                    <th className="text-right py-2 px-3 font-medium">RC</th>
                    <th className="text-right py-2 px-3 font-medium">Retry</th>
                    <th className="text-right py-2 px-3 font-medium">Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((r) => (
                    <tr key={r.id} className="border-b border-[#344054]/30 hover:bg-white/5">
                      <td className="py-2 px-3 text-gray-300 text-xs">
                        {new Date(r.started_at).toLocaleString('pt-BR')}
                      </td>
                      <td className="py-2 px-3"><StatusBadge status={r.status} /></td>
                      <td className="py-2 px-3 text-right text-gray-300">
                        {r.duration_secs != null ? `${r.duration_secs.toFixed(1)}s` : '—'}
                      </td>
                      <td className="py-2 px-3 text-right text-gray-400">{r.return_code}</td>
                      <td className="py-2 px-3 text-right text-gray-400">{r.retry_count}</td>
                      <td className="py-2 px-3 text-right text-gray-400">{r.token_cost ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {history && history.length === 0 && (
            <p className="text-gray-500 text-center py-8">Nenhuma execução no período selecionado</p>
          )}
        </>
      )}
    </PageContainer>
  );
}
