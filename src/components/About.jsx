import { motion } from 'framer-motion'
import { Cpu, Activity, Wifi, Layers } from 'lucide-react'
import { useReveal, fadeUp, SectionTitle } from './utils'

const cards = [
  { num: '01', label: 'Embedded Systems', icon: Cpu, desc: 'Microcontroller programming, firmware development, and real-time signal acquisition.' },
  { num: '02', label: 'Biomedical Electronics', icon: Activity, desc: 'ECG, EEG, PCG signal processing and medical instrumentation design.' },
  { num: '03', label: 'IoT & Automation', icon: Wifi, desc: 'Sensor integration, wireless communication, and automated control systems.' },
  { num: '04', label: 'Hardware-Software Integration', icon: Layers, desc: 'Bridging embedded firmware with software interfaces and data pipelines.' },
]

export default function About() {
  const { ref, inView } = useReveal()
  return (
    <section id="about" className="section bg-navy2">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <SectionTitle label="Who I Am" title="About Me" />

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="space-y-5 text-gray-300 leading-relaxed"
          >
            <p>
              I am a <span className="text-white font-medium">Medical Electronics Engineering</span> graduate from{' '}
              <span className="grad-text font-semibold">BMS College, Bengaluru</span>, with a strong interest in Embedded Systems, IoT, Biomedical Instrumentation, and intelligent automation.
            </p>
            <p>
              I have hands-on experience in microcontroller programming, Embedded C, sensor integration, signal acquisition, and hardware-software prototyping. I enjoy transforming engineering concepts into functional solutions that solve real-world problems.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {['Bengaluru, India', 'Open to Opportunities', 'B.E. Medical Electronics'].map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full glass border border-accent/20 text-accent/80">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '2', label: 'Engineering Projects' },
              { value: '3+', label: 'Certifications' },
              { value: '7.0', label: 'CGPA (B.E.)' },
              { value: '4+', label: 'Technical Domains' },
            ].map(({ value, label }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                className="glass rounded-xl p-5 text-center grad-border"
              >
                <p className="text-3xl font-bold grad-text font-['Space_Grotesk']">{value}</p>
                <p className="text-xs text-gray-400 mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Highlight cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(({ num, label, icon: Icon, desc }, i) => (
            <motion.div
              key={num}
              custom={i}
              variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(38,119,255,0.12)' }}
              className="glass rounded-2xl p-6 grad-border cursor-default group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-accent/50">{num}</span>
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon size={18} className="text-accent" />
                </div>
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">{label}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
