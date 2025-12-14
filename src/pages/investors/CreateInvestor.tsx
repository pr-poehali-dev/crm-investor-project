import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useCreateInvestor } from '@/hooks/useInvestors';
import type { CreateInvestorDto } from '@/types/api';
import Icon from '@/components/ui/icon';

export const CreateInvestor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateInvestorDto>();
  const createMutation = useCreateInvestor();

  const onSubmit = async (data: CreateInvestorDto) => {
    try {
      await createMutation.mutateAsync(data);
      toast({
        title: '✅ Инвестор создан',
        description: 'Компания успешно добавлена в систему',
      });
      navigate('/investors');
    } catch (error: any) {
      toast({
        title: '❌ Ошибка',
        description: error.response?.data?.message || 'Не удалось создать инвестора',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" onClick={() => navigate('/investors')} className="mb-4">
        <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Создание инвестора</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Название компании *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Обязательное поле' })}
                  placeholder="ООО Инвест"
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="inn">ИНН</Label>
                <Input id="inn" {...register('inn')} placeholder="1234567890" />
              </div>

              <div>
                <Label htmlFor="ogrn">ОГРН</Label>
                <Input id="ogrn" {...register('ogrn')} placeholder="1234567890123" />
              </div>

              <div>
                <Label htmlFor="kpp">КПП</Label>
                <Input id="kpp" {...register('kpp')} placeholder="123456789" />
              </div>

              <div>
                <Label htmlFor="okpo">ОКПО</Label>
                <Input id="okpo" {...register('okpo')} placeholder="12345678" />
              </div>

              <div>
                <Label htmlFor="contactPhone">Телефон</Label>
                <Input id="contactPhone" {...register('contactPhone')} placeholder="+7 (999) 123-45-67" />
              </div>

              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...register('contactEmail')}
                  placeholder="info@company.ru"
                />
              </div>

              <div>
                <Label htmlFor="website">Веб-сайт</Label>
                <Input id="website" {...register('website')} placeholder="https://company.ru" />
              </div>
            </div>

            <div>
              <Label htmlFor="legalAddress">Юридический адрес</Label>
              <Input
                id="legalAddress"
                {...register('legalAddress')}
                placeholder="г. Москва, ул. Ленина, д. 1"
              />
            </div>

            <div>
              <Label htmlFor="actualAddress">Фактический адрес</Label>
              <Input
                id="actualAddress"
                {...register('actualAddress')}
                placeholder="г. Москва, ул. Ленина, д. 1"
              />
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Краткое описание деятельности компании..."
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending && (
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                )}
                Создать инвестора
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/investors')}>
                Отмена
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
