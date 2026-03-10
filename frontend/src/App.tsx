import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.store';
import LoginPage from './features/auth/LoginPage';
import AdminDashboard from './features/dashboard/AdminDashboard';
import FounderDashboard from './features/dashboard/FounderDashboard';
import MentorDashboard from './features/dashboard/MentorDashboard';
import InvestorDashboard from './features/dashboard/InvestorDashboard';
import StartupListPage from './features/startups/StartupListPage';
import StartupDetailPage from './features/startups/StartupDetailPage';
import ApplicationPipelinePage from './features/applications/ApplicationPipelinePage';
import ScorecardPage from './features/evaluation/ScorecardPage';
import MentorshipPage from './features/mentorship/MentorshipPage';
import FundingPage from './features/funding/FundingPage';
import KnowledgeBasePage from './features/knowledge/KnowledgeBasePage';
import AnalyticsPage from './features/analytics/AnalyticsPage';
import AuthCallbackPage from './features/auth/AuthCallbackPage';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/shared/ProtectedRoute';

export default function App() {
  const { isAuthenticated, user } = useAuthStore();

  const getDashboardByRole = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'ADMIN': return '/dashboard/admin';
      case 'MENTOR': return '/dashboard/mentor';
      case 'INVESTOR': return '/dashboard/investor';
      default: return '/dashboard/founder';
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={getDashboardByRole()} />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Navigate to={isAuthenticated ? getDashboardByRole() : '/login'} />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/founder" element={<FounderDashboard />} />
          <Route path="/dashboard/mentor" element={<MentorDashboard />} />
          <Route path="/dashboard/investor" element={<InvestorDashboard />} />
          <Route path="/startups" element={<StartupListPage />} />
          <Route path="/startups/:id" element={<StartupDetailPage />} />
          <Route path="/applications" element={<ApplicationPipelinePage />} />
          <Route path="/evaluation" element={<ScorecardPage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/funding" element={<FundingPage />} />
          <Route path="/knowledge" element={<KnowledgeBasePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
