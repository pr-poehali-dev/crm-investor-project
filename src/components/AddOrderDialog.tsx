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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  'Электроника',
  'Бытовая техника',
  'Мебель',
  'Автомобили',
  'Строительные материалы',
  'Другое',
];

const installmentPeriods = [
  { value: '6', label: '6 месяцев' },
  { value: '7', label: '7 месяцев' },
  { value: '8', label: '8 месяцев' },
  { value: '9', label: '9 месяцев' },
  { value: '10', label: '10 месяцев' },
  { value: '11', label: '11 месяцев' },
  { value: '12', label: '12 месяцев' },
];

export const AddOrderDialog = ({ open, onOpenChange }: AddOrderDialogProps) => {
  const [formData, setFormData] = useState({
    clientName: '',
    category: '',
    productName: '',
    costPrice: '',
    installmentPeriod: '',
    downPayment: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalAmount = parseFloat(formData.costPrice);
    const downPayment = parseFloat(formData.downPayment);
    const monthlyPayment = ((totalAmount - downPayment) / parseInt(formData.installmentPeriod)).toFixed(2);

    toast({
      title: "Заказ оформлен",
      description: `Ежемесячный платеж: ${monthlyPayment} ₽`,
    });
    
    onOpenChange(false);
    setFormData({
      clientName: '',
      category: '',
      productName: '',
      costPrice: '',
      installmentPeriod: '',
      downPayment: '',
    });
  };

  const calculateMonthlyPayment = () => {
    const total = parseFloat(formData.costPrice) || 0;
    const down = parseFloat(formData.downPayment) || 0;
    const period = parseInt(formData.installmentPeriod) || 1;
    return ((total - down) / period).toFixed(2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Icon name="ShoppingCart" size={24} className="mr-2 text-primary" />
            Оформить заказ
          </DialogTitle>
          <DialogDescription>Заполните данные для оформления рассрочки</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Клиент *</Label>
              <Input
                id="clientName"
                placeholder="Выберите или введите имя клиента"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Категория товара *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productName">Наименование товара *</Label>
              <Input
                id="productName"
                placeholder="Например: iPhone 15 Pro 256GB"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="costPrice">Сумма (себестоимость) *</Label>
                <div className="relative">
                  <Input
                    id="costPrice"
                    type="number"
                    placeholder="75000"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                    required
                    min="0"
                    step="1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ₽
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Первоначальный взнос *</Label>
                <div className="relative">
                  <Input
                    id="downPayment"
                    type="number"
                    placeholder="15000"
                    value={formData.downPayment}
                    onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
                    required
                    min="0"
                    step="1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ₽
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="installmentPeriod">Период рассрочки *</Label>
              <Select
                value={formData.installmentPeriod}
                onValueChange={(value) => setFormData({ ...formData, installmentPeriod: value })}
              >
                <SelectTrigger id="installmentPeriod">
                  <SelectValue placeholder="Выберите период" />
                </SelectTrigger>
                <SelectContent>
                  {installmentPeriods.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.costPrice && formData.downPayment && formData.installmentPeriod && (
              <div className="bg-accent rounded-lg p-4 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon name="Calculator" size={20} className="mr-2 text-primary" />
                    <span className="font-medium">Ежемесячный платеж:</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">
                    {calculateMonthlyPayment()} ₽
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit">
              <Icon name="CheckCircle2" size={18} className="mr-2" />
              Оформить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
