import { motion } from 'framer-motion'
import { skills } from '../data/portfolioData'
import { useReveal, fadeUp, SectionTitle } from './utils'

const categoryColors = {
  'Core Domain': 'from-accent/20 to-accent/5 border-accent/20',
  'Embedded Systems': 'from-cyan/20 to-cyan/5 border-cyan/20',
  'Medical Equipment': 'from-purple-500/20 to-purple-500/5 border-purple-500/20',
  'Software & Tools': 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20',
  'Engineering Skills': 'from-orange-500/20 to-orange-500/5 border-orange-500/20',
}
const tagColors = {
  'Core Domain': 'bg-accent/10 text-accent border-accent/20',
  'Embedded Systems': 'bg-cyan/10 text-cyan border-cyan/20',
  'Medical Equipment': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  'Software & Tools': 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  'Engineering Skills': 'bg-orange-500/10 text-orange-300 border-orange-500/20',
}

export default function Skills() {
  const { ref, inView } = useReveal()
  return (
    <section id="expertise" className="section bg-navy">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <SectionTitle
          label="Technical Expertise"
          title="Skills & Competencies"
          sub="A comprehensive overview of my technical knowledge across embedded systems, biomedical electronics, and engineering tools."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map(({ category, items }, i) => (
            <motion.div
              key={category}
              custom={i}
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-6 border bg-gradient-to-br ${categoryColors[category]} transition-all duration-300`}
            >
              <h3 className="font-semibold text-white mb-4 text-sm tracking-wide">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span
                    key={skill}
                    className={`text-xs px-3 py-1 rounded-full border font-medium ${tagColors[category]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
