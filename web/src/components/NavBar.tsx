import { motion, useScroll, useSpring } from 'framer-motion'

const links = [
  { label: 'Sprints', href: '#roadmap' },
  { label: 'Mentors', href: '#mentors' },
  { label: 'Apply', href: '#apply' },
]

export default function NavBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 z-50 h-16 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 md:px-12">
        <a href="#hero" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-lime font-mono text-sm font-bold text-on-lime">
            C7
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-primary">
            Accelerator
          </span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-on-surface-variant transition-colors hover:text-lime"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#apply"
          className="rounded-lg bg-lime px-5 py-2 text-sm font-bold text-on-lime transition-all hover:shadow-[0_0_24px_rgba(184,239,67,0.45)] active:scale-95"
        >
          Apply Now
        </a>
      </div>
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-lime to-lime-dim shadow-[0_0_10px_rgba(184,239,67,0.6)]"
      />
    </motion.nav>
  )
}
