import React from 'react';
import {
  Eye,
  Activity,
  Shield,
  Baby,
  Droplets,
  Layers,
  Pill,
  Stethoscope,
  Flame,
  Target,
  Zap,
  Briefcase,
  Building2,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Sparkles,
  Compass,
  ScanEye,
  Microscope,
  Bot,
  Receipt,
  Glasses,
  Cone,
  Focus,
  Crosshair,
  Tag
} from 'lucide-react';

/* ------------------------------------------------------------------
   Shared icon resolver for consult topic hubs + hub categories.
   Maps the string `iconName` stored in data files (src/data/mockQaData.ts)
   to the matching lucide component. Unknown names fall back to Tag.
   ------------------------------------------------------------------ */

const HUB_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  eye: Eye,
  activity: Activity,
  shield: Shield,
  baby: Baby,
  droplets: Droplets,
  layers: Layers,
  pill: Pill,
  stethoscope: Stethoscope,
  flame: Flame,
  target: Target,
  zap: Zap,
  briefcase: Briefcase,
  building2: Building2,
  graduationcap: GraduationCap,
  users: Users,
  award: Award,
  bookopen: BookOpen,
  trendingup: TrendingUp,
  sparkles: Sparkles,
  compass: Compass,
  scaneye: ScanEye,
  microscope: Microscope,
  bot: Bot,
  receipt: Receipt,
  glasses: Glasses,
  cone: Cone,
  focus: Focus,
  crosshair: Crosshair,
};

export const resolveHubIcon = (iconName: string, className = 'h-4 w-4'): React.ReactElement => {
  const IconComponent = HUB_ICON_MAP[iconName.toLowerCase()] ?? Tag;
  return <IconComponent className={className} />;
};
