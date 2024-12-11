import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden">
      <Container className="relative pt-20 pb-16 text-center lg:pt-32">
        <motion.h1
          className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
 
          <span className="relative whitespace-nowrap text-primary-600">
            <span className="relative">{t('home.hero.highlight')}</span>
          </span>{' '}
          {t('home.hero.titleEnd')}
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('home.hero.description')}
        </motion.p>
        <motion.div
          className="mt-10 flex justify-center gap-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/services">
            <Button size="lg">{t('home.cta.services')}</Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline">
              {t('home.cta.contact')}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}