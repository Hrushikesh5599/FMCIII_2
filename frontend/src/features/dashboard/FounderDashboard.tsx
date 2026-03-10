import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { api } from '../../lib/api';
import { Startup, MentorAssignment } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function FounderDashboard() {
  const { user } = useAuthStore();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [mentors, setMentors] = useState<MentorAssignment[]>([]);

  useEffect(() => {
    api.get('/startups').then(r => setStartups(r.data.data || [])).catch(console.error);
    api.get('/mentor-assignments').then(r => setMentors(r.data.data || [])).catch(console.error);
  }, []);

  const myStartups = startups.filter(s => s.team?.some(t => t.userId === user?.id));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Founder Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>My Startups</CardTitle></CardHeader>
          <CardContent>
            {myStartups.length > 0 ? (
              <div className="space-y-4">
                {myStartups.map((startup) => (
                  <div key={startup.id} className="rounded-lg border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{startup.name}</h3>
                      <Badge variant="info">{startup.profile?.onboardingStatus || 'PENDING'}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{startup.description}</p>
                    <p className="mt-2 text-xs text-gray-400">{startup.domain}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No startups registered yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Assigned Mentors</CardTitle></CardHeader>
          <CardContent>
            {mentors.length > 0 ? (
              <div className="space-y-3">
                {mentors.slice(0, 5).map((assignment) => (
                  <div key={assignment.id} className="flex items-center gap-3 rounded-md border border-gray-100 p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                      {assignment.mentor?.name?.[0]?.toUpperCase() || 'M'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{assignment.mentor?.name || assignment.mentor?.email}</p>
                      <p className="text-sm text-gray-500">{assignment.startup?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No mentors assigned yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
