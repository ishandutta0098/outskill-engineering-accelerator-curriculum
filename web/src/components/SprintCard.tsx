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
  const spring = { stiffness: 220, damping: 22 }
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), spring)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), spring)

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    // Drive the cursor-following glow (Linear/Stripe technique)
    ref.current.style.setProperty('--x', `${px}px`)
    ref.current.style.setProperty('--y', `${py}px`)
    if (reduced) return
    mx.set(px / rect.width - 0.5)
    my.set(py / rect.height - 0.5)
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
      style={{ perspective: 1100 }}
      className="w-full"
    >
      <motion.button
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={() => onOpen(sprint)}
        whileHover={reduced ? undefined : { y: -4 }}
        transition={spring}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative w-full rounded-3xl border border-white/10 bg-surface-container/60 p-7 text-left shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
      >
        {/* Soft interior spotlight that follows the cursor */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at var(--x,50%) var(--y,0), ${sprint.accent}1f, transparent 55%)`,
          }}
        />
        {/* Border that lights up only where the cursor is (masked ring) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            padding: '1.5px',
            background: `radial-gradient(300px circle at var(--x,50%) var(--y,0), ${sprint.accent}, transparent 45%)`,
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Accent index strip down the leading edge */}
        <div
          className="absolute left-0 top-7 h-12 w-1 rounded-full"
          style={{ background: sprint.accent }}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-lime">
              Sprint {sprint.sprintNo} · {sprint.dayRange}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold text-on-surface md:text-2xl">
              {sprint.title}
            </h3>
          </div>
          <div
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10"
            style={{
              background: `${sprint.accent}1a`,
              color: sprint.accent,
              transform: 'translateZ(40px)',
            }}
          >
            <Icon size={22} />
          </div>
        </div>

        <p className="relative mt-4 text-sm leading-relaxed text-on-surface-variant">
          {sprint.tagline}
        </p>

        <div className="relative mt-5 flex flex-wrap gap-2">
          {sprint.tools.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-on-surface-variant"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="relative mt-5 flex items-center gap-1.5 text-sm font-semibold text-lime opacity-80 transition-opacity group-hover:opacity-100">
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
