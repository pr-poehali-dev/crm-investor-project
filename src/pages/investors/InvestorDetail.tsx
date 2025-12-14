import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useInvestor, useSubmitInvestor, useApproveInvestor, useRejectInvestor } from '@/hooks/useInvestors';
import { InvestorStatus, InvestorStatusLabels } from '@/types/enums';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

export const InvestorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comment, setComment] = useState('');

  const { data: investor, isLoading } = useInvestor(Number(id));
  const submitMutation = useSubmitInvestor();
  const approveMutation = useApproveInvestor();
  const rejectMutation = useRejectInvestor();

  const handleSubmit = async () => {
    try {
      await submitMutation.mutateAsync({ id: Number(id), comment });
      toast({
        title: '✅ Отправлено на модерацию',
        description: 'Заявка передана администраторам',
      });
      setComment('');
    } catch (error: any) {
      toast({
        title: '❌ Ошибка',
        description: error.response?.data?.message || 'Не удалось отправить на модерацию',
        variant: 'destructive',
      });
    }
  };

  const handleApprove = async () => {
    try {
      await approveMutation.mutateAsync({ id: Number(id), comment });
      toast({
        title: '✅ Инвестор одобрен',
        description: 'Компания активирована',
      });
      setComment('');
    } catch (error: any) {
      toast({
        title: '❌ Ошибка',
        description: error.response?.data?.message || 'Не удалось одобрить',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async () => {
    if (!comment.trim()) {
      toast({
        title: '❌ Укажите причину',
        description: 'Комментарий обязателен при отклонении',
        variant: 'destructive',
      });
      return;
    }

    try {
      await rejectMutation.mutateAsync({ id: Number(id), comment });
      toast({
        title: '✅ Инвестор отклонён',
        description: 'Заявка отклонена',
      });
      setComment('');
    } catch (error: any) {
      toast({
        title: '❌ Ошибка',
        description: error.response?.data?.message || 'Не удалось отклонить',
        variant: 'destructive',
      });
    }
  };

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

  if (!investor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Инвестор не найден</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button variant="ghost" onClick={() => navigate('/investors')} className="mb-4">
        <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
        Назад к списку
      </Button>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{investor.name}</h1>
          <Badge className={getStatusColor(investor.status)}>
            {InvestorStatusLabels[investor.status]}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/investors/${id}/settings`)}>
            <Icon name="Settings" className="mr-2 h-4 w-4" />
            Настройки
          </Button>
          <Button variant="outline" onClick={() => navigate(`/investors/${id}/contacts`)}>
            <Icon name="Users" className="mr-2 h-4 w-4" />
            Контакты
          </Button>
        </div>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Информация</TabsTrigger>
          <TabsTrigger value="moderation">Модерация</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {investor.inn && (
                  <div>
                    <p className="text-sm text-gray-500">ИНН</p>
                    <p className="font-medium">{investor.inn}</p>
                  </div>
                )}
                {investor.ogrn && (
                  <div>
                    <p className="text-sm text-gray-500">ОГРН</p>
                    <p className="font-medium">{investor.ogrn}</p>
                  </div>
                )}
                {investor.kpp && (
                  <div>
                    <p className="text-sm text-gray-500">КПП</p>
                    <p className="font-medium">{investor.kpp}</p>
                  </div>
                )}
                {investor.okpo && (
                  <div>
                    <p className="text-sm text-gray-500">ОКПО</p>
                    <p className="font-medium">{investor.okpo}</p>
                  </div>
                )}
                {investor.contactPhone && (
                  <div>
                    <p className="text-sm text-gray-500">Телефон</p>
                    <p className="font-medium">{investor.contactPhone}</p>
                  </div>
                )}
                {investor.contactEmail && (
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{investor.contactEmail}</p>
                  </div>
                )}
                {investor.website && (
                  <div>
                    <p className="text-sm text-gray-500">Веб-сайт</p>
                    <a href={investor.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                      {investor.website}
                    </a>
                  </div>
                )}
              </div>

              {investor.legalAddress && (
                <div>
                  <p className="text-sm text-gray-500">Юридический адрес</p>
                  <p className="font-medium">{investor.legalAddress}</p>
                </div>
              )}

              {investor.actualAddress && (
                <div>
                  <p className="text-sm text-gray-500">Фактический адрес</p>
                  <p className="font-medium">{investor.actualAddress}</p>
                </div>
              )}

              {investor.description && (
                <div>
                  <p className="text-sm text-gray-500">Описание</p>
                  <p className="font-medium">{investor.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation">
          <Card>
            <CardHeader>
              <CardTitle>Управление модерацией</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Комментарий</p>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Добавьте комментарий..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                {investor.status === InvestorStatus.NEW && (
                  <Button onClick={handleSubmit} disabled={submitMutation.isPending}>
                    {submitMutation.isPending && (
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Отправить на модерацию
                  </Button>
                )}

                {investor.status === InvestorStatus.PENDING && (
                  <>
                    <Button onClick={handleApprove} disabled={approveMutation.isPending}>
                      {approveMutation.isPending && (
                        <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Одобрить
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleReject}
                      disabled={rejectMutation.isPending}
                    >
                      {rejectMutation.isPending && (
                        <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Отклонить
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
