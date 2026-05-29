import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { ArrowRight, Flag, Trophy } from 'lucide-react'
import { sprints, type Sprint } from '../data/curriculum'
import { getSprintIcon } from './sprintIcons'
import Walker from './Walker'

interface Props {
  onOpen: (s: Sprint) => void
}

export default function Roadmap({ onOpen }: Props) {
  const reduced = useReducedMotion()
  return <HorizontalJourney onOpen={onOpen} reduced={!!reduced} />
}

/* ------------------------------------------------------------------ */
/* Horizontal "walk the road" journey                                  */
/* ------------------------------------------------------------------ */

function HorizontalJourney({
  onOpen,
  reduced,
}: Props & { reduced: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [vp, setVp] = useState({ w: 1280, h: 800 })

  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { w, h } = vp
  const isMobile = w < 640

  // Layout geometry (in px) along the horizontal track.
  const startPad = Math.min(w * 0.4, isMobile ? 150 : 360)
  const spacing = Math.max(340, Math.min(560, w * 0.5))
  const endPad = Math.min(w * 0.55, 520)
  const startX = startPad
  const sprintX = (i: number) => startPad + (i + 1) * spacing
  const finishX = startPad + (sprints.length + 1) * spacing
  const trackWidth = finishX + endPad

  const maxTranslate = Math.max(0, trackWidth - w)
  const maxRef = useRef(maxTranslate)
  maxRef.current = maxTranslate

  // Enough vertical scroll room for a ~1:1 feel between scroll and travel.
  const sectionHeight = maxTranslate + h

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const xRaw = useTransform(scrollYProgress, (p) => -maxRef.current * p)
  const xSpring = useSpring(xRaw, { stiffness: 120, damping: 30, restDelta: 0.5 })
  // Reduced motion: track scroll 1:1 (no spring inertia, the part that
  // actually triggers vestibular discomfort) while still walking the road.
  const x = reduced ? xRaw : xSpring

  // Road vertical placement.
  const roadTop = Math.round(h * 0.72)
  const aboveRoad = roadTop
  const walkerSize = isMobile ? 72 : 100
  const characterLeft = Math.round(w * (isMobile ? 0.22 : 0.26))

  const headingOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0])
  const pct = useTransform(scrollYProgress, [0, 1], [0, 100])
  const pctText = useTransform(pct, (v) => `${Math.round(v)}%`)
  const fillWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`)
  const barOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.97, 1],
    [0, 1, 1, 0],
  )

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Intro heading (fades out as you set off) */}
        <motion.div
          style={{ opacity: headingOpacity }}
          className="pointer-events-none absolute inset-x-0 top-16 z-30 px-6 text-center md:top-20"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
            The Road to AI-Native
          </span>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold text-on-surface md:text-5xl">
            8 Sprints. 14 Days. One Engineer.
          </h2>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
            Scroll to walk the road →
          </p>
        </motion.div>

        {/* Moving world */}
        <motion.div
          style={{ x, width: trackWidth }}
          className="absolute inset-y-0 left-0"
        >
          {/* Road surface */}
          <div
            className="absolute left-0"
            style={{
              top: roadTop,
              width: trackWidth,
              height: h - roadTop,
              background:
                'linear-gradient(180deg, #111214 0%, #0a0b0c 60%, #060708 100%)',
              borderTop: '2px solid rgba(184,239,67,0.7)',
              boxShadow: '0 -10px 40px -10px rgba(184,239,67,0.35)',
            }}
          >
            {/* Dashed center lane */}
            <div
              className="absolute left-0 right-0"
              style={{
                top: Math.round((h - roadTop) * 0.42),
                height: 6,
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(184,239,67,0.85) 0 46px, transparent 46px 92px)',
                opacity: 0.7,
                filter: 'drop-shadow(0 0 6px rgba(184,239,67,0.6))',
              }}
            />
          </div>

          {/* Start gate */}
          <Station x={startX} bottom={aboveRoad}>
            <Gate />
          </Station>

          {/* Sprint signposts */}
          {sprints.map((sprint, i) => (
            <Station key={sprint.id} x={sprintX(i)} bottom={aboveRoad}>
              <Signpost
                sprint={sprint}
                tall={i % 2 === 0}
                onOpen={onOpen}
                mobile={isMobile}
                reduced={reduced}
              />
            </Station>
          ))}

          {/* Finish */}
          <Station x={finishX} bottom={aboveRoad}>
            <Finish />
          </Station>
        </motion.div>

        {/* Walking character — stays put while the world scrolls past */}
        <div
          className="absolute z-20"
          style={{ left: characterLeft, top: roadTop - walkerSize + 6 }}
        >
          <Walker size={walkerSize} />
        </div>

        {/* Progress bar */}
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 px-4 md:bottom-6">
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
              <motion.div
                style={{ width: fillWidth }}
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-lime-dim via-lime to-lime shadow-[0_0_12px_rgba(184,239,67,0.6)]"
              />
              {sprints.map((s, i) => (
                <span
                  key={s.id}
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
      </div>
    </section>
  )
}

/* --- pieces ------------------------------------------------------- */

function Station({
  x,
  bottom,
  children,
}: {
  x: number
  bottom: number
  children: React.ReactNode
}) {
  return (
    <div
      className="absolute flex -translate-x-1/2 flex-col items-center justify-end"
      style={{ left: x, top: 0, height: bottom }}
    >
      {children}
    </div>
  )
}

function Signpost({
  sprint,
  tall,
  onOpen,
  mobile,
  reduced,
}: {
  sprint: Sprint
  tall: boolean
  onOpen: (s: Sprint) => void
  mobile: boolean
  reduced: boolean
}) {
  const Icon = getSprintIcon(sprint.icon)
  const postH = tall ? (mobile ? 70 : 120) : mobile ? 30 : 56
  const cardW = mobile ? 220 : 290

  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={() => onOpen(sprint)}
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.5 }}
        whileHover={reduced ? undefined : { y: -6 }}
        style={{ width: cardW }}
        className="group relative rounded-2xl border border-white/10 bg-surface-container/70 p-5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors hover:border-lime/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
      >
        <div
          className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
          style={{ background: sprint.accent }}
        />
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-lime">
              Sprint {sprint.sprintNo} · {sprint.dayRange}
            </span>
            <h3 className="mt-1.5 font-display text-base font-bold leading-tight text-on-surface md:text-lg">
              {sprint.title}
            </h3>
          </div>
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10"
            style={{ background: `${sprint.accent}1a`, color: sprint.accent }}
          >
            <Icon size={18} />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {sprint.tools.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-on-surface-variant"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-lime opacity-80 transition-opacity group-hover:opacity-100">
          Explore sprint
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </motion.button>

      {/* Post + base marker on the road */}
      <div
        className="w-[3px] rounded-full"
        style={{
          height: postH,
          background: `linear-gradient(180deg, ${sprint.accent}, ${sprint.accent}55)`,
        }}
      />
      <div
        className="grid h-9 w-9 -mt-1 place-items-center rounded-full border-2 font-mono text-xs font-bold"
        style={{
          borderColor: sprint.accent,
          color: sprint.accent,
          background: '#0c0d0e',
          boxShadow: `0 0 14px ${sprint.accent}66`,
        }}
      >
        {sprint.sprintNo}
      </div>
    </div>
  )
}

function Gate() {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-xl border border-lime/40 bg-lime/10 px-5 py-2 font-mono text-sm font-bold uppercase tracking-widest text-lime shadow-[0_0_24px_rgba(184,239,67,0.35)]">
        Start · Day 0
      </div>
      <div className="mt-2 h-16 w-[3px] rounded-full bg-gradient-to-b from-lime to-lime/40" />
      <Flag className="-mt-1 text-lime" size={24} />
    </div>
  )
}

function Finish() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 rounded-xl border border-lime/50 bg-lime/15 px-5 py-2.5 text-lime shadow-[0_0_30px_rgba(184,239,67,0.5)]">
        <Trophy size={20} />
        <span className="font-display text-sm font-bold uppercase tracking-wider">
          AI-Native Engineer
        </span>
      </div>
      <div
        className="mt-2 h-20 w-2 rounded-full"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0 6px, #0c0d0e 6px 12px)',
        }}
      />
    </div>
  )
}
