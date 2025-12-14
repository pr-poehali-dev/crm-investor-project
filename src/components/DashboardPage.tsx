import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authApi } from '@/lib/api';
import { mockAuthApi } from '@/lib/mockApi';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import type { SessionDto, UserDto } from '@/types/auth';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const isDemoMode = () => localStorage.getItem('demoMode') === 'true';

export const DashboardPage = () => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [sessions, setSessions] = useState<SessionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuthStore();
  const { toast } = useToast();

  const api = isDemoMode() ? mockAuthApi : authApi;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, sessionsData] = await Promise.all([
        api.getMe(),
        api.getSessions(),
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
      await api.deleteSession(sessionId);
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
  );
};