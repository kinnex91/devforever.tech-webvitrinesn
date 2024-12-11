import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            {t('contact.title')}
          </motion.h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </Container>
    </div>
  );
}