import { useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  children: ReactNode
  href?: string
  variant?: 'solid' | 'ghost'
  className?: string
}

export default function MagneticButton({
  children,
  href = '#',
  variant = 'solid',
  className = '',
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPos({ x: x * 0.3, y: y * 0.3 })
  }

  const base =
    'relative inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold transition-shadow'
  const styles =
    variant === 'solid'
      ? 'bg-lime text-on-lime hover:shadow-[0_0_36px_rgba(184,239,67,0.5)]'
      : 'glass text-on-surface hover:border-lime/50'

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  )
}
