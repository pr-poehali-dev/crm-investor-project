import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthPage } from '@/components/AuthPage';
import { useAuthStore } from '@/store/authStore';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return <AuthPage />;
};

export default Index;