import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: threshold })
  return { ref, inView }
}

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export const SectionTitle = ({ label, title, sub }) => (
  <div className="text-center mb-16">
    <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase mb-3">{label}</p>
    <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] mb-4">{title}</h2>
    {sub && <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">{sub}</p>}
  </div>
)
