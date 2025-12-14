import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInvestors } from '@/hooks/useInvestors';
import { InvestorStatus, InvestorStatusLabels } from '@/types/enums';
import Icon from '@/components/ui/icon';

export const InvestorsList = () => {
  const [statusFilter, setStatusFilter] = useState<InvestorStatus | undefined>();
  const { data: investors, isLoading } = useInvestors(statusFilter);

  const getStatusColor = (status: InvestorStatus) => {
    const colors = {
      [InvestorStatus.NEW]: 'bg-gray-100 text-gray-700',
      [InvestorStatus.PENDING]: 'bg-yellow-100 text-yellow-700',
      [InvestorStatus.ACTIVE]: 'bg-green-100 text-green-700',
      [InvestorStatus.REJECTED]: 'bg-red-100 text-red-700',
      [InvestorStatus.SUSPENDED]: 'bg-orange-100 text-orange-700',
    };
    return colors[status];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon name="Loader2" className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Инвесторы</h1>
          <p className="text-gray-500">Управление компаниями-инвесторами</p>
        </div>
        <Link to="/investors/new">
          <Button>
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            Создать инвестора
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as InvestorStatus)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Все статусы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Все статусы</SelectItem>
            {Object.values(InvestorStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {InvestorStatusLabels[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {investors?.map((investor) => (
          <Link key={investor.id} to={`/investors/${investor.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{investor.name}</CardTitle>
                  <Badge className={getStatusColor(investor.status)}>
                    {InvestorStatusLabels[investor.status]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {investor.inn && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">ИНН:</span> {investor.inn}
                  </p>
                )}
                {investor.contactPhone && (
                  <p className="text-sm text-gray-600 mb-1">
                    <Icon name="Phone" className="inline h-3 w-3 mr-1" />
                    {investor.contactPhone}
                  </p>
                )}
                {investor.contactEmail && (
                  <p className="text-sm text-gray-600">
                    <Icon name="Mail" className="inline h-3 w-3 mr-1" />
                    {investor.contactEmail}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {investors?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Building2" className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg">Нет инвесторов</p>
          <Link to="/investors/new">
            <Button className="mt-4">Создать первого инвестора</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
