import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from '../icons';
import { motion } from 'framer-motion';

const contactDetails = [
  {
    name: 'Paris Office (Comming Soon)' ,
    address: ['Avenue Kléber', '75116 Paris, France'],
    phone: '+33 1 23 45 67 89',
    email: 'contact@devforever.tech',
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl bg-gray-50 p-10"
    >
      <h3 className="text-lg font-semibold leading-7 text-gray-900">Our Office</h3>

      {contactDetails.map((office) => (
        <div key={office.name} className="mt-6">
          <div className="flex gap-x-4">
            <BuildingOffice2Icon className="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold leading-6 text-gray-900">{office.name}</p>
              {office.address.map((line) => (
                <p key={line} className="mt-1 text-sm leading-6 text-gray-600">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-x-4">
            <PhoneIcon className="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
            <div className="text-sm leading-6 text-gray-600">
              <p>{office.phone}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-x-4">
            <EnvelopeIcon className="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
            <div className="text-sm leading-6 text-gray-600">
              <p>{office.email}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-8">
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2144493726373!2d2.2895921!3d48.8689751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fec746d386f%3A0x3c87e6c8ba5e1571!2s16%20Avenue%20Kl%C3%A9ber%2C%2075116%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1709901234567!5m2!1sen!2sus"
          className="w-full h-64 rounded-lg"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </motion.div>
  );
}