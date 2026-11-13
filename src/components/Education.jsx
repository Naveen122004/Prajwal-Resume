import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award } from 'lucide-react'
import { education } from '../data/portfolioData'
import { useReveal, SectionTitle } from './utils'

export default function Education() {
  const { ref, inView } = useReveal()
  return (
    <section id="education" className="section bg-navy">
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        <SectionTitle label="Academic Background" title="Education" />

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ originY: 0 }}
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-cyan to-accent/20"
          />

          <div className="space-y-10 pl-16">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-[2.6rem] top-5 w-4 h-4 rounded-full bg-navy border-2 border-accent flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>

                <motion.div
                  whileHover={{ x: 4 }}
                  className="glass rounded-2xl p-6 grad-border"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <GraduationCap size={18} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm font-['Space_Grotesk']">{edu.degree}</h3>
                        <p className="text-accent/80 text-xs mt-0.5">{edu.institution}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar size={11} /> {edu.period}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-cyan/80">
                        <Award size={11} /> {edu.score}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
