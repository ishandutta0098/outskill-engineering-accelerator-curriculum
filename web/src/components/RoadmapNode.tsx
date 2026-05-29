import { motion } from 'framer-motion'

export default function RoadmapNode({
  label,
  accent,
}: {
  label: string
  accent: string
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="relative grid place-items-center"
    >
      <span
        className="absolute h-12 w-12 rounded-full opacity-40 blur-md"
        style={{ background: accent }}
      />
      <span className="absolute h-11 w-11 animate-ping rounded-full bg-lime/20" />
      <span
        className="relative grid h-11 w-11 place-items-center rounded-full border-2 border-background font-mono text-sm font-bold text-on-lime shadow-[0_0_20px_rgba(184,239,67,0.5)]"
        style={{ background: accent }}
      >
        {label}
      </span>
    </motion.div>
  )
}
