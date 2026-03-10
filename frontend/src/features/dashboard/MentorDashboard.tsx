import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { MentorAssignment } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Users } from 'lucide-react';
import { StatCard } from '../../components/shared/StatCard';

export default function MentorDashboard() {
  const [assignments, setAssignments] = useState<MentorAssignment[]>([]);

  useEffect(() => {
    api.get('/mentor-assignments/my').then(r => setAssignments(r.data.data || [])).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mentor Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard title="Assigned Startups" value={assignments.length} icon={Users} />
        <StatCard title="Active Sessions" value={assignments.filter(a => a.status === 'ACTIVE').length} icon={Users} />
        <StatCard title="Completed" value={assignments.filter(a => a.status === 'COMPLETED').length} icon={Users} />
      </div>

      <Card>
        <CardHeader><CardTitle>My Startup Assignments</CardTitle></CardHeader>
        <CardContent>
          {assignments.length > 0 ? (
            <div className="space-y-3">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between rounded-md border border-gray-100 p-4">
                  <div>
                    <p className="font-semibold text-gray-900">{assignment.startup?.name}</p>
                    <p className="text-sm text-gray-500">
                      Assigned: {new Date(assignment.assignedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={assignment.status === 'ACTIVE' ? 'success' : 'default'}>
                    {assignment.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No assignments yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
