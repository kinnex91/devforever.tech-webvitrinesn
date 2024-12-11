import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  LightBulbIcon,
  UserGroupIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const values = [
  {
    name: 'Innovation',
    description: 'about.values.innovation',
    icon: LightBulbIcon,
  },
  {
    name: 'Collaboration',
    description: 'about.values.collaboration',
    icon: UserGroupIcon,
  },
  {
    name: 'Excellence',
    description: 'about.values.excellence',
    icon: SparklesIcon,
  },
  {
    name: 'Integrity',
    description: 'about.values.integrity',
    icon: ShieldCheckIcon,
  },
];

export default function Values() {
  const { t } = useTranslation();

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            {t('about.values.subtitle')}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('about.values.title')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('about.values.description')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.name}
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <value.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  {value.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{t(value.description)}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}