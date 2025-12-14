import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { authApi } from '@/lib/api';
import { mockAuthApi } from '@/lib/mockApi';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';

type AuthMode = 'login' | 'register' | 'verify';

const isDemoMode = () => localStorage.getItem('demoMode') === 'true';

export const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(isDemoMode());
  
  const { setTokens, setUserId } = useAuthStore();
  const { toast } = useToast();

  const api = demoMode ? mockAuthApi : authApi;

  const toggleDemoMode = (enabled: boolean) => {
    setDemoMode(enabled);
    localStorage.setItem('demoMode', String(enabled));
    if (enabled) {
      setEmail('demo@halal.invest');
      setPassword('demo1234');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await api.login({ email, password });
      setTokens(data.accessToken, data.refreshToken);
      
      const { data: userData } = await api.getMe();
      setUserId(userData.id);
      
      toast({
        title: '✅ Успешный вход',
        description: 'Добро пожаловать в Halal Invest',
      });
    } catch (error: any) {
      toast({
        title: '❌ Ошибка входа',
        description: error.response?.data?.message || 'Неверный email или пароль',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: '❌ Пароли не совпадают',
        description: 'Проверьте правильность ввода',
        variant: 'destructive',
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: '❌ Слабый пароль',
        description: 'Пароль должен содержать минимум 8 символов',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await api.register({ email, password });
      setMode('verify');
      toast({
        title: '📧 Проверьте email',
        description: demoMode ? 'Используйте код: 123456' : 'Мы отправили код подтверждения на вашу почту',
      });
    } catch (error: any) {
      toast({
        title: '❌ Ошибка регистрации',
        description: error.response?.data?.message || 'Email уже используется',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.verifyEmail({ email, code: verificationCode });
      toast({
        title: '✅ Email подтверждён',
        description: 'Теперь вы можете войти в систему',
      });
      setMode('login');
      setVerificationCode('');
    } catch (error: any) {
      toast({
        title: '❌ Неверный код',
        description: error.response?.data?.message || 'Проверьте код из письма',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      await api.resendCode(email);
      toast({
        title: '📧 Код отправлен',
        description: 'Проверьте email',
      });
    } catch (error) {
      toast({
        title: '❌ Ошибка',
        description: 'Не удалось отправить код',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Halal Invest
          </h1>
          <p className="text-gray-600">Система управления инвестициями</p>
        </div>

        <div className="mb-4 p-4 bg-white rounded-lg shadow-md border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="TestTube" className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-semibold text-sm text-gray-800">Демо-режим</p>
                <p className="text-xs text-gray-500">
                  {demoMode ? 'demo@halal.invest / demo1234' : 'Работа с реальным API'}
                </p>
              </div>
            </div>
            <Switch checked={demoMode} onCheckedChange={toggleDemoMode} />
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl">
              {mode === 'login' && 'Вход'}
              {mode === 'register' && 'Регистрация'}
              {mode === 'verify' && 'Подтверждение email'}
            </CardTitle>
            <CardDescription>
              {mode === 'login' && 'Введите ваши учётные данные'}
              {mode === 'register' && 'Создайте новый аккаунт'}
              {mode === 'verify' && 'Введите код из письма'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Вход...
                    </>
                  ) : (
                    <>
                      <Icon name="LogIn" className="mr-2 h-4 w-4" />
                      Войти
                    </>
                  )}
                </Button>
              </form>
            )}

            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="reg-password">Пароль (мин. 8 символов)</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Регистрация...
                    </>
                  ) : (
                    <>
                      <Icon name="UserPlus" className="mr-2 h-4 w-4" />
                      Зарегистрироваться
                    </>
                  )}
                </Button>
              </form>
            )}

            {mode === 'verify' && (
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <Label htmlFor="code">Код подтверждения</Label>
                  <Input
                    id="code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    required
                    className="text-center text-2xl tracking-widest"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Код отправлен на {email}
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Проверка...
                    </>
                  ) : (
                    <>
                      <Icon name="Check" className="mr-2 h-4 w-4" />
                      Подтвердить
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={handleResendCode}
                  disabled={loading}
                >
                  <Icon name="RefreshCw" className="mr-2 h-4 w-4" />
                  Отправить код повторно
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex justify-center">
            {mode === 'login' ? (
              <Button variant="link" onClick={() => setMode('register')}>
                Нет аккаунта? Зарегистрироваться
              </Button>
            ) : mode === 'register' ? (
              <Button variant="link" onClick={() => setMode('login')}>
                Уже есть аккаунт? Войти
              </Button>
            ) : (
              <Button variant="link" onClick={() => setMode('login')}>
                Вернуться ко входу
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};