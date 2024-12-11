import { useTranslation } from 'react-i18next';
import { addDays, differenceInBusinessDays, format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

interface DateSelectorProps {
  estimatedHours: number;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  region: 'France' | 'US';
  maxSpecPages: number;
  onMaxSpecPagesChange: (maxPages: number) => void;
}

const HOURS_PER_DAY = 7;

export default function DateSelector({ 
  estimatedHours, 
  selectedDate, 
  onChange, 
  region,
  maxSpecPages,
  onMaxSpecPagesChange 
}: DateSelectorProps) {
  const { t } = useTranslation();
  const locale = region === 'France' ? fr : enUS;

  const minDate = new Date();
  const minRequiredDays = Math.ceil(estimatedHours / HOURS_PER_DAY);
  const earliestPossibleDate = addDays(minDate, minRequiredDays);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    
    if (date) {
      const businessDays = differenceInBusinessDays(date, minDate);
      const maxHoursAvailable = businessDays * HOURS_PER_DAY;
      const newMaxSpecPages = Math.floor(maxHoursAvailable / 2); // 2 hours per spec page

      if (businessDays < minRequiredDays) {
        alert(t('pricing.calculator.dateError', { 
          days: minRequiredDays,
          hours: estimatedHours 
        }));
        return;
      }

      onMaxSpecPagesChange(newMaxSpecPages);
    }
    
    onChange(date);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {t('pricing.calculator.endDate')}
      </label>
      <input
        type="date"
        min={format(earliestPossibleDate, 'yyyy-MM-dd')}
        value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
        onChange={handleDateChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      />
      {selectedDate && (
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-500">
            {t('pricing.calculator.workDays', {
              days: differenceInBusinessDays(selectedDate, minDate),
              locale
            })}
          </p>
          <p className="text-sm text-gray-500">
            Maximum spec pages allowed: {maxSpecPages}
          </p>
        </div>
      )}
    </div>
  );
}