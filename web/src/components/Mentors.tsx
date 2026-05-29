import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Mentor {
  name: string
  role: string
  initials: string
  tags: string[]
  from: string
  to: string
}

const mentors: Mentor[] = [
  {
    name: 'Manoj Saharan',
    role: 'Director of AI Ops, Talent Warehouse AI',
    initials: 'MS',
    tags: ['LLMOps', 'Scalability'],
    from: '#b8ef43',
    to: '#6001d1',
  },
  {
    name: 'Didac F',
    role: 'Founder, Autosolutions.ai',
    initials: 'DF',
    tags: ['Agentic Workflows', 'Product Strategy'],
    from: '#9FC5E8',
    to: '#b8ef43',
  },
]

export default function Mentors() {
  return (
    <section id="mentors" className="bg-mesh relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
            Mentorship
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-primary md:text-5xl">
            Learn from Industry Pioneers
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {mentors.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 opacity-70 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
                  style={{
                    background: `linear-gradient(135deg, ${m.from}, ${m.to})`,
                  }}
                />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-6xl font-extrabold text-background/80">
                    {m.initials}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent" />
              </div>
              <div className="p-7">
                <h4 className="font-display text-xl font-bold text-on-surface">
                  {m.name}
                </h4>
                <p className="mt-1 text-sm text-on-surface-variant">{m.role}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-lime"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass flex flex-col justify-between rounded-3xl border-lime/20 bg-lime/[0.03] p-8"
          >
            <div>
              <div className="mb-6 flex -space-x-3">
                {['#b8ef43', '#9FC5E8', '#c9aeff'].map((c, i) => (
                  <span
                    key={i}
                    className="h-11 w-11 rounded-full border-2 border-background"
                    style={{ background: c }}
                  />
                ))}
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-background bg-lime font-mono text-sm font-bold text-on-lime">
                  +15
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-lime">
                Join 15+ Industry Experts
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                Our mentors come from frontier AI labs and top-tier startups to
                help you navigate the future of engineering.
              </p>
            </div>
            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-lime py-4 font-bold text-on-lime transition-all hover:shadow-[0_0_30px_rgba(184,239,67,0.35)] active:scale-95">
              Meet All Mentors
              <ArrowUpRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
