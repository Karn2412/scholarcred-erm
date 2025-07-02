import React from 'react';

interface TemplateSidebarProps {
  activeTemplate: string;
  onSelect: (template: string) => void;
}

const templates = [
  'Regular Payslips',
  'Final Settlement Payslip',
  'Salary Certificate',
  'Salary Revision Letter',
  'Bonus Letter',
];

const TemplateSidebar: React.FC<TemplateSidebarProps> = ({ activeTemplate, onSelect }) => {
  return (
    <div className="bg-blue-50 rounded-lg p-1 h-70 shadow-sm">
      {templates.map((template) => (
        <button
          key={template}
          onClick={() => onSelect(template)}
          className={`w-full text-left px-3 py-2 rounded ${
            activeTemplate === template ? 'bg-white font-semibold' : 'hover:bg-gray-200'
          }`}
        >
          {template}
        </button>
      ))}
    </div>
  );
};

export default TemplateSidebar;
