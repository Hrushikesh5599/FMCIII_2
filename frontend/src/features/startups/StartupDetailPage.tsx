import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStartupStore } from '../../store/startup.store';
import { useAuthStore } from '../../store/auth.store';
import { api } from '../../lib/api';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';

export default function StartupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedStartup, fetchStartupById, isLoading } = useStartupStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchStartupById(id);
  }, [id, fetchStartupById]);

  const handleAccept = async () => {
    if (!id) return;
    try {
      await api.post(`/startups/${id}/accept`, { googleTokens: {} });
      fetchStartupById(id);
    } catch (error) {
      console.error('Failed to accept startup:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (!selectedStartup) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/startups')} className="rounded-md p-2 hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{selectedStartup.name}</h1>
          <p className="text-sm text-gray-500">{selectedStartup.domain}</p>
        </div>
        {user?.role === 'ADMIN' && selectedStartup.profile?.onboardingStatus !== 'ACCEPTED' && (
          <Button onClick={handleAccept} variant="secondary">
            <CheckCircle className="mr-2 h-4 w-4" />
            Accept Startup
          </Button>
        )}
        <Badge variant={selectedStartup.profile?.onboardingStatus === 'ACCEPTED' ? 'success' : 'default'}>
          {selectedStartup.profile?.onboardingStatus || 'PENDING'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
            <CardContent>
              <p className="text-gray-700">{selectedStartup.description || 'No description available'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Team Members</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedStartup.team?.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                      {member.user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.user?.name || member.user?.email}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
                {(!selectedStartup.team || selectedStartup.team.length === 0) && (
                  <p className="text-gray-500">No team members</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Documents</CardTitle></CardHeader>
            <CardContent>
              {selectedStartup.profile?.documentsUrl ? (
                <a href={selectedStartup.profile.documentsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm">
                  <ExternalLink className="h-4 w-4" />
                  View Offer Letter
                </a>
              ) : (
                <p className="text-sm text-gray-500">No documents available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Applications</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedStartup.applications?.map((app) => (
                  <div key={app.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Application</span>
                    <Badge variant={app.status === 'SELECTED' ? 'success' : app.status === 'REJECTED' ? 'danger' : 'default'}>
                      {app.status}
                    </Badge>
                  </div>
                ))}
                {(!selectedStartup.applications || selectedStartup.applications.length === 0) && (
                  <p className="text-sm text-gray-500">No applications</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
