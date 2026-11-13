import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import { certifications } from '../data/portfolioData'
import { useReveal, fadeUp, SectionTitle } from './utils'

export default function Certifications() {
  const { ref, inView } = useReveal()
  return (
    <section id="certifications" className="section bg-navy2">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <SectionTitle label="Credentials" title="Certifications" />
        <div className="grid sm:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              custom={i}
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(38,119,255,0.12)' }}
              className="glass rounded-2xl p-6 grad-border text-center group"
            >
              <div className="text-4xl mb-4">{cert.icon}</div>
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                <BadgeCheck size={16} className="text-accent" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-2">{cert.title}</h3>
              <p className="text-xs text-accent/70 font-medium">{cert.issuer}</p>
              <p className="text-[10px] text-gray-600 mt-3 italic">Certificate ID not listed</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
