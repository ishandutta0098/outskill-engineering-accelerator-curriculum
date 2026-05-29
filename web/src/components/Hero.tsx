import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const headline = ['Engineering', 'Accelerator', 'Roadmap']

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
                className={`inline-block ${w === 'Roadmap' ? 'text-lime' : ''}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>
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
