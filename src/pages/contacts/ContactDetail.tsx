import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useContact, useContactDocuments, useDeleteContact } from '@/hooks/useContacts';
import Icon from '@/components/ui/icon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { DocumentTypeLabels } from '@/types/enums';

export const ContactDetail = () => {
  const { investorId, contactId } = useParams<{ investorId: string; contactId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: contact, isLoading } = useContact(Number(investorId), Number(contactId));
  const { data: documents } = useContactDocuments(Number(investorId), Number(contactId));
  const deleteMutation = useDeleteContact();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({
        investorId: Number(investorId),
        contactId: Number(contactId),
      });
      toast({
        title: '✅ Контакт удалён',
        description: 'Клиент удалён из базы',
      });
      navigate(`/investors/${investorId}/contacts`);
    } catch (error: any) {
      toast({
        title: '❌ Ошибка',
        description: error.response?.data?.message || 'Не удалось удалить контакт',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('ru-RU');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon name="Loader2" className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Контакт не найден</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button
        variant="ghost"
        onClick={() => navigate(`/investors/${investorId}/contacts`)}
        className="mb-4"
      >
        <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
        Назад к списку
      </Button>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {contact.lastName} {contact.firstName} {contact.middleName}
          </h1>
          <p className="text-gray-500">ID: {contact.id}</p>
        </div>
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Icon name="Trash2" className="mr-2 h-4 w-4" />
                Удалить
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Удалить контакт?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие нельзя отменить. Контакт и все его документы будут удалены навсегда.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Удалить</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Информация</TabsTrigger>
          <TabsTrigger value="documents">Документы ({documents?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Личные данные</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Дата рождения</p>
                  <p className="font-medium">{formatDate(contact.birthDate)}</p>
                </div>
                {contact.birthPlace && (
                  <div>
                    <p className="text-sm text-gray-500">Место рождения</p>
                    <p className="font-medium">{contact.birthPlace}</p>
                  </div>
                )}
                {contact.snils && (
                  <div>
                    <p className="text-sm text-gray-500">СНИЛС</p>
                    <p className="font-medium">{contact.snils}</p>
                  </div>
                )}
                {contact.inn && (
                  <div>
                    <p className="text-sm text-gray-500">ИНН</p>
                    <p className="font-medium">{contact.inn}</p>
                  </div>
                )}
                {contact.phone && (
                  <div>
                    <p className="text-sm text-gray-500">Телефон</p>
                    <p className="font-medium">{contact.phone}</p>
                  </div>
                )}
                {contact.email && (
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{contact.email}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-500">Адрес регистрации</p>
                <p className="font-medium">{contact.registrationAddress}</p>
              </div>

              {contact.residentialAddress && (
                <div>
                  <p className="text-sm text-gray-500">Адрес проживания</p>
                  <p className="font-medium">{contact.residentialAddress}</p>
                </div>
              )}

              {contact.notes && (
                <div>
                  <p className="text-sm text-gray-500">Заметки</p>
                  <p className="font-medium">{contact.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Документы</CardTitle>
                <Button size="sm">
                  <Icon name="Plus" className="mr-2 h-4 w-4" />
                  Добавить документ
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {documents && documents.length > 0 ? (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-semibold">{DocumentTypeLabels[doc.type]}</p>
                            {doc.isMain && (
                              <Badge variant="secondary" className="text-xs">
                                Основной
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Серия: {doc.series} • Номер: {doc.number}
                          </p>
                          <p className="text-sm text-gray-600">Выдан: {doc.issuedBy}</p>
                          <p className="text-sm text-gray-600">
                            Дата выдачи: {formatDate(doc.issueDate)}
                          </p>
                        </div>
                        <Icon name="FileText" className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="FileText" className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500">Нет документов</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
