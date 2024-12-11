import { useTranslation } from 'react-i18next';

interface ProjectType {
  id: string;
  name: string;
  complexity: 1 | 3 | 10;
  examples: string[];
}

const projectTypes: ProjectType[] = [
  {
    id: 'simple',
    name: 'Simple Projects',
    complexity: 1,
    examples: [
      'Static Websites (1-5 pages)',
      'Basic Landing Pages',
      'Simple WordPress Themes',
      'Basic API Integration',
      'Simple Database CRUD Operations'
    ]
  },
  {
    id: 'medium',
    name: 'Medium Complexity',
    complexity: 3,
    examples: [
      'E-commerce Platforms',
      'Custom CMS Development',
      'Complex API Development',
      'Mobile Applications',
      'Data Migration Projects',
      'Business Intelligence Dashboards'
    ]
  },
  {
    id: 'complex',
    name: 'High Complexity',
    complexity: 10,
    examples: [
      'AI/ML Solutions',
      'Enterprise Resource Planning (ERP)',
      'Cybersecurity Systems',
      'Blockchain Applications',
      'IoT Platforms',
      'Real-time Processing Systems',
      'Cloud Infrastructure Migration'
    ]
  }
];

interface ProjectTypeSelectorProps {
  value: number;
  onChange: (complexity: number) => void;
}

export default function ProjectTypeSelector({ value, onChange }: ProjectTypeSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {t('pricing.calculator.projectType')}
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        {projectTypes.map((type) => (
          <div
            key={type.id}
            className={`cursor-pointer rounded-lg border p-4 transition-colors ${
              value === type.complexity
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            }`}
            onClick={() => onChange(type.complexity)}
          >
            <h3 className="text-sm font-medium text-gray-900">{type.name}</h3>
            <p className="mt-1 text-xs text-gray-500">
              Complexity Factor: x{type.complexity}
            </p>
            <ul className="mt-2 space-y-1">
              {type.examples.map((example, index) => (
                <li key={index} className="text-xs text-gray-600">
                  • {example}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}