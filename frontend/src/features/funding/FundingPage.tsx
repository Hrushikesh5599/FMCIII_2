import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Funding, Startup } from '../../types';
import { useAuthStore } from '../../store/auth.store';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { useForm } from 'react-hook-form';
import { Plus, DollarSign, TrendingUp } from 'lucide-react';
import { StatCard } from '../../components/shared/StatCard';
import { formatCurrency, formatDate } from '../../lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FUNDING_TYPES = ['SEED', 'PRE_SERIES_A', 'SERIES_A', 'SERIES_B', 'GRANT', 'ANGEL'];

interface FundingForm {
  startupId: string;
  investorId: string;
  amount: number;
  fundingType: string;
  fundingDate: string;
}

const MAX_CHART_NAME_LENGTH = 10;

export default function FundingPage() {
  const [funding, setFunding] = useState<Funding[]>([]);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthStore();
  const { register, handleSubmit, reset } = useForm<FundingForm>();

  useEffect(() => {
    api.get('/funding').then(r => setFunding(r.data.data || [])).catch(console.error);
    api.get('/startups').then(r => setStartups(r.data.data || [])).catch(console.error);
  }, []);

  const onSubmit = async (data: FundingForm) => {
    try {
      const { data: res } = await api.post('/funding', { ...data, amount: Number(data.amount) });
      setFunding(prev => [...prev, res.data]);
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add funding:', error);
    }
  };

  const totalFunding = funding.reduce((sum, f) => sum + f.amount, 0);
  const chartData = startups.slice(0, 8).map(s => ({
    name: s.name.slice(0, MAX_CHART_NAME_LENGTH),
    amount: funding.filter(f => f.startupId === s.id).reduce((sum, f) => sum + f.amount, 0),
  })).filter(d => d.amount > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Funding Tracker</h1>
        {user?.role === 'ADMIN' && (
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Funding
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard title="Total Funding" value={formatCurrency(totalFunding)} icon={DollarSign} />
        <StatCard title="Funding Rounds" value={funding.length} icon={TrendingUp} />
        <StatCard title="Funded Startups" value={new Set(funding.map(f => f.startupId)).size} icon={TrendingUp} />
      </div>

      {chartData.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Funding by Startup</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="amount" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Funding History</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 text-left font-medium text-gray-500">Startup</th>
                  <th className="py-3 text-left font-medium text-gray-500">Type</th>
                  <th className="py-3 text-left font-medium text-gray-500">Amount</th>
                  <th className="py-3 text-left font-medium text-gray-500">Date</th>
                  <th className="py-3 text-left font-medium text-gray-500">Investor</th>
                </tr>
              </thead>
              <tbody>
                {funding.map((f) => (
                  <tr key={f.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{f.startup?.name}</td>
                    <td className="py-3 text-gray-600">{f.fundingType}</td>
                    <td className="py-3 font-semibold text-green-700">{formatCurrency(f.amount)}</td>
                    <td className="py-3 text-gray-500">{formatDate(f.fundingDate)}</td>
                    <td className="py-3 text-gray-500">{f.investor?.name || f.investor?.email}</td>
                  </tr>
                ))}
                {funding.length === 0 && (
                  <tr><td colSpan={5} className="py-8 text-center text-gray-500">No funding records</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Funding Round">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Startup</label>
            <select {...register('startupId', { required: true })} className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none">
              <option value="">Select startup</option>
              {startups.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investor ID</label>
            <input {...register('investorId', { required: true })} placeholder="Investor user ID" className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
            <input {...register('amount', { required: true, valueAsNumber: true })} type="number" placeholder="0" className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Funding Type</label>
            <select {...register('fundingType', { required: true })} className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none">
              {FUNDING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Funding Date</label>
            <input {...register('fundingDate', { required: true })} type="date" className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">Add Funding</Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
