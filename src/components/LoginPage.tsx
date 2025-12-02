import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast({
        title: "Вход выполнен",
        description: "Добро пожаловать в систему",
      });
      onLogin();
    } else {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-xl animate-fade-in">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-purple-400 rounded-2xl flex items-center justify-center mb-2">
            <Icon name="TrendingUp" size={32} className="text-white" />
          </div>
          <CardTitle className="text-3xl font-semibold">CRM Инвестора</CardTitle>
          <CardDescription className="text-base">Управление рассрочками и клиентами</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="investor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-all"
              />
            </div>
            <Button type="submit" className="w-full mt-6 h-11" size="lg">
              <Icon name="LogIn" size={18} className="mr-2" />
              Войти
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
