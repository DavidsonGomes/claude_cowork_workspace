import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { MetricCard } from '@/components/cards/MetricCard';
import { StatusBadge } from '@/components/cards/StatusBadge';
import { TrendChart } from '@/components/charts/TrendChart';
import { useCommunityLatest, useCommunityTrend } from '@/hooks/useCommunity';

const PERIODS = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
];

const statusMap: Record<string, string> = {
  normal: 'success',
  atencao: 'warning',
  critico: 'error',
};

const statusLabels: Record<string, string> = {
  normal: 'Comunidade saudável',
  atencao: 'Requer atenção',
  critico: 'Situação crítica',
};

const priorityColors: Record<string, string> = {
  urgente: 'bg-red-500/15 text-red-400',
  importante: 'bg-amber-500/15 text-amber-400',
  normal: 'bg-[#00FFA7]/15 text-[#00FFA7]',
};

const supportStatusColors: Record<string, string> = {
  'sem resposta': 'text-red-400 font-semibold',
  'sem resposta definitiva': 'text-red-400 font-semibold',
  'recorrente hoje': 'text-red-400 font-semibold',
  'resolvido': 'text-[#00FFA7]',
  'parcialmente respondido': 'text-amber-400',
};

function getSupportStatusClass(status: string): string {
  const lower = status.toLowerCase();
  for (const [key, cls] of Object.entries(supportStatusColors)) {
    if (lower.includes(key)) return cls;
  }
  return 'text-gray-400';
}

export function CommunityPage() {
  const [days, setDays] = useState(30);
  const { data: latest, isLoading, isError, refetch, dataUpdatedAt } = useCommunityLatest();
  const { data: trend } = useCommunityTrend(days);

  const lastUpdatedMinutes = dataUpdatedAt
    ? Math.floor((Date.now() - dataUpdatedAt) / 60_000)
    : undefined;

  const rd = latest?.report_data;

  const chartData = (trend || [])
    .filter((t) => t.sentiment_score != null)
    .map((t) => ({
      date: t.date,
      value: Math.round((t.sentiment_score ?? 0) * 100),
    }));

  const maxTopicCount = Math.max(...(latest?.top_topics || []).map((t) => t.count), 1);

  return (
    <PageContainer title="Pulso da Comunidade" onRefresh={() => refetch()} lastUpdatedMinutes={lastUpdatedMinutes}>
      {isError && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 mb-4">
          <p className="text-red-400 text-sm font-medium">Falha ao carregar dados da comunidade</p>
          <button type="button" onClick={() => refetch()} className="text-xs text-red-400 underline mt-2">Tentar novamente</button>
        </div>
      )}

      {isLoading && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-[#182230] rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      )}

      {latest && (
        <>
          {/* Header with status badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <StatusBadge status={statusMap[latest.status] || latest.status} />
              <span className="text-gray-400 text-sm">
                {statusLabels[latest.status] || 'Status desconhecido'}
              </span>
            </div>
            <span className="text-xs text-gray-500">{latest.date}</span>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <MetricCard label="Mensagens (24h)" value={latest.messages_count} />
            <MetricCard label="Membros Ativos" value={latest.active_members} />
            <MetricCard label="Novos Membros" value={latest.new_members} />
            <MetricCard
              label="Sentimento"
              value={`${rd?.sentiment_emoji || ''} ${latest.sentiment_label || '—'}`}
            />
          </div>

          {/* Two column: Suporte + Sentimento */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Suporte */}
            {rd?.support_items && rd.support_items.length > 0 && (
              <div className="rounded-lg border border-[#344054] bg-[#182230] overflow-hidden">
                <div className="px-5 py-3 border-b border-[#344054] flex items-center gap-2">
                  <span className="text-base font-semibold">🆘 Suporte</span>
                  <span className="text-xs text-gray-500 bg-[#0C111D] px-2 py-0.5 rounded-full">
                    {rd.support_items.length} tópicos
                  </span>
                </div>
                <div>
                  {rd.support_items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center px-5 py-3 border-b border-[#344054]/50 last:border-b-0 hover:bg-white/5">
                      <span className="text-sm text-gray-300 max-w-[70%]">{item.question}</span>
                      <span className={`text-xs whitespace-nowrap ${getSupportStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sentimento */}
            <div className="rounded-lg border border-[#344054] bg-[#182230] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#344054]">
                <span className="text-base font-semibold">Sentimento</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{rd?.sentiment_emoji || '—'}</span>
                  <div>
                    <div className="text-xl font-bold">{latest.sentiment_label || '—'}</div>
                    <div className="text-xs text-gray-500">
                      Baseado em {latest.messages_count} mensagens analisadas
                    </div>
                  </div>
                </div>
                {rd?.sentiment_narrative && (
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {rd.sentiment_narrative}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Top Tópicos — grid style like the original */}
          {latest.top_topics.length > 0 && (
            <div className="rounded-lg border border-[#344054] bg-[#182230] overflow-hidden mb-6">
              <div className="px-5 py-3 border-b border-[#344054]">
                <span className="text-base font-semibold">🔥 Top Tópicos do Dia</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {latest.top_topics.map((topic, i) => (
                  <div
                    key={i}
                    className="p-4 border-r border-b border-[#344054]/50 last:border-r-0 [&:nth-child(3n)]:border-r-0"
                  >
                    <div className="text-sm font-semibold mb-1">{topic.topic}</div>
                    <div className="text-xs text-gray-500 mb-2">~{topic.count} menções</div>
                    <div className="h-[3px] bg-[#344054] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#00FFA7] rounded"
                        style={{ width: `${(topic.count / maxTopicCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Membros Destaque */}
          {rd?.standout_members && rd.standout_members.length > 0 && (
            <div className="rounded-lg border border-[#344054] bg-[#182230] overflow-hidden mb-6">
              <div className="px-5 py-3 border-b border-[#344054]">
                <span className="text-base font-semibold">⭐ Membros Destaque</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-black/20">
                    <th className="text-left px-5 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Membro</th>
                    <th className="text-left px-5 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contribuição</th>
                    <th className="text-left px-5 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Canal</th>
                  </tr>
                </thead>
                <tbody>
                  {rd.standout_members.map((m, i) => (
                    <tr key={i} className="border-t border-[#344054]/50 hover:bg-white/5">
                      <td className="px-5 py-3 text-sm font-semibold">{m.name}</td>
                      <td className="px-5 py-3 text-sm text-gray-400">{m.contribution}</td>
                      <td className="px-5 py-3 text-sm text-gray-500">{m.channel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Action Items */}
          {rd?.action_items && rd.action_items.length > 0 && (
            <div className="rounded-lg border border-[#344054] bg-[#182230] overflow-hidden mb-6">
              <div className="px-5 py-3 border-b border-[#344054]">
                <span className="text-base font-semibold">✅ Ações Recomendadas</span>
              </div>
              <div>
                {rd.action_items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3 border-b border-[#344054]/50 last:border-b-0">
                    <div className="w-4 h-4 border-2 border-[#344054] rounded flex-shrink-0" />
                    <span className="text-sm text-gray-300 flex-1">{item.text}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${priorityColors[item.priority_class] || 'bg-gray-500/15 text-gray-400'}`}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Novos Membros */}
          {rd?.new_members_list && rd.new_members_list.length > 0 && (
            <div className="rounded-lg border border-[#344054] bg-[#182230] overflow-hidden mb-6">
              <div className="px-5 py-3 border-b border-[#344054]">
                <span className="text-base font-semibold">🆕 Novos Membros ({rd.new_members_list.length})</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-black/20">
                    <th className="text-left px-5 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuário</th>
                    <th className="text-left px-5 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Entrada</th>
                  </tr>
                </thead>
                <tbody>
                  {rd.new_members_list.map((m, i) => (
                    <tr key={i} className="border-t border-[#344054]/50 hover:bg-white/5">
                      <td className="px-5 py-2 text-sm">{m.name}</td>
                      <td className="px-5 py-2 text-sm text-gray-500">{m.joined_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Sentiment trend */}
      <div className="flex gap-1 mb-4">
        {PERIODS.map((p) => (
          <button
            key={p.days}
            type="button"
            onClick={() => setDays(p.days)}
            aria-label={`Filtrar últimos ${p.days} dias`}
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

      {chartData.length > 0 && (
        <div className="rounded-lg border border-[#344054] bg-[#182230] p-4 mb-6">
          <p className="text-xs text-gray-400 mb-2">Sentimento ao longo do tempo (%)</p>
          <TrendChart data={chartData} label="Sentimento %" height={250} />
        </div>
      )}
    </PageContainer>
  );
}
