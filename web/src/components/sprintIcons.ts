import {
  Rocket,
  Wand2,
  Boxes,
  Database,
  TerminalSquare,
  Workflow,
  Bot,
  Trophy,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

export const sprintIcons: Record<string, LucideIcon> = {
  Rocket,
  Wand2,
  Boxes,
  Database,
  TerminalSquare,
  Workflow,
  Bot,
  Trophy,
  Sparkles,
}

export const getSprintIcon = (name: string): LucideIcon =>
  sprintIcons[name] ?? Sparkles
