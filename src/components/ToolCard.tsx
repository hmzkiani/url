import React from 'react';
import { Link } from 'react-router-dom';
import { ToolItem } from '../types';
import { ToolIcon } from './ToolIcon';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  tool: ToolItem;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link
      to={tool.path}
      className="group relative flex flex-col justify-between p-6 bg-white dark:bg-[#151E19] rounded-2xl border border-stone-200/80 dark:border-stone-800/90 shadow-xs hover:shadow-md hover:border-emerald-500/60 dark:hover:border-emerald-600/60 hover:-transtone-y-0.5 transition-all duration-200"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 group-hover:scale-105 transition-transform">
            <ToolIcon name={tool.iconName} className="w-6 h-6" />
          </div>
          {tool.badge && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
              {tool.badge}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
          {tool.name}
        </h3>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400">
        <span className="text-stone-400 dark:text-stone-500">{tool.categoryName}</span>
        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold group-hover:transtone-x-0.5 transition-transform">
          Open Tool
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};
