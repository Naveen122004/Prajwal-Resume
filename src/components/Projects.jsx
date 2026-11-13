import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, ChevronDown, ChevronUp, Calendar, Activity, Cpu } from 'lucide-react'
import { projects } from '../data/portfolioData'
import { useReveal, fadeUp, SectionTitle } from './utils'

/* ── Project visual illustrations ── */
function StethoscopeIllustration() {
  return (
    <div className="relative h-48 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
      {/* Waveform */}
      <svg viewBox="0 0 300 100" className="absolute inset-0 w-full h-full opacity-30">
        <motion.path
          d="M0,50 L40,50 L55,10 L65,90 L75,5 L85,70 L95,50 L160,50 L175,15 L185,85 L195,8 L205,72 L215,50 L300,50"
          fill="none" stroke="#00D4FF" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
      {/* Central device */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 glass rounded-xl p-4 text-center"
      >
        <Activity size={32} className="text-cyan mx-auto mb-2" />
        <p className="text-[10px] font-mono text-cyan/80">PCG SIGNAL</p>
        <div className="flex gap-1 mt-2 justify-center">
          {[3,5,8,5,3,6,9,6,3].map((h,i) => (
            <motion.div key={i} className="w-1 bg-accent rounded-full"
              animate={{ height: [h*2, h*4, h*2] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i*0.1 }}
            />
          ))}
        </div>
      </motion.div>
      {/* Floating tags */}
      <div className="absolute top-3 right-3 text-[9px] font-mono text-accent/60 glass px-2 py-1 rounded">DSP FILTER</div>
      <div className="absolute bottom-3 left-3 text-[9px] font-mono text-cyan/60 glass px-2 py-1 rounded">TELEMEDICINE</div>
    </div>
  )
}

function WindingIllustration() {
  return (
    <div className="relative h-48 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-transparent" />
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 glass rounded-xl p-4 text-center"
      >
        <Cpu size={32} className="text-accent mx-auto mb-2" />
        <p className="text-[10px] font-mono text-accent/80">ARDUINO UNO</p>
        {/* Stepper motor animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 mx-auto mt-2 border-2 border-cyan/40 rounded-full border-t-cyan"
        />
        <p className="text-[9px] text-gray-500 mt-1">STEPPER MOTOR</p>
      </motion.div>
      {/* PWM wave */}
      <svg viewBox="0 0 200 40" className="absolute bottom-4 left-0 right-0 w-full opacity-30">
        <path d="M0,30 L20,30 L20,10 L40,10 L40,30 L60,30 L60,10 L80,10 L80,30 L100,30 L100,10 L120,10 L120,30 L140,30 L140,10 L160,10 L160,30 L180,30 L180,10 L200,10"
          fill="none" stroke="#2677FF" strokeWidth="1.5" />
      </svg>
      <div className="absolute top-3 right-3 text-[9px] font-mono text-cyan/60 glass px-2 py-1 rounded">PWM CTRL</div>
      <div className="absolute bottom-3 left-3 text-[9px] font-mono text-accent/60 glass px-2 py-1 rounded">LCD PANEL</div>
    </div>
  )
}

const illustrations = [StethoscopeIllustration, WindingIllustration]

/* ── 3D tilt card ── */
function TiltCard({ children, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6])

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  const { ref, inView } = useReveal()
  const [expanded, setExpanded] = useState(null)

  return (
    <section id="projects" className="section bg-navy2">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <SectionTitle
          label="Featured Work"
          title="Engineering Projects"
          sub="Real-world hardware-software solutions built with embedded systems, signal processing, and IoT technologies."
        />
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((p, i) => {
            const Illustration = illustrations[i]
            const isOpen = expanded === i
            return (
              <motion.div
                key={p.id}
                custom={i}
                variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              >
                <TiltCard className="glass rounded-2xl overflow-hidden grad-border h-full flex flex-col">
                  {/* Illustration */}
                  <Illustration />

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-mono text-accent/50">PROJECT {p.id}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar size={11} /> {p.date}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 font-['Space_Grotesk']">{p.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{p.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent/80 border border-accent/15 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expandable contributions */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="flex items-center gap-2 text-xs text-accent hover:text-cyan transition-colors mb-3 mt-auto"
                    >
                      {isOpen ? <><ChevronUp size={14} /> Hide Details</> : <><ChevronDown size={14} /> View Contributions</>}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 overflow-hidden"
                        >
                          {p.contributions.map((c, ci) => (
                            <li key={ci} className="flex gap-2 text-xs text-gray-400">
                              <span className="text-accent mt-0.5 shrink-0">▸</span> {c}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>

                    {/* Links */}
                    <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                      <a href={p.githubUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                        <Github size={13} /> GitHub {p.githubUrl === '#' && <span className="text-gray-600">(add URL)</span>}
                      </a>
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                          <ExternalLink size={13} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
