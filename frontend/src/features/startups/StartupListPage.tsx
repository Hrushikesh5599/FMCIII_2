import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStartupStore } from '../../store/startup.store';
import { useAuthStore } from '../../store/auth.store';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../../components/ui/Input';
import { Plus, Search } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  domain: z.string().optional(),
  description: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function StartupListPage() {
  const { startups, fetchStartups, createStartup, isLoading } = useStartupStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => { fetchStartups(); }, [fetchStartups]);

  const onSubmit = async (data: FormData) => {
    await createStartup(data);
    reset();
    setIsModalOpen(false);
  };

  const filtered = startups.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.domain?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Startups</h1>
        {(user?.role === 'ADMIN' || user?.role === 'INCUBATEE') && (
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Startup
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search startups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-gray-300 pl-9 pr-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((startup) => (
            <Card key={startup.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/startups/${startup.id}`)}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700 font-bold text-lg">
                    {startup.name[0]}
                  </div>
                  <Badge variant={startup.profile?.onboardingStatus === 'ACCEPTED' ? 'success' : 'default'}>
                    {startup.profile?.onboardingStatus || 'PENDING'}
                  </Badge>
                </div>
                <h3 className="mt-3 font-semibold text-gray-900">{startup.name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{startup.description || 'No description'}</p>
                <p className="mt-2 text-xs text-primary-600">{startup.domain || 'No domain'}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                  <span>{startup.team?.length || 0} team members</span>
                  <span>•</span>
                  <span>{startup.applications?.length || 0} applications</span>
                </div>
              </CardContent>
            </Card>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-3 py-12 text-center text-gray-500">
              No startups found
            </div>
          )}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Startup">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Startup Name" {...register('name')} error={errors.name?.message} placeholder="Enter startup name" />
          <Input label="Domain" {...register('domain')} placeholder="e.g., HealthTech, FinTech" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Brief description of the startup"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">Create Startup</Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
