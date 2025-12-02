import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { AddClientDialog } from './AddClientDialog';
import { AddOrderDialog } from './AddOrderDialog';

interface DashboardProps {
  onLogout: () => void;
}

interface Order {
  id: number;
  client: string;
  product: string;
  startDate: string;
  endDate: string;
  total: number;
  remaining: number;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      client: 'Иванов Иван Иванович',
      product: 'Ноутбук HP Pavilion',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      total: 75000,
      remaining: 37500,
    },
    {
      id: 2,
      client: 'Петрова Мария Сергеевна',
      product: 'iPhone 15 Pro',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      total: 120000,
      remaining: 80000,
    },
    {
      id: 3,
      client: 'Сидоров Петр Андреевич',
      product: 'Холодильник Samsung',
      startDate: '2024-03-10',
      endDate: '2024-09-10',
      total: 45000,
      remaining: 15000,
    },
  ]);

  const tabs = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'clients', label: 'Клиенты', icon: 'Users' },
    { id: 'orders', label: 'Заказы', icon: 'ShoppingCart' },
    { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
  ];

  const getProgressPercentage = (total: number, remaining: number) => {
    return Math.round(((total - remaining) / total) * 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <nav className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-400 rounded-xl flex items-center justify-center">
                <Icon name="TrendingUp" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-semibold">CRM Инвестора</h1>
            </div>
            <Button variant="ghost" onClick={onLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="whitespace-nowrap"
            >
              <Icon name={tab.icon as any} size={18} className="mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === 'home' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Всего заказов</CardDescription>
                  <CardTitle className="text-3xl">{orders.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Активных рассрочек
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Общая сумма</CardDescription>
                  <CardTitle className="text-3xl">
                    {formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="TrendingUp" size={16} className="mr-2" />
                    По всем заказам
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>К получению</CardDescription>
                  <CardTitle className="text-3xl">
                    {formatCurrency(orders.reduce((sum, order) => sum + order.remaining, 0))}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Wallet" size={16} className="mr-2" />
                    Остаток платежей
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Активные рассрочки</CardTitle>
                    <CardDescription>Список товаров в рассрочке</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => setIsClientDialogOpen(true)} variant="outline">
                      <Icon name="UserPlus" size={18} className="mr-2" />
                      Добавить клиента
                    </Button>
                    <Button onClick={() => setIsOrderDialogOpen(true)}>
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить заказ
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Товар</TableHead>
                        <TableHead>Начало</TableHead>
                        <TableHead>Конец</TableHead>
                        <TableHead className="text-right">Сумма</TableHead>
                        <TableHead className="text-right">Остаток</TableHead>
                        <TableHead className="text-center">Прогресс</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => {
                        const progress = getProgressPercentage(order.total, order.remaining);
                        return (
                          <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                            <TableCell className="font-medium">{order.client}</TableCell>
                            <TableCell>{order.product}</TableCell>
                            <TableCell>{new Date(order.startDate).toLocaleDateString('ru-RU')}</TableCell>
                            <TableCell>{new Date(order.endDate).toLocaleDateString('ru-RU')}</TableCell>
                            <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                              {formatCurrency(order.remaining)}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant={progress > 60 ? 'default' : 'secondary'}>
                                {progress}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'clients' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Клиенты</CardTitle>
              <CardDescription>Управление базой клиентов</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Раздел в разработке</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'orders' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Заказы</CardTitle>
              <CardDescription>История всех заказов</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Раздел в разработке</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Аналитика</CardTitle>
              <CardDescription>Статистика и отчеты</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Раздел в разработке</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'profile' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Профиль</CardTitle>
              <CardDescription>Настройки аккаунта</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Раздел в разработке</p>
            </CardContent>
          </Card>
        )}
      </div>

      <AddClientDialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen} />
      <AddOrderDialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen} />
    </div>
  );
};
