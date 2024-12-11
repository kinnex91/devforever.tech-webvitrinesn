import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const stats = [
  { id: 1, name: 'Years of Experience', value: '15+' },
  { id: 2, name: 'Successful Projects', value: '500+' },
  { id: 3, name: 'Global Clients', value: '200+' },
  { id: 4, name: 'Team Members', value: '50+' },
];

export default function Stats() {
  const { t } = useTranslation();

  return (
    <div className="bg-primary-600 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('about.stats.title')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-primary-100">
              {t('about.stats.description')}
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                className="flex flex-col bg-white/5 p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.id * 0.1 }}
              >
                <dt className="text-sm font-semibold leading-6 text-primary-100">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">{stat.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}