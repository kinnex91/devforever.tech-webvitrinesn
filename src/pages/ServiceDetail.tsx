import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
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

type ServiceKey = typeof serviceKeys[number];

interface ServiceSection {
  title: string;
  items: string[];
  color: string;
}

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t } = useTranslation();

  if (!serviceId || !serviceKeys.includes(serviceId as ServiceKey)) {
    return <Navigate to="/services" replace />;
  }

  const Icon = serviceIcons[serviceId as ServiceKey];

  const getSectionItems = (key: string): string[] => {
    try {
      const items = t(`services.${serviceId}.${key}`, { returnObjects: true });
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  };

  const sections: ServiceSection[] = [
    {
      title: 'Features',
      items: getSectionItems('features'),
      color: 'primary',
    },
    {
      title: 'Benefits',
      items: getSectionItems('benefits'),
      color: 'success',
    },
    {
      title: 'Resources',
      items: getSectionItems('resources'),
      color: 'info',
    },
    {
      title: 'Technologies',
      items: getSectionItems('technologies'),
      color: 'warning',
    },
    {
      title: 'Software Tools',
      items: getSectionItems('software'),
      color: 'danger',
    },
  ];

  return (
    <div className="bg-gray-10 py-8 sm:py-2">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary-100">
            <Icon className="h-8 w-8 text-primary-600" aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t(`services.${serviceId}.title`)}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t(`services.${serviceId}.description`)}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {sections.map((section, sectionIndex) => (
            section.items.length > 0 && (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                <ul className="space-y-4">
                  {section.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="ml-4 text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          ))}
        </div>
      </Container>
    </div>
  );
}