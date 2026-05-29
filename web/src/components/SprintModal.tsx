import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Calendar, CheckCircle2, Wrench } from 'lucide-react'
import type { Sprint } from '../data/curriculum'
import { getSprintIcon } from './sprintIcons'

interface Props {
  sprint: Sprint | null
  onClose: () => void
}

export default function SprintModal({ sprint, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sprint) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [sprint, onClose])

  const Icon = getSprintIcon(sprint?.icon ?? 'Sparkles')

  return (
    <AnimatePresence>
      {sprint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Sprint ${sprint.sprintNo}: ${sprint.title}`}
        >
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%', opacity: 0.5, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="no-scrollbar relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-surface-container outline-none md:rounded-3xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-white/8 bg-surface-container/95 backdrop-blur-xl">
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: sprint.accent }}
              />
              <div className="flex items-start justify-between gap-4 p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
                    style={{
                      background: `${sprint.accent}22`,
                      color: sprint.accent,
                    }}
                  >
                    <Icon size={26} />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-lime">
                      Sprint {sprint.sprintNo} · {sprint.dayRange}
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-bold text-on-surface">
                      {sprint.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/5 text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-8 p-6 md:p-8">
              <p className="text-base leading-relaxed text-on-surface-variant">
                {sprint.tagline}
              </p>

              {sprint.note && (
                <div className="rounded-2xl border border-lime/20 bg-lime/5 p-4 text-sm italic text-lime/90">
                  {sprint.note}
                </div>
              )}

              {/* Sessions */}
              <div>
                <h4 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                  <Calendar size={14} /> Sessions
                </h4>
                <div className="space-y-4">
                  {sprint.sessions.map((s, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"
                    >
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span className="font-display font-semibold text-on-surface">
                          {s.topic}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {s.day}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {s.time}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {s.points.map((p, j) => (
                          <li
                            key={j}
                            className="flex gap-2 text-sm leading-relaxed text-on-surface-variant"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: sprint.accent }}
                            />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div>
                <h4 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                  <CheckCircle2 size={14} /> Outcomes
                </h4>
                <ul className="grid gap-3">
                  {sprint.outcomes.map((o, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-on-surface-variant"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-lime"
                      />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools */}
              <div>
                <h4 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                  <Wrench size={14} /> Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sprint.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-on-surface"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
