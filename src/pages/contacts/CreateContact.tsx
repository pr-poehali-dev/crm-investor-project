import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useCreateContact } from '@/hooks/useContacts';
import type { CreateContactDto } from '@/types/api';
import Icon from '@/components/ui/icon';

export const CreateContact = () => {
  const { investorId } = useParams<{ investorId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateContactDto>();
  const createMutation = useCreateContact();

  const onSubmit = async (data: CreateContactDto) => {
    try {
      await createMutation.mutateAsync({ investorId: Number(investorId), data });
      toast({
        title: '✅ Контакт создан',
        description: 'Клиент успешно добавлен в базу',
      });
      navigate(`/investors/${investorId}/contacts`);
    } catch (error: any) {
      toast({
        title: '❌ Ошибка',
        description: error.response?.data?.message || 'Не удалось создать контакт',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => navigate(`/investors/${investorId}/contacts`)}
        className="mb-4"
      >
        <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Создание контакта</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="lastName">Фамилия *</Label>
                <Input
                  id="lastName"
                  {...register('lastName', { required: 'Обязательное поле' })}
                  placeholder="Иванов"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="firstName">Имя *</Label>
                <Input
                  id="firstName"
                  {...register('firstName', { required: 'Обязательное поле' })}
                  placeholder="Иван"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="middleName">Отчество</Label>
                <Input id="middleName" {...register('middleName')} placeholder="Иванович" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="birthDate">Дата рождения</Label>
                <Input id="birthDate" type="date" {...register('birthDate')} />
              </div>

              <div>
                <Label htmlFor="birthPlace">Место рождения</Label>
                <Input id="birthPlace" {...register('birthPlace')} placeholder="г. Москва" />
              </div>

              <div>
                <Label htmlFor="snils">СНИЛС</Label>
                <Input id="snils" {...register('snils')} placeholder="123-456-789 00" />
              </div>

              <div>
                <Label htmlFor="inn">ИНН</Label>
                <Input id="inn" {...register('inn')} placeholder="123456789012" />
              </div>

              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" {...register('phone')} placeholder="+7 (999) 123-45-67" />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} placeholder="client@mail.ru" />
              </div>
            </div>

            <div>
              <Label htmlFor="registrationAddress">Адрес регистрации *</Label>
              <Input
                id="registrationAddress"
                {...register('registrationAddress', { required: 'Обязательное поле' })}
                placeholder="г. Москва, ул. Ленина, д. 1, кв. 1"
              />
              {errors.registrationAddress && (
                <p className="text-sm text-red-600 mt-1">{errors.registrationAddress.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="residentialAddress">Адрес проживания</Label>
              <Input
                id="residentialAddress"
                {...register('residentialAddress')}
                placeholder="г. Москва, ул. Ленина, д. 1, кв. 1"
              />
            </div>

            <div>
              <Label htmlFor="notes">Заметки</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Дополнительная информация о клиенте..."
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending && (
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                )}
                Создать контакт
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/investors/${investorId}/contacts`)}
              >
                Отмена
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
