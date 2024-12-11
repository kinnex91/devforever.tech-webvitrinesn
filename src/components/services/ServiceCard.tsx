import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  index: number;
}

export default function ServiceCard({ title, description, icon: Icon, href, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div>
        <span className="rounded-lg inline-flex p-3 bg-primary-50 text-primary-700 ring-4 ring-white">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium">
          <Link to={href} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
      <span
        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-primary-400 transition-colors"
        aria-hidden="true"
      >
        <ArrowRightIcon className="h-6 w-6" />
      </span>
    </motion.div>
  );
}