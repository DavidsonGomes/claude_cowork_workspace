import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { StatusBadge } from '@/components/cards/StatusBadge';
import { useRoutines } from '@/hooks/useRoutines';

export function RoutinesPage() {
  const navigate = useNavigate();
  const { data: routines, isLoading, error, refetch, dataUpdatedAt } = useRoutines();

  const lastUpdatedMinutes = dataUpdatedAt
    ? Math.floor((Date.now() - dataUpdatedAt) / 60_000)
    : undefined;

  return (
    <PageContainer title="Rotinas" onRefresh={() => refetch()} lastUpdatedMinutes={lastUpdatedMinutes}>
      {isLoading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-[#182230] rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-red-400 text-sm font-medium">Falha ao carregar rotinas</p>
          <p className="text-red-500/60 text-xs mt-1">Verifique se o backend está rodando.</p>
          <button type="button" onClick={() => refetch()} className="text-xs text-red-400 underline mt-2">Tentar novamente</button>
        </div>
      )}

      {routines && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#344054] text-gray-400 text-xs">
                <th className="text-left py-3 px-4 font-medium">Nome</th>
                <th className="text-left py-3 px-4 font-medium">Agente</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Última Exec</th>
                <th className="text-right py-3 px-4 font-medium">Duração</th>
                <th className="text-right py-3 px-4 font-medium">Success Rate</th>
                <th className="text-right py-3 px-4 font-medium">Total Runs</th>
              </tr>
            </thead>
            <tbody>
              {routines.map((r) => (
                <tr
                  key={r.name}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver detalhes da rotina ${r.name}`}
                  onClick={() => navigate(`/routines/${encodeURIComponent(r.name)}`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/routines/${encodeURIComponent(r.name)}`)}
                  className="border-b border-[#344054]/50 hover:bg-white/5 cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00FFA7]"
                >
                  <td className="py-3 px-4 text-white font-medium">{r.name}</td>
                  <td className="py-3 px-4 text-gray-400">{r.agent || '—'}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={r.last_status} />
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-xs">
                    {r.last_run_at ? new Date(r.last_run_at).toLocaleString('pt-BR') : '—'}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-300">
                    {r.last_duration_secs ? `${r.last_duration_secs.toFixed(1)}s` : '—'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={r.success_rate >= 90 ? 'text-[#00FFA7]' : r.success_rate >= 70 ? 'text-amber-400' : 'text-red-400'}>
                      {r.success_rate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-300">{r.total_runs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}
