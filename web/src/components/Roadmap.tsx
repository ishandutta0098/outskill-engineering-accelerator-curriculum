import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from 'framer-motion'
import { ArrowRight, Flag, Trophy, Check, Star } from 'lucide-react'
import { sprints, type Sprint } from '../data/curriculum'
import { getSprintIcon } from './sprintIcons'
import Walker from './Walker'

interface Props {
  onOpen: (s: Sprint) => void
}

type NodeState = 'done' | 'current' | 'todo'

export default function Roadmap({ onOpen }: Props) {
  const reduced = useReducedMotion()
  return <HorizontalJourney onOpen={onOpen} reduced={!!reduced} />
}

/* ------------------------------------------------------------------ */
/* Horizontal "climb the staircase" journey — a leveling game          */
/* ------------------------------------------------------------------ */

function HorizontalJourney({ onOpen, reduced }: Props & { reduced: boolean }) {
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
  const total = sprints.length

  // Horizontal track geometry (px).
  const startPad = Math.min(w * 0.4, isMobile ? 150 : 360)
  const spacing = Math.max(340, Math.min(560, w * 0.5))
  const segHalf = spacing / 2
  const startX = startPad
  const sprintX = (i: number) => startPad + (i + 1) * spacing
  const finishX = startPad + (total + 1) * spacing
  const characterLeft = Math.round(w * (isMobile ? 0.22 : 0.26))
  // Trail off so that at full scroll the finish node lands exactly under the
  // walker's fixed screen-X — the player physically arrives at the summit.
  const endPad = Math.round(w - characterLeft)
  const trackWidth = finishX + endPad

  const maxTranslate = Math.max(0, trackWidth - w)
  const maxRef = useRef(maxTranslate)
  maxRef.current = maxTranslate
  const sectionHeight = maxTranslate + h

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const xRaw = useTransform(scrollYProgress, (p) => -maxRef.current * p)
  const xSpring = useSpring(xRaw, { stiffness: 120, damping: 30, restDelta: 0.5 })
  const x = reduced ? xRaw : xSpring

  // Staircase geometry: each node sits one step higher than the last, so the
  // walker visibly climbs as it clears sprints. Step rise is capped so even the
  // tallest cards stay clear of the nav bar.
  const stepRise = isMobile ? 20 : 26
  const roadBaseTop = Math.round(h * (isMobile ? 0.74 : 0.75))
  const platTop = (i: number) => roadBaseTop - i * stepRise // i: 0..total
  const nodeRadius = 18

  const walkerSize = isMobile ? 72 : 100
  const baseWalkerTop = roadBaseTop - walkerSize + 6

  // Scroll-progress at which the walker reaches each node (drives leveling).
  const nodeProgRef = useRef<number[]>([])
  nodeProgRef.current = sprints.map((_, i) =>
    maxTranslate > 0 ? (sprintX(i) - characterLeft) / maxTranslate : 0,
  )

  const [level, setLevel] = useState(0)
  const [levelUp, setLevelUp] = useState(0)
  const [finished, setFinished] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const count = nodeProgRef.current.filter((t) => p >= t).length
    setLevel((prev) => {
      if (count > prev) setLevelUp(count)
      return prev === count ? prev : count
    })
    // Congrats only once the walker actually arrives at the finish pole.
    setFinished(p >= 0.992)
  })

  // Growth: scale up noticeably with each level on top of the physical climb.
  const walkerScale =
    (isMobile ? 0.85 : 0.8) + Math.min(level, total) * (isMobile ? 0.05 : 0.075)

  const headingOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const pct = useTransform(scrollYProgress, [0, 1], [0, 100])
  const pctText = useTransform(pct, (v) => `${Math.round(v)}%`)
  const fillWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`)
  const barOpacity = useTransform(scrollYProgress, [0, 0.04, 0.97, 1], [0, 1, 1, 0])

  const nodeState = (i: number): NodeState =>
    i < level ? 'done' : i === level ? 'current' : 'todo'

  // Dynamic "where am I" label for the XP bar.
  const dayLabel =
    level === 0
      ? 'Day 0 · Basecamp'
      : level >= total
        ? 'Day 14 · AI-Native'
        : sprints[level - 1].dayRange

  // Staircase platforms + the vertical risers between them.
  const platforms: { x0: number; x1: number; top: number }[] = [
    { x0: 0, x1: sprintX(0) - segHalf, top: platTop(0) },
    ...sprints.map((_, i) => ({
      x0: sprintX(i) - segHalf,
      x1: sprintX(i) + segHalf,
      top: platTop(i),
    })),
    { x0: sprintX(total - 1) + segHalf, x1: trackWidth, top: platTop(total) },
  ]
  const risers = platforms.slice(0, -1).map((p, i) => {
    const next = platforms[i + 1]
    return { x: p.x1, y0: Math.min(p.top, next.top), y1: Math.max(p.top, next.top) }
  })

  // Walker height continuously tracks the platform directly beneath its fixed
  // screen-X, so it always stands on the staircase (never floats) and climbs
  // smoothly as each riser scrolls past.
  const platformsRef = useRef(platforms)
  platformsRef.current = platforms
  const geomRef = useRef({ characterLeft, maxTranslate, roadBaseTop })
  geomRef.current = { characterLeft, maxTranslate, roadBaseTop }
  const walkerYRaw = useTransform(scrollYProgress, (p) => {
    const g = geomRef.current
    const worldX = g.characterLeft + g.maxTranslate * p
    const plats = platformsRef.current
    let topVal = plats[plats.length - 1].top
    for (const pl of plats) {
      if (worldX >= pl.x0 && worldX < pl.x1) {
        topVal = pl.top
        break
      }
    }
    return topVal - g.roadBaseTop
  })
  const walkerYSpring = useSpring(walkerYRaw, { stiffness: 200, damping: 26 })
  const walkerY = reduced ? walkerYRaw : walkerYSpring

  const cardTopFor = (tall: boolean) =>
    tall ? (isMobile ? 78 : 88) : isMobile ? 118 : 140

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Intro heading — only at the start, clears once you set off */}
        <AnimatePresence>
          {level === 0 && (
            <motion.div
              style={{ opacity: headingOpacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
              className="pointer-events-none absolute left-0 top-14 z-30 max-w-md px-6 text-left md:top-20 md:max-w-xl md:px-12"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
                The Road to AI-Native
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-on-surface md:text-5xl">
                7 Sprints.
                <br />
                14 Days.
                <br />
                One Engineer.
              </h2>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                Scroll to climb · level up →
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Congrats banner once the summit is reached */}
        <AnimatePresence>
          {finished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="pointer-events-none absolute inset-x-0 top-24 z-40 flex justify-center px-6"
            >
              <div className="glass rounded-2xl border border-lime/50 px-7 py-5 text-center shadow-[0_0_60px_rgba(184,239,67,0.55)]">
                <Trophy className="mx-auto text-lime" size={30} />
                <h3 className="mt-2 font-display text-xl font-bold text-on-surface md:text-2xl">
                  Congrats — you're an AI-Native Engineer!
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-lime">
                  7 sprints · 14 days · summit cleared
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Moving world */}
        <motion.div
          style={{ x, width: trackWidth }}
          className="absolute inset-y-0 left-0"
        >
          {/* Staircase platforms */}
          {platforms.map((p, i) => (
            <div
              key={`plat-${i}`}
              className="absolute"
              style={{
                left: p.x0,
                width: p.x1 - p.x0,
                top: p.top,
                height: h - p.top,
                background:
                  'linear-gradient(180deg, #111214 0%, #0a0b0c 60%, #060708 100%)',
                borderTop: '2px solid rgba(184,239,67,0.7)',
                boxShadow: '0 -10px 40px -10px rgba(184,239,67,0.3)',
              }}
            >
              <div
                className="absolute left-4 right-4"
                style={{
                  top: 13,
                  height: 4,
                  backgroundImage:
                    'repeating-linear-gradient(90deg, rgba(184,239,67,0.8) 0 28px, transparent 28px 56px)',
                  opacity: 0.5,
                  filter: 'drop-shadow(0 0 5px rgba(184,239,67,0.5))',
                }}
              />
            </div>
          ))}

          {/* Risers (vertical neon faces between steps) */}
          {risers.map((r, i) => (
            <div
              key={`riser-${i}`}
              className="absolute"
              style={{
                left: r.x - 1.5,
                top: r.y0,
                width: 3,
                height: r.y1 - r.y0,
                background:
                  'linear-gradient(180deg, rgba(184,239,67,0.9), rgba(184,239,67,0.3))',
                boxShadow: '0 0 10px rgba(184,239,67,0.5)',
              }}
            />
          ))}

          {/* Start gate */}
          <Station
            x={startX}
            top={isMobile ? 250 : 300}
            height={platTop(0) + nodeRadius - (isMobile ? 250 : 300)}
          >
            <Gate />
          </Station>

          {/* Sprint signposts */}
          {sprints.map((sprint, i) => {
            const tall = i % 2 === 0
            const top = cardTopFor(tall)
            return (
              <Station
                key={sprint.id}
                x={sprintX(i)}
                top={top}
                height={platTop(i) + nodeRadius - top}
              >
                <Signpost
                  sprint={sprint}
                  onOpen={onOpen}
                  mobile={isMobile}
                  reduced={reduced}
                  state={nodeState(i)}
                />
              </Station>
            )
          })}

          {/* Finish */}
          <Station
            x={finishX}
            top={isMobile ? 78 : 88}
            height={platTop(total) + nodeRadius - (isMobile ? 78 : 88)}
          >
            <Finish reached={finished} />
          </Station>
        </motion.div>

        {/* Hero / avatar — fixed in screen-X, climbs the staircase + levels up */}
        <motion.div
          className="absolute z-20"
          style={{
            left: characterLeft,
            top: baseWalkerTop,
            width: walkerSize,
            height: walkerSize,
            y: walkerY,
          }}
        >
          {/* Aura that intensifies with level */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: walkerSize * (1.1 + level * 0.07),
              height: walkerSize * (1.1 + level * 0.07),
              background:
                'radial-gradient(circle, rgba(184,239,67,0.45) 0%, transparent 70%)',
              opacity: 0.25 + Math.min(level, total) * 0.07,
              transition: 'all 0.4s ease',
            }}
          />

          {/* Level-up burst above the head */}
          <div className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap">
            <AnimatePresence>
              {levelUp > 0 && !reduced && (
                <motion.span
                  key={levelUp}
                  initial={{ opacity: 0, y: 6, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5 }}
                  onAnimationComplete={() => setLevelUp(0)}
                  className="font-mono text-[10px] font-bold uppercase tracking-widest text-lime"
                >
                  Level up!
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Level badge at the feet — sits on the step, clear of cards */}
          <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border border-lime/50 bg-lime/15 px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-wider text-lime shadow-[0_0_14px_rgba(184,239,67,0.4)]">
            LV.{level}
          </div>

          <motion.div
            animate={{ scale: walkerScale }}
            transition={
              reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 16 }
            }
            style={{ transformOrigin: 'center bottom' }}
            className="h-full w-full"
          >
            <Walker size={walkerSize} />
          </motion.div>
        </motion.div>

        {/* XP / Level HUD */}
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 px-4 md:bottom-6">
          <motion.div
            style={{ opacity: barOpacity }}
            className="glass mx-auto w-full max-w-3xl rounded-2xl px-5 py-4 md:px-7"
          >
            <div className="mb-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-lime">
                  LV.{level}
                </span>
                <div className="flex items-center gap-0.5">
                  {sprints.map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < level ? 'text-lime' : 'text-white/15'}
                      fill={i < level ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant sm:text-[11px]">
                <motion.span className="font-bold text-lime">{pctText}</motion.span>{' '}
                XP to AI-Native
              </span>
            </div>
            <div className="relative h-2.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                style={{ width: fillWidth }}
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-lime-dim via-lime to-lime shadow-[0_0_12px_rgba(184,239,67,0.6)]"
              />
              {sprints.map((s, i) => (
                <span
                  key={s.id}
                  className={`absolute top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                    i < level ? 'bg-lime' : 'bg-white/40'
                  }`}
                  style={{ left: `${(i / (sprints.length - 1)) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-on-surface-variant/70 sm:text-[10px]">
              <span className="text-lime/90">{dayLabel}</span>
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
  top,
  height,
  children,
}: {
  x: number
  top: number
  height: number
  children: React.ReactNode
}) {
  return (
    <div
      className="absolute flex -translate-x-1/2 flex-col items-center"
      style={{ left: x, top, height }}
    >
      {children}
    </div>
  )
}

function Signpost({
  sprint,
  onOpen,
  mobile,
  reduced,
  state,
}: {
  sprint: Sprint
  onOpen: (s: Sprint) => void
  mobile: boolean
  reduced: boolean
  state: NodeState
}) {
  const Icon = getSprintIcon(sprint.icon)
  const cardW = mobile ? 230 : 300
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-full flex-col items-center">
      <motion.button
        onClick={() => onOpen(sprint)}
        onHoverStart={() => setOpen(true)}
        onHoverEnd={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.5 }}
        whileHover={reduced ? undefined : { y: -6 }}
        style={{ width: cardW }}
        className={`group relative rounded-2xl border bg-surface-container/70 p-5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors hover:border-lime/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime ${
          state === 'done' ? 'border-lime/30' : 'border-white/10'
        }`}
      >
        <div
          className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
          style={{ background: sprint.accent }}
        />

        {state === 'done' && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-lime/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-lime">
            <Check size={10} /> Cleared
          </div>
        )}

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

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
                {sprint.sessions.map((s, i) => (
                  <div key={i} className="flex gap-2 text-[11px] leading-snug">
                    <span className="shrink-0 font-mono font-semibold text-lime">
                      {s.day}
                    </span>
                    <span className="text-on-surface-variant">{s.topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
          {open ? 'Open full details' : 'Hover for days · click for details'}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </motion.button>

      {/* Post connecting the card down to the step node */}
      <div
        className="w-[3px] flex-1 rounded-full"
        style={{
          minHeight: 10,
          background: `linear-gradient(180deg, ${sprint.accent}, ${sprint.accent}55)`,
        }}
      />

      <RoadNode sprint={sprint} state={state} reduced={reduced} />
    </div>
  )
}

function RoadNode({
  sprint,
  state,
  reduced,
}: {
  sprint: Sprint
  state: NodeState
  reduced: boolean
}) {
  const done = state === 'done'
  const current = state === 'current'

  return (
    <motion.div
      className="grid h-9 w-9 place-items-center rounded-full border-2 font-mono text-xs font-bold"
      style={{
        borderColor: done || current ? sprint.accent : 'rgba(255,255,255,0.25)',
        color: done ? '#0c0d0e' : current ? sprint.accent : 'rgba(255,255,255,0.4)',
        background: done ? sprint.accent : '#0c0d0e',
        boxShadow: done || current ? `0 0 14px ${sprint.accent}66` : 'none',
      }}
      animate={current && !reduced ? { scale: [1, 1.18, 1] } : { scale: 1 }}
      transition={
        current && !reduced
          ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.3 }
      }
    >
      {done ? <Check size={16} strokeWidth={3} /> : sprint.sprintNo}
    </motion.div>
  )
}

function Gate() {
  return (
    <div className="flex h-full flex-col items-center">
      <div className="rounded-xl border border-lime/40 bg-lime/10 px-5 py-2 font-mono text-sm font-bold uppercase tracking-widest text-lime shadow-[0_0_24px_rgba(184,239,67,0.35)]">
        Start · Day 0
      </div>
      <div className="w-[3px] flex-1 rounded-full bg-gradient-to-b from-lime to-lime/40" style={{ minHeight: 10 }} />
      <Flag className="text-lime" size={24} />
    </div>
  )
}

function Finish({ reached }: { reached: boolean }) {
  return (
    <div className="flex h-full flex-col items-center">
      <motion.div
        className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-lime"
        animate={
          reached
            ? {
                borderColor: 'rgba(184,239,67,0.9)',
                boxShadow: '0 0 44px rgba(184,239,67,0.7)',
              }
            : {
                borderColor: 'rgba(184,239,67,0.5)',
                boxShadow: '0 0 30px rgba(184,239,67,0.5)',
              }
        }
        style={{ background: 'rgba(184,239,67,0.15)' }}
      >
        <Trophy size={20} />
        <span className="font-display text-sm font-bold uppercase tracking-wider">
          {reached ? 'AI-Native Engineer!' : 'AI-Native Engineer'}
        </span>
      </motion.div>
      <div
        className="w-2 flex-1 rounded-full"
        style={{
          minHeight: 12,
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0 6px, #0c0d0e 6px 12px)',
        }}
      />
    </div>
  )
}
