import { useTranslation } from 'react-i18next';
import ProjectTypeSelector from './ProjectTypeSelector';
import DateSelector from './DateSelector';
import FormulaDisplay from './FormulaDisplay';
import { formatCurrency } from '../../utils/currency';

interface FormData {
  specPages: number;
  quotePages: number;
  precisionCoef: number;
  complexity: number;
  region: 'France' | 'US';
  endDate: Date | null;
}

interface PriceDetails {
  hourlyRate: number;
  estimatedHours: number;
  components: {
    specPages: number;
    quotePages: number;
    basePrice: number;
  };
  formulas: {
    baseHourlyRate: number;
    quotePagesFormula: string;
    estimatedHoursFormula: string;
    basePriceFormula: string;
    projectRangeFormula: string;
    urgencyMultiplier: number;
  };
  total: number;
  projectEstimate: {
    min: number;
    max: number;
  };
}

interface PricingCalculatorProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: any) => void;
  priceDetails: PriceDetails;
  maxSpecPages: number;
  onMaxSpecPagesChange: (maxPages: number) => void;
}

export default function PricingCalculator({
  formData,
  onInputChange,
  priceDetails,
  maxSpecPages,
  onMaxSpecPagesChange,
}: PricingCalculatorProps) {
  const { t } = useTranslation();

  const getQuoteFormula = () => ({
    variables: `specPages = ${formData.specPages}
complexity = ${formData.complexity}
baseHourlyRate = ${priceDetails.formulas.baseHourlyRate}€
urgencyMultiplier = ${priceDetails.formulas.urgencyMultiplier.toFixed(2)}
hourlyRate = ${priceDetails.hourlyRate}€
estimatedHours = ${priceDetails.estimatedHours}`,
    calculation: `basePrice = estimatedHours × hourlyRate
${priceDetails.estimatedHours} × ${priceDetails.hourlyRate}`,
    result: formatCurrency(priceDetails.components.basePrice, formData.region),
  });

  const getProjectRangeFormula = () => ({
    variables: `quoteEstimation = ${formatCurrency(priceDetails.total, formData.region)}
minMultiplier = 2
maxMultiplier = 4`,
    calculation: `range = [quoteEstimation × minMultiplier, quoteEstimation × maxMultiplier]
[${priceDetails.total} × 2, ${priceDetails.total} × 4]`,
    result: `${formatCurrency(
      priceDetails.projectEstimate.min,
      formData.region
    )} - ${formatCurrency(priceDetails.projectEstimate.max, formData.region)}`,
  });

  return (
    <div className="space-y-8">
      <ProjectTypeSelector
        value={formData.complexity}
        onChange={(value) => onInputChange('complexity', value)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('pricing.calculator.specPages')}
          </label>
          <input
            type="number"
            min="0"
            max={maxSpecPages}
            value={formData.specPages}
            onChange={(e) => onInputChange('specPages', parseInt(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          {maxSpecPages !== Infinity && (
            <p className="mt-1 text-sm text-gray-500">
              Maximum: {maxSpecPages} pages based on selected deadline
            </p>
          )}
        </div>

        <DateSelector
          estimatedHours={priceDetails.estimatedHours}
          selectedDate={formData.endDate ?? new Date()} // Use fallback if null
          onChange={(date) => onInputChange('endDate', date ?? new Date())} // Use fallback if null
          region={formData.region}
          maxSpecPages={maxSpecPages}
          onMaxSpecPagesChange={onMaxSpecPagesChange}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormulaDisplay
          title="Standard Quote Estimation"
          formula={getQuoteFormula()}
          parameters={[
            { label: 'Specification Pages', value: priceDetails.components.specPages },
            { label: 'Quote Pages', value: priceDetails.components.quotePages },
            { label: 'Base Hourly Rate', value: formatCurrency(priceDetails.formulas.baseHourlyRate, formData.region) },
            { label: 'Urgency Multiplier', value: `${priceDetails.formulas.urgencyMultiplier.toFixed(2)}x` },
            { label: 'Final Hourly Rate', value: formatCurrency(priceDetails.hourlyRate, formData.region) },
            { label: 'Estimated Hours', value: `${priceDetails.estimatedHours}h` },
          ]}
        />

        <FormulaDisplay
          title="Project Cost Range"
          formula={getProjectRangeFormula()}
          parameters={[
            { label: 'Base Quote', value: formatCurrency(priceDetails.total, formData.region) },
            { label: 'Min Multiplier', value: '2x' },
            { label: 'Max Multiplier', value: '4x' },
          ]}
          projectTimeline={{
            endDate: formData.endDate ?? new Date(), // Use fallback if null
            estimatedHours: priceDetails.estimatedHours,
            projectCost: priceDetails.projectEstimate,
          }}
        />
      </div>

      {priceDetails.formulas.urgencyMultiplier > 1 && (
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600">
            Urgency Fee: +{Math.round((priceDetails.formulas.urgencyMultiplier - 1) * 100)}%
          </p>
        </div>
      )}
    </div>
  );
}
