import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useContacts } from '@/hooks/useContacts';
import Icon from '@/components/ui/icon';

export const ContactsList = () => {
  const { investorId } = useParams<{ investorId: string }>();
  const { data: contacts, isLoading } = useContacts(Number(investorId));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Icon name="Loader2" className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Контакты</h1>
          <p className="text-gray-500">Клиентская база инвестора</p>
        </div>
        <Link to={`/investors/${investorId}/contacts/new`}>
          <Button>
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            Добавить контакт
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contacts?.map((contact) => (
          <Link key={contact.id} to={`/investors/${investorId}/contacts/${contact.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Icon name="User" className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {contact.lastName} {contact.firstName}
                    </h3>
                    {contact.middleName && (
                      <p className="text-sm text-gray-500">{contact.middleName}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {contact.phone && (
                  <p className="text-sm text-gray-600 mb-1">
                    <Icon name="Phone" className="inline h-3 w-3 mr-1" />
                    {contact.phone}
                  </p>
                )}
                {contact.email && (
                  <p className="text-sm text-gray-600">
                    <Icon name="Mail" className="inline h-3 w-3 mr-1" />
                    {contact.email}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {contacts?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg">Нет контактов</p>
          <Link to={`/investors/${investorId}/contacts/new`}>
            <Button className="mt-4">Добавить первый контакт</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
