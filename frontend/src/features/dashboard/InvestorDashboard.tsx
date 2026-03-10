import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Funding, Startup } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { StatCard } from '../../components/shared/StatCard';
import { DollarSign, Building2, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed'];

export default function InvestorDashboard() {
  const [funding, setFunding] = useState<Funding[]>([]);
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    Promise.all([
      api.get('/funding').then(r => setFunding(r.data.data || [])),
      api.get('/startups').then(r => setStartups(r.data.data || [])),
    ]).catch(console.error);
  }, []);

  const totalFunding = funding.reduce((sum, f) => sum + f.amount, 0);
  const byType = funding.reduce((acc: Record<string, number>, f) => {
    acc[f.fundingType] = (acc[f.fundingType] || 0) + f.amount;
    return acc;
  }, {});
  const pieData = Object.entries(byType).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Investor Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard title="Total Invested" value={formatCurrency(totalFunding)} icon={DollarSign} />
        <StatCard title="Portfolio Startups" value={startups.length} icon={Building2} />
        <StatCard title="Funding Rounds" value={funding.length} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Funding by Type</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent Investments</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {funding.slice(0, 5).map((f) => (
                <div key={f.id} className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div>
                    <p className="font-medium text-gray-900">{f.startup?.name || 'Unknown'}</p>
                    <p className="text-sm text-gray-500">{f.fundingType}</p>
                  </div>
                  <p className="font-semibold text-gray-900">{formatCurrency(f.amount)}</p>
                </div>
              ))}
              {funding.length === 0 && (
                <p className="text-center text-gray-500 py-4">No investments recorded</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
