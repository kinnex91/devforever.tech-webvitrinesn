import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { differenceInBusinessDays } from 'date-fns';
import Container from '../components/ui/Container';
import PricingCalculator from '../components/pricing/PricingCalculator';

interface FormData {
  specPages: number;
  quotePages: number;
  precisionCoef: number;
  complexity: number;
  region: 'France' | 'US';
  endDate: Date | null;
}

export default function Pricing() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    specPages: 0,
    quotePages: 0,
    precisionCoef: 1,
    complexity: 1,
    region: 'France',
    endDate: null,
  });
  const [maxSpecPages, setMaxSpecPages] = useState<number>(Infinity);

  const handleInputChange = (field: keyof FormData, value: any) => {
    if (field === 'specPages' && value > maxSpecPages) {
      value = maxSpecPages;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePriceDetails = () => {
    const baseHourlyRate = formData.complexity === 1 ? 100 : formData.complexity === 3 ? 300 : 1000;
    const estimatedHours = Math.ceil(formData.specPages * formData.complexity * 2);
    
    // Calculate urgency multiplier based on business days
    let urgencyMultiplier = 1;
    if (formData.endDate) {
      const businessDays = differenceInBusinessDays(formData.endDate, new Date());
      const minRequiredDays = Math.ceil(estimatedHours / 7);
      const daysRatio = businessDays / minRequiredDays;
      
      // Start increasing urgency fee when less than 2x the minimum required days
      if (daysRatio < 2) {
        urgencyMultiplier = Math.max(1, 3 - daysRatio);
      }
    }

    const hourlyRate = Math.round(baseHourlyRate * urgencyMultiplier);
    const quotePages = Math.ceil(Math.min(
      formData.specPages * 1.5,
      Math.sqrt(estimatedHours * 2)
    ));
    
    const basePrice = estimatedHours * hourlyRate;
    const total = Math.ceil(basePrice);
    const projectMin = Math.max(total * 2, basePrice * 2);
    const projectMax = projectMin * 2;

    return {
      hourlyRate,
      estimatedHours,
      components: {
        specPages: formData.specPages,
        quotePages,
        basePrice,
      },
      formulas: {
        baseHourlyRate,
        quotePagesFormula: `min(specPages × 1.5, √(estimatedHours × 2))`,
        estimatedHoursFormula: `${formData.specPages} × ${formData.complexity} × 2`,
        basePriceFormula: `${estimatedHours}h × ${hourlyRate}€`,
        projectRangeFormula: `${total}€ × [2 - 4]`,
        urgencyMultiplier,
      },
      total,
      projectEstimate: {
        min: projectMin,
        max: projectMax,
      },
    };
  };

  const priceDetails = calculatePriceDetails();

  return (
    <div className="bg-gray-10 py-8 sm:py-2">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('pricing.title')}
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {t('pricing.description')}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <PricingCalculator
              formData={formData}
              onInputChange={handleInputChange}
              priceDetails={priceDetails}
              maxSpecPages={maxSpecPages}
              onMaxSpecPagesChange={setMaxSpecPages}
            />
          </div>
        </motion.div>
      </Container>
    </div>
  );
}