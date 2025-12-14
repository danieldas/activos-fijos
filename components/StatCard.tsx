import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  borderColorClass: string;
  subtext?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, borderColorClass, subtext }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${borderColorClass} flex items-start justify-between`}>
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        {subtext && <div className="mt-2">{subtext}</div>}
      </div>
      <div className="p-3 bg-gray-50 rounded-full">
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  );
};