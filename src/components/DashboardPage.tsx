import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import type { SessionDto, UserDto } from '@/types/auth';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

export const DashboardPage = () => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [sessions, setSessions] = useState<SessionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout, userId } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, sessionsData] = await Promise.all([
        authApi.getMe(),
        authApi.getSessions(),
      ]);
      
      setUser(userData.data);
      setSessions(sessionsData.data);
    } catch (error) {
      toast({
        title: '❌ Ошибка загрузки',
        description: 'Не удалось загрузить данные',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSession = async (sessionId: number) => {
    try {
      await authApi.deleteSession(sessionId);
      setSessions(sessions.filter(s => s.id !== sessionId));
      toast({
        title: '✅ Сессия удалена',
        description: 'Устройство отключено от системы',
      });
    } catch (error) {
      toast({
        title: '❌ Ошибка',
        description: 'Не удалось удалить сессию',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: '👋 До свидания',
      description: 'Вы успешно вышли из системы',
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Icon name="Loader2" className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Halal Invest
              </h1>
              <p className="text-xs text-gray-500">ID: {userId}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <Icon name="LogOut" className="mr-2 h-4 w-4" />
            Выйти
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="shadow-lg border-0 animate-fade-in">
            <CardHeader className="pb-3">
              <CardDescription>Статус аккаунта</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Icon name="CheckCircle" className="h-8 w-8 text-green-500" />
                Активен
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-3">
              <CardDescription>Активные сессии</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Icon name="Smartphone" className="h-8 w-8 text-blue-500" />
                {sessions.length}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <CardDescription>ID пользователя</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Icon name="User" className="h-8 w-8 text-purple-500" />
                #{userId}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="shadow-lg border-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Shield" className="h-6 w-6 text-blue-600" />
              Активные сессии
            </CardTitle>
            <CardDescription>
              Управляйте устройствами, которые имеют доступ к вашему аккаунту
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Icon name="Wifi" className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Нет активных сессий</p>
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <Icon name="Monitor" className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{session.ip}</p>
                          {session.isCurrent && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              Текущая
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {session.location || 'Неизвестное местоположение'}
                        </p>
                        <p className="text-xs text-gray-400">
                          Вход: {formatDate(session.createdAt)}
                        </p>
                      </div>
                    </div>
                    {!session.isCurrent && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSession(session.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Icon name="Trash2" className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
