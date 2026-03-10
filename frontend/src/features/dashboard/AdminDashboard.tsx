import { useEffect, useState } from 'react';
import { Building2, ClipboardList, Users, DollarSign } from 'lucide-react';
import { StatCard } from '../../components/shared/StatCard';
import { api } from '../../lib/api';
import { Startup, Application, Funding } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';

export default function AdminDashboard() {
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

  const stageData = [
    { stage: 'Applied', count: applications.filter(a => a.status === 'APPLIED').length },
    { stage: 'Interview', count: applications.filter(a => a.status === 'INTERVIEW').length },
    { stage: 'Selected', count: applications.filter(a => a.status === 'SELECTED').length },
  ];

  const totalFunding = funding.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Startups" value={startups.length} icon={Building2} />
        <StatCard title="Applications" value={applications.length} icon={ClipboardList} />
        <StatCard title="Selected" value={applications.filter(a => a.status === 'SELECTED').length} icon={Users} />
        <StatCard title="Total Funding" value={formatCurrency(totalFunding)} icon={DollarSign} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Application Pipeline</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent Startups</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {startups.slice(0, 5).map((startup) => (
                <div key={startup.id} className="flex items-center justify-between rounded-md border border-gray-100 p-3">
                  <div>
                    <p className="font-medium text-gray-900">{startup.name}</p>
                    <p className="text-sm text-gray-500">{startup.domain || 'No domain'}</p>
                  </div>
                  <span className="text-xs text-gray-400">{startup.profile?.onboardingStatus}</span>
                </div>
              ))}
              {startups.length === 0 && (
                <p className="text-center text-gray-500 py-4">No startups yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
