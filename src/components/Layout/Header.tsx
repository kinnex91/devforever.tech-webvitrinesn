import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, HomeIcon, BriefcaseIcon, PhoneIcon, InformationCircleIcon, TagIcon } from '@heroicons/react/24/outline';
import Logo from '../Logo';

const navigation = [
  { name: 'navigation.home', href: '/', icon: HomeIcon },
  { name: 'navigation.services', href: '/services', icon: BriefcaseIcon },
  { name: 'navigation.about', href: '/about', icon: InformationCircleIcon },
  { name: 'navigation.contact', href: '/contact', icon: PhoneIcon },
  { name: 'navigation.pricing', href: '/pricing', icon: TagIcon },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  return (
    <>
    <header className="bg-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <Logo className="h-16 w-auto max-w-[250px]" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-x-6">
          {navigation.map((item, index) => (
            <div key={item.name} className="flex items-center space-x-2">
              {index > 0 && <div className="h-6 border-l border-gray-300 mx-4" />} {/* Barre de séparation */}
              <Link
                to={item.href}
                className="flex items-center space-x-2 text-lg font-semibold leading-6 text-gray-900 hover:text-primary-600"
              >
                <item.icon className="h-6 w-6 text-primary-500" aria-hidden="true" />
                <span>{t(item.name)}</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={toggleLanguage}
            className="text-lg font-semibold leading-6 text-gray-900 hover:text-primary-600"
          >
            {i18n.language === 'en' ? 'FR' : 'EN'}
          </button>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <Logo className="h-10 w-auto" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-4 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 flex items-center space-x-3 rounded-lg px-3 py-2 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-6 w-6 text-primary-500" aria-hidden="true" />
                    <span>{t(item.name)}</span>
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <button
                  onClick={() => {
                    toggleLanguage();
                    setMobileMenuOpen(false);
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {i18n.language === 'en' ? 'Français' : 'English'}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
    </>
  );
}
