import React from 'react';
import {
  Link,
  GitFork,
  Repeat,
  Compass,
  Link2Off,
  SearchCheck,
  Eye,
  Share2,
  FileCode2,
  Map,
  CheckCircle2,
  Bot,
  BookmarkCheck,
  HelpCircle,
  BarChart2,
  Sparkles,
  Layers,
  FileText,
  BookOpen,
  Code,
  Image,
  Sliders,
  ArrowLeftRight,
  Hash,
  Wrench
} from 'lucide-react';

interface ToolIconProps {
  name: string;
  className?: string;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Link,
  GitFork,
  Repeat,
  Compass,
  Link2Off,
  SearchCheck,
  Eye,
  Share2,
  FileCode2,
  Map,
  CheckCircle2,
  Bot,
  BookmarkCheck,
  HelpCircle,
  BarChart2,
  Sparkles,
  Layers,
  FileText,
  BookOpen,
  Code,
  Image,
  Sliders,
  ArrowLeftRight,
  Hash,
  Wrench
};

export const ToolIcon: React.FC<ToolIconProps> = ({ name, className = 'w-5 h-5' }) => {
  const IconComponent = iconMap[name] || Wrench;
  return <IconComponent className={className} />;
};
