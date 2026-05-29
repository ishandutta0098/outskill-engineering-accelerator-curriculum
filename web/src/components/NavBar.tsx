import { motion, useScroll, useSpring } from 'framer-motion'

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
      <div className="mx-auto flex h-full max-w-7xl items-center px-5 md:px-12">
        <a href="#hero" className="flex items-center gap-2">
          <span className="font-display text-lg font-bold tracking-tight text-primary">
            Accelerator
          </span>
        </a>
      </div>
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-lime to-lime-dim shadow-[0_0_10px_rgba(184,239,67,0.6)]"
      />
    </motion.nav>
  )
}
