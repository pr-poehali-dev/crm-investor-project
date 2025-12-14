import { AuthPage } from '@/components/AuthPage';
import { DashboardPage } from '@/components/DashboardPage';
import { useAuthStore } from '@/store/authStore';

const Index = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  return isAuthenticated ? <DashboardPage /> : <AuthPage />;
};

export default Index;