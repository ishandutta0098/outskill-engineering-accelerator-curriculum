import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { programStats } from '../data/curriculum'

const ease = [0.22, 1, 0.36, 1] as const

const headline = ['Engineering', 'Accelerator', '—', 'C7']

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const word: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.8, ease },
  },
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  return (
    <section
      id="hero"
      ref={ref}
      className="bg-mesh relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto max-w-5xl px-5 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-lime"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
          Enrollment open for Cohort 7
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display text-[44px] font-extrabold leading-[1.05] tracking-tight text-primary md:text-7xl"
        >
          {headline.map((w, i) => (
            <span key={i} className="mr-3 inline-block overflow-hidden align-bottom">
              <motion.span
                variants={word}
                className={`inline-block ${w === '—' ? 'text-lime' : ''}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl"
        >
          The AI-Native Engineering Roadmap for the next generation of builders.
          Master the <span className="text-lime">systems</span>, not just the
          prompts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <MagneticButton href="#apply">Apply for C7 Now</MagneticButton>
          <MagneticButton href="#roadmap" variant="ghost">
            View Roadmap
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {programStats.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-4 py-5">
              <div className="font-display text-2xl font-bold text-lime md:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#roadmap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.3 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-on-surface-variant transition-colors hover:text-lime"
        aria-label="Scroll to roadmap"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  )
}
