import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Startup, Application, Funding } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area,
} from 'recharts';
import { formatCurrency } from '../../lib/utils';

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed'];

export default function AnalyticsPage() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [funding, setFunding] = useState<Funding[]>([]);

  useEffect(() => {
    Promise.all([
      api.get('/startups').then(r => setStartups(r.data.data || [])),
      api.get('/applications').then(r => setApplications(r.data.data || [])),
      api.get('/funding').then(r => setFunding(r.data.data || [])),
    ]).catch(console.error);
  }, []);

  const appByStatus = [
    { name: 'Applied', value: applications.filter(a => a.status === 'APPLIED').length },
    { name: 'Interview', value: applications.filter(a => a.status === 'INTERVIEW').length },
    { name: 'Selected', value: applications.filter(a => a.status === 'SELECTED').length },
    { name: 'Rejected', value: applications.filter(a => a.status === 'REJECTED').length },
  ];

  const fundingByType = Object.entries(
    funding.reduce((acc: Record<string, number>, f) => {
      acc[f.fundingType] = (acc[f.fundingType] || 0) + f.amount;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const monthlyFunding = funding.reduce((acc: Record<string, number>, f) => {
    const month = new Date(f.fundingDate).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
    acc[month] = (acc[month] || 0) + f.amount;
    return acc;
  }, {});

  const fundingTrend = Object.entries(monthlyFunding)
    .map(([month, amount]) => ({ month, amount }))
    .slice(-12);

  const domainData = Object.entries(
    startups.reduce((acc: Record<string, number>, s) => {
      const d = s.domain || 'Other';
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Application Pipeline Status</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={appByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Funding by Type</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={fundingByType} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name }) => name}>
                  {fundingByType.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Monthly Funding Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={fundingTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area type="monotone" dataKey="amount" stroke="#2563eb" fill="#dbeafe" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Startups by Domain</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={domainData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#16a34a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
