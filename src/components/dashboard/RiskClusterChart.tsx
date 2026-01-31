import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface RiskCategory {
  name: string;
  value: number;
  color: string;
}

interface RiskClusterChartProps {
  data: RiskCategory[];
  className?: string;
}

const COLORS = {
  'Data Privacy': 'hsl(217, 91%, 50%)',
  'Liability Limits': 'hsl(0, 84%, 60%)',
  'Termination Clauses': 'hsl(25, 95%, 53%)',
  'Indemnification': 'hsl(38, 92%, 50%)',
  'Intellectual Property': 'hsl(174, 62%, 47%)',
  'Confidentiality': 'hsl(280, 65%, 60%)',
  'Payment Terms': 'hsl(142, 76%, 36%)',
  'Other': 'hsl(220, 10%, 50%)',
};

export function RiskClusterChart({ data, className }: RiskClusterChartProps) {
  const chartData = data.map(item => ({
    ...item,
    color: COLORS[item.name as keyof typeof COLORS] || COLORS.Other
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">{data.value}% of risks</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}