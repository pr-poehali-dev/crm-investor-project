import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { logout, userId } = useAuthStore();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: '👋 До свидания',
      description: 'Вы успешно вышли из системы',
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Halal Invest
                  </h1>
                  <p className="text-xs text-gray-500">ID: {userId}</p>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    <Icon name="LayoutDashboard" className="mr-2 h-4 w-4" />
                    Панель
                  </Button>
                </Link>
                <Link to="/investors">
                  <Button variant="ghost" size="sm">
                    <Icon name="Building2" className="mr-2 h-4 w-4" />
                    Инвесторы
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <Icon name="User" className="mr-2 h-4 w-4" />
                  Профиль
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <Icon name="LogOut" className="mr-2 h-4 w-4" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
};
