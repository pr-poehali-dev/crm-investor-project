import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddClientDialog = ({ open, onOpenChange }: AddClientDialogProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    passportSeries: '',
    passportNumber: '',
    passportIssueDate: '',
    guarantorName: '',
    guarantorPhone: '',
  });
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Клиент добавлен",
      description: `${formData.fullName} успешно добавлен в базу`,
    });
    onOpenChange(false);
    setFormData({
      fullName: '',
      passportSeries: '',
      passportNumber: '',
      passportIssueDate: '',
      guarantorName: '',
      guarantorPhone: '',
    });
    setPassportPhoto(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPassportPhoto(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Icon name="UserPlus" size={24} className="mr-2 text-primary" />
            Добавить клиента
          </DialogTitle>
          <DialogDescription>Заполните данные нового клиента</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">ФИО клиента *</Label>
              <Input
                id="fullName"
                placeholder="Иванов Иван Иванович"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passportSeries">Серия паспорта *</Label>
                <Input
                  id="passportSeries"
                  placeholder="1234"
                  maxLength={4}
                  value={formData.passportSeries}
                  onChange={(e) => setFormData({ ...formData, passportSeries: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Номер паспорта *</Label>
                <Input
                  id="passportNumber"
                  placeholder="567890"
                  maxLength={6}
                  value={formData.passportNumber}
                  onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passportIssueDate">Дата выдачи паспорта *</Label>
              <Input
                id="passportIssueDate"
                type="date"
                value={formData.passportIssueDate}
                onChange={(e) => setFormData({ ...formData, passportIssueDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passportPhoto">Фото паспорта</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="passportPhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                {passportPhoto && (
                  <div className="flex items-center text-sm text-primary">
                    <Icon name="CheckCircle2" size={16} className="mr-1" />
                    Загружено
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <Icon name="Users" size={20} className="mr-2 text-primary" />
              Данные поручителя
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guarantorName">ФИО поручителя *</Label>
                <Input
                  id="guarantorName"
                  placeholder="Петров Петр Петрович"
                  value={formData.guarantorName}
                  onChange={(e) => setFormData({ ...formData, guarantorName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guarantorPhone">Телефон поручителя *</Label>
                <Input
                  id="guarantorPhone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.guarantorPhone}
                  onChange={(e) => setFormData({ ...formData, guarantorPhone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit">
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
