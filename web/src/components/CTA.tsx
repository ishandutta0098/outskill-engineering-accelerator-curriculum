import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

export default function CTA() {
  return (
    <section id="apply" className="relative px-5 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] p-10 text-center md:p-20"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-lime/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-violet-deep/20 blur-[120px]" />

        <h2 className="relative font-display text-4xl font-bold leading-tight text-on-surface md:text-5xl">
          Transcend traditional development.
          <br />
          <span className="text-lime text-glow">Build what's next.</span>
        </h2>
        <p className="relative mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
          Seats are filling fast for Cohort 7 — the only program built around the
          intersection of deep engineering and production AI orchestration.
        </p>
        <div className="relative mt-10 flex flex-col items-center justify-center gap-5 md:flex-row">
          <MagneticButton href="#apply" className="px-12 py-5 text-lg">
            Apply for C7 Now
          </MagneticButton>
          <div className="text-left">
            <p className="font-mono text-sm font-bold text-lime">
              NEXT COHORT · LIMITED SEATS
            </p>
            <p className="text-sm text-on-surface-variant">
              Applications closing soon
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
