import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface TrendChartProps {
  data: Array<{ date: string; value: number; value2?: number }>;
  height?: number;
  label?: string;
  label2?: string;
  color?: string;
  color2?: string;
}

export function TrendChart({
  data,
  height = 300,
  label = 'Valor',
  label2,
  color = '#00FFA7',
  color2 = '#8133AA',
}: TrendChartProps) {
  return (
    <div role="img" aria-label={`Gráfico de tendência: ${label}`}>
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#667085"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#667085"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#182230',
            border: '1px solid #344054',
            borderRadius: 8,
            color: '#F9FAFB',
            fontSize: 12,
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          name={label}
        />
        {label2 && (
          <Line
            type="monotone"
            dataKey="value2"
            stroke={color2}
            strokeWidth={2}
            dot={false}
            name={label2}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
}
