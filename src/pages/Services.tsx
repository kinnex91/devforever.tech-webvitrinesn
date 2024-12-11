import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import ServiceCard from '../components/services/ServiceCard';
import { serviceIcons } from '../components/services/ServiceIcons';

const serviceKeys = [
  'infrastructure',
  'cloud',
  'database',
  'middleware',
  'etl',
  'web',
  'tma',
  'software',
  'technology',
] as const;

export default function Services() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-10 py-8 sm:py-2">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg leading-8 text-gray-600"
          >
            Comprehensive IT solutions tailored to your business needs
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((key, index) => (
            <ServiceCard
              key={key}
              title={t(`services.${key}.title`)}
              description={t(`services.${key}.description`)}
              icon={serviceIcons[key]}
              href={`/services/${key}`}
              index={index}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}