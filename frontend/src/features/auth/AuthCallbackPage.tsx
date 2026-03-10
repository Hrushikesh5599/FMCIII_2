import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/auth.store';

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      navigate('/login');
      return;
    }

    api.post('/auth/google', { code })
      .then(({ data }) => {
        if (data.success && data.data) {
          login(data.data.token, data.data.user);
          const role = data.data.user.role;
          switch (role) {
            case 'ADMIN': navigate('/dashboard/admin'); break;
            case 'MENTOR': navigate('/dashboard/mentor'); break;
            case 'INVESTOR': navigate('/dashboard/investor'); break;
            default: navigate('/dashboard/founder');
          }
        }
      })
      .catch(() => navigate('/login'));
  }, [searchParams, navigate, login]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent mx-auto" />
        <p className="mt-4 text-gray-600">Authenticating...</p>
      </div>
    </div>
  );
}
