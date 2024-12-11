import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Container from '../components/ui/Container';
import Stats from '../components/about/Stats';
import Values from '../components/about/Values';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <Container>
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
            <motion.div
              className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {t('about.hero.title')}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {t('about.hero.description')}
              </p>
            </motion.div>
            <motion.div
              className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Team collaboration"
                  className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
      <Stats />
      <Values />
    </div>
  );
}