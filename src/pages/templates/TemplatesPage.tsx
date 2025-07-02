import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import TemplateSidebar from '../../components/templates/TemplateSidebar';
import TemplatePreviewCard from '../../components/templates/TemplatePreviewCard';

const TemplatesPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('Regular Payslips');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close cards when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelectedCard(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Templates Section */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Templates</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" ref={containerRef}>
            {/* Left Sidebar */}
            <TemplateSidebar activeTemplate={activeTemplate} onSelect={setActiveTemplate} />

            {/* Right Section - Template Previews */}
            <div className="md:col-span-2 h-125 bg-gray-100 rounded-lg p-6 flex justify-around">
              <TemplatePreviewCard
                id={1}
                title="Standard Template"
                isDefault
                isSelected={selectedCard === 1}
                onSelect={() => setSelectedCard(1)}
              />
              <TemplatePreviewCard
                id={2}
                title="Simplified Template"
                isSelected={selectedCard === 2}
                onSelect={() => setSelectedCard(2)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;

