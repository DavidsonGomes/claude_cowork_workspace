interface StatusBadgeProps {
  status: string | null;
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  success: { bg: 'bg-[#00FFA7]/10', text: 'text-[#00FFA7]', label: 'Success' },
  failure: { bg: 'bg-red-500/10', text: 'text-red-500', label: 'Failure' },
  timeout: { bg: 'bg-amber-500/10', text: 'text-amber-500', label: 'Timeout' },
  retrying: { bg: 'bg-blue-500/10', text: 'text-blue-500', label: 'Retrying' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status || ''] || { bg: 'bg-gray-500/10', text: 'text-gray-400', label: status || 'Unknown' };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
