import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Sprint } from '../data/curriculum'
import { getSprintIcon } from './sprintIcons'

interface Props {
  sprint: Sprint
  side: 'left' | 'right'
  onOpen: (s: Sprint) => void
}

export default function SprintCard({ sprint, side, onOpen }: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  })

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  const Icon = getSprintIcon(sprint.icon)

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -60 : 60, y: 40 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <motion.button
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={() => onOpen(sprint)}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group glass relative w-full overflow-hidden rounded-3xl p-7 text-left transition-colors hover:border-lime/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
      >
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: sprint.accent }}
        />
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-25"
          style={{ background: sprint.accent }}
        />

        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-lime">
              Sprint {sprint.sprintNo} · {sprint.dayRange}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold text-on-surface md:text-2xl">
              {sprint.title}
            </h3>
          </div>
          <div
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
            style={{ background: `${sprint.accent}22`, color: sprint.accent }}
          >
            <Icon size={22} />
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
          {sprint.tagline}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {sprint.tools.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-on-surface-variant"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-lime opacity-80 transition-opacity group-hover:opacity-100">
          Explore sprint
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </motion.button>
    </motion.div>
  )
}
