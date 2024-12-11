import { motion } from 'framer-motion';
import { addBusinessDays, format } from 'date-fns';

interface Parameter {
  label: string;
  value: string | number;
  description?: string;
}

interface ProjectTimeline {
  endDate: Date;
  estimatedHours: number;
  projectCost: {
    min: number;
    max: number;
  };
}

interface FormulaDisplayProps {
  title: string;
  formula: {
    variables: string;
    calculation: string;
    result: string;
  };
  parameters?: Parameter[];
  className?: string;
  projectTimeline?: ProjectTimeline;
}

const DAILY_RATE = 1050; // euros per day

export default function FormulaDisplay({ 
  title, 
  formula, 
  parameters = [], 
  className = '',
  projectTimeline 
}: FormulaDisplayProps) {
  const calculateProjectDates = () => {
    if (!projectTimeline?.endDate) return null;

    const quoteEndDate = addBusinessDays(new Date(), 14); // Quote delivery: current date + 2 weeks
    const minWorkDays = Math.ceil((projectTimeline.projectCost?.min || 0) / DAILY_RATE);
    const maxWorkDays = Math.ceil((projectTimeline.projectCost?.max || 0) / DAILY_RATE);
    
    return {
      quoteEndDate,
      projectStartDate: addBusinessDays(quoteEndDate, 5), // Project starts 1 week after quote
      minEndDate: addBusinessDays(quoteEndDate, minWorkDays + 5),
      maxEndDate: addBusinessDays(quoteEndDate, maxWorkDays + 5),
    };
  };

  const projectDates = calculateProjectDates();

  const allParameters = [
    ...parameters,
    ...(projectDates ? [
      { 
        label: 'Quote Delivery Date',
        value: format(projectDates.quoteEndDate, 'dd/MM/yyyy')
      },
      {
        label: 'Project Start Date',
        value: format(projectDates.projectStartDate, 'dd/MM/yyyy')
      },
      {
        label: 'Project Duration',
        value: `${Math.ceil((projectTimeline?.projectCost?.min || 0) / DAILY_RATE)} - ${Math.ceil((projectTimeline?.projectCost?.max || 0) / DAILY_RATE)} working days`
      },
      {
        label: 'Project End Date Range',
        value: `${format(projectDates.minEndDate, 'dd/MM/yyyy')} - ${format(projectDates.maxEndDate, 'dd/MM/yyyy')}`
      }
    ] : [])
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-sm p-4 ${className}`}
    >
      <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
      
      <div className="space-y-2">
        {/* Variables */}
        <div className="bg-gray-50 p-2 rounded text-sm font-mono">
          <div className="text-primary-600">{formula.variables}</div>
        </div>
        
        {/* Calculation */}
        <div className="bg-gray-50 p-2 rounded text-sm font-mono">
          <div className="text-primary-800">{formula.calculation}</div>
        </div>
        
        {/* Result */}
        <div className="bg-primary-50 p-2 rounded text-sm font-mono">
          <div className="text-primary-700">= {formula.result}</div>
        </div>

        {/* Parameters */}
        {allParameters.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <h4 className="text-xs font-medium text-gray-500 mb-2">Parameters Used:</h4>
            <div className="space-y-1">
              {allParameters.map((param, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{param.label}:</span>
                  <span className="font-medium text-gray-900">{param.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SVG Visualization */}
        <div className="mt-3">
          <h4 className="text-xs font-medium text-gray-500 mb-2">Visual Representation:</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 100"
            width="100%"
            height="100"
            className="bg-gray-50 rounded p-2"
          >
            {/* Coordinate Axes */}
            <line x1="10" y1="90" x2="190" y2="90" stroke="black" strokeWidth="1" />
            <line x1="10" y1="90" x2="10" y2="10" stroke="black" strokeWidth="1" />
            
            {/* Formulas */}
            <text x="20" y="40" fontSize="10" fill="blue">
              {formula.variables}
            </text>
            <text x="20" y="60" fontSize="10" fill="green">
              {formula.calculation}
            </text>
            <text x="20" y="80" fontSize="10" fill="red">
              {formula.result}
            </text>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
