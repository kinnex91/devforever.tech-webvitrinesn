import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import {  HomeIcon, BriefcaseIcon, PhoneIcon, InformationCircleIcon, TagIcon } from '@heroicons/react/24/outline';


const navigation = {
  main: [
    { name: 'navigation.home', href: '/', icon: HomeIcon },
    { name: 'navigation.services', href: '/services', icon: BriefcaseIcon },
    { name: 'navigation.about', href: '/about', icon: InformationCircleIcon },
    { name: 'navigation.contact', href: '/contact', icon: PhoneIcon },
    { name: 'navigation.pricing', href: '/pricing', icon: TagIcon },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <Container>
        <div className="py-12 md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:justify-start">

          </div>
        </div>
        <div className="border-t border-gray-300 py-8">
          <nav className="flex flex-wrap justify-center gap-6">
            {navigation.main.map((item, index) => (
              <div key={item.name} className="flex items-center">
                {index > 0 && <div className="h-6 border-l border-gray-300 mx-4" />} {/* Barre de séparation */}
                <Link
                  to={item.href}
                  className="flex items-center space-x-2 text-lg font-semibold leading-6 text-gray-700 hover:text-primary-600"
                >
                  <item.icon className="h-6 w-6 text-primary-500" aria-hidden="true" />
                  <span>{t(item.name)}</span>
                </Link>
              </div>
            ))}

            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-primary-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-8 w-8" aria-hidden="true" />
              </a>
            ))}
          </nav>
          <p
            className="mt-8 text-center text-base text-gray-500"
            style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}
          >
            &copy; {currentYear} DevForever.tech® Tous droits réservés.
          </p>

        </div>
      </Container>
    </footer>
  );
}
