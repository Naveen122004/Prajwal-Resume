import { motion } from 'framer-motion'
import { Brain, Wrench, Users, MessageSquare, RefreshCw, Clock, BookOpen, Globe, Compass, Dribbble, Tv } from 'lucide-react'
import { strengths, languages, interests } from '../data/portfolioData'
import { useReveal, fadeUp, SectionTitle } from './utils'

const icons = [Brain, Wrench, Users, MessageSquare, RefreshCw, Clock, BookOpen]

export default function Strengths() {
  const { ref, inView } = useReveal()
  return (
    <section id="strengths" className="section bg-navy">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <SectionTitle label="Professional Profile" title="Strengths & Interests" />

        {/* Strengths */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
          {strengths.map((s, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={s}
                custom={i}
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -4, borderColor: 'rgba(38,119,255,0.4)' }}
                className="glass rounded-xl p-4 text-center border border-white/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                  <Icon size={18} className="text-accent" />
                </div>
                <p className="text-xs text-gray-300 font-medium leading-tight">{s}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Languages & Interests */}
        <div className="grid sm:grid-cols-2 gap-8">
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="glass rounded-2xl p-6 grad-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <Globe size={16} className="text-accent" />
              <h3 className="font-semibold text-white text-sm">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map(l => (
                <span key={l} className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent/80 border border-accent/20 font-medium">{l}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="glass rounded-2xl p-6 grad-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <Compass size={16} className="text-cyan" />
              <h3 className="font-semibold text-white text-sm">Interests</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map(item => (
                <span key={item} className="text-xs px-3 py-1.5 rounded-full bg-cyan/10 text-cyan/80 border border-cyan/20 font-medium">{item}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
