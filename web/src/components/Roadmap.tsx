import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { sprints, type Sprint } from '../data/curriculum'
import SprintCard from './SprintCard'
import RoadmapNode from './RoadmapNode'

interface Props {
  onOpen: (s: Sprint) => void
}

export default function Roadmap({ onOpen }: Props) {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start center', 'end center'],
  })
  const fill = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  })
  const pct = useTransform(scrollYProgress, [0, 1], [0, 100])
  const pctText = useTransform(pct, (v) => `${Math.round(v)}%`)
  const fillWidth = useTransform(fill, (v) => `${v * 100}%`)
  const barOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.97, 1],
    [0, 1, 1, 0],
  )

  return (
    <section id="roadmap" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
            The Cinematic Roadmap
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-primary md:text-5xl">
            8 Sprints. 14 Days.
            <br />
            One AI-Native Engineer.
          </h2>
          <p className="mt-5 text-lg text-on-surface-variant">
            A guided journey through the future of engineering. Tap any sprint to
            reveal its full day-by-day breakdown.
          </p>
        </motion.div>

        <div ref={trackRef} className="relative">
          {/* Spine */}
          <div className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-white/10 md:left-1/2">
            <motion.div
              style={{ scaleY: fill }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-lime via-lime to-lime-dim shadow-[0_0_16px_rgba(184,239,67,0.7)]"
            />
          </div>

          <div className="space-y-14 md:space-y-24">
            {sprints.map((sprint, i) => {
              const side = i % 2 === 0 ? 'left' : 'right'
              const cardWrap =
                side === 'left'
                  ? 'pl-14 md:w-1/2 md:pl-0 md:pr-16'
                  : 'pl-14 md:ml-auto md:w-1/2 md:pl-16 md:pr-0'
              return (
                <div key={sprint.id} className="relative">
                  <div className="absolute left-4 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
                    <RoadmapNode label={sprint.sprintNo} accent={sprint.accent} />
                  </div>
                  <div className={cardWrap}>
                    <SprintCard sprint={sprint} side={side} onOpen={onOpen} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Sticky horizontal progress bar */}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-30 px-4 md:bottom-6">
        <motion.div
          style={{ opacity: barOpacity }}
          className="glass mx-auto w-full max-w-3xl rounded-2xl px-5 py-4 md:px-7"
        >
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant sm:text-[11px]">
              Progress to AI-Native Engineer
            </span>
            <motion.span className="font-mono text-sm font-bold text-lime">
              {pctText}
            </motion.span>
          </div>

          <div className="relative h-2.5 overflow-hidden rounded-full bg-white/10">
            {/* Filled portion */}
            <motion.div
              style={{ width: fillWidth }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-lime-dim via-lime to-lime shadow-[0_0_12px_rgba(184,239,67,0.6)]"
            >
              {/* Continuously moving shimmer */}
              {!reduced && (
                <motion.div
                  className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                  animate={{ x: ['-120%', '320%'] }}
                  transition={{
                    duration: 1.8,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 0.4,
                  }}
                />
              )}
            </motion.div>

            {/* Sprint milestone ticks */}
            {sprints.map((sprint, i) => (
              <span
                key={sprint.id}
                className="absolute top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
                style={{ left: `${(i / (sprints.length - 1)) * 100}%` }}
              />
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-on-surface-variant/70 sm:text-[10px]">
            <span>Day 0 · Basecamp</span>
            <span className="text-lime/70">Capstone · Orion</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
