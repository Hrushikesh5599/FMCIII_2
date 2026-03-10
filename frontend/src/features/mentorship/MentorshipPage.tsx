import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { MentorAssignment, Startup } from '../../types';
import { useAuthStore } from '../../store/auth.store';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useForm } from 'react-hook-form';
import { Plus, Users } from 'lucide-react';
import { StatCard } from '../../components/shared/StatCard';

export default function MentorshipPage() {
  const [assignments, setAssignments] = useState<MentorAssignment[]>([]);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthStore();
  const { register, handleSubmit, reset } = useForm<{ mentorId: string; startupId: string }>();

  useEffect(() => {
    api.get('/mentor-assignments').then(r => setAssignments(r.data.data || [])).catch(console.error);
    api.get('/startups').then(r => setStartups(r.data.data || [])).catch(console.error);
  }, []);

  const onSubmit = async (data: { mentorId: string; startupId: string }) => {
    try {
      const { data: res } = await api.post('/mentor-assignments', data);
      setAssignments(prev => [...prev, res.data]);
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to assign mentor:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mentorship</h1>
        {user?.role === 'ADMIN' && (
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Assign Mentor
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard title="Total Assignments" value={assignments.length} icon={Users} />
        <StatCard title="Active" value={assignments.filter(a => a.status === 'ACTIVE').length} icon={Users} />
        <StatCard title="Startups with Mentors" value={new Set(assignments.map(a => a.startupId)).size} icon={Users} />
      </div>

      <Card>
        <CardHeader><CardTitle>Mentor Assignments</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-medium">
                    {assignment.mentor?.name?.[0]?.toUpperCase() || 'M'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {assignment.mentor?.name || assignment.mentor?.email}
                    </p>
                    <p className="text-sm text-gray-500">→ {assignment.startup?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-400">
                    {new Date(assignment.assignedDate).toLocaleDateString()}
                  </p>
                  <Badge variant={assignment.status === 'ACTIVE' ? 'success' : 'default'}>
                    {assignment.status}
                  </Badge>
                </div>
              </div>
            ))}
            {assignments.length === 0 && (
              <p className="text-center text-gray-500 py-8">No assignments yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Assign Mentor">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mentor Email/ID</label>
            <input
              {...register('mentorId', { required: true })}
              placeholder="Enter mentor user ID"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Startup</label>
            <select
              {...register('startupId', { required: true })}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            >
              <option value="">Select a startup</option>
              {startups.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">Assign</Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
