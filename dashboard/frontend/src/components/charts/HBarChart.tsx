import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface HBarChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  color?: string;
  ariaLabel?: string;
}

export function HBarChart({ data, height = 250, color = '#00FFA7', ariaLabel }: HBarChartProps) {
  return (
    <div role="img" aria-label={ariaLabel || 'Gráfico de barras'}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <XAxis type="number" stroke="#667085" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="name" stroke="#667085" fontSize={11} tickLine={false} axisLine={false} width={120} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#182230',
              border: '1px solid #344054',
              borderRadius: 8,
              color: '#F9FAFB',
              fontSize: 12,
            }}
          />
          <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
