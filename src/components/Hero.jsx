import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, ArrowRight, ChevronDown } from 'lucide-react'
import { contact } from '../data/portfolioData'
import profileImg from '../assets/profile.jpg'

/* ── Animated circuit-board canvas ── */
function CircuitBg() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.03
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
        const alpha = 0.4 + 0.3 * Math.sin(n.pulse)
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(38,119,255,${alpha})`
        ctx.fill()
      })
      nodes.forEach((a, i) => nodes.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < 140) {
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(38,119,255,${0.12 * (1 - d / 140)})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }))
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full opacity-60" />
}

/* ── ECG / waveform SVG illustration ── */
function EngineeringIllustration() {
  const ecgPath = "M0,60 L30,60 L40,20 L50,100 L60,10 L70,80 L80,60 L200,60"
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow ring */}
      <div className="absolute w-72 h-72 rounded-full border border-accent/20 animate-pulse" />
      <div className="absolute w-56 h-56 rounded-full border border-cyan/10" />

      {/* Central board */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative glass rounded-2xl p-6 w-64 shadow-2xl shadow-accent/10"
      >
        {/* MCU chip */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-[#0B1728] border border-accent/40 rounded-lg flex items-center justify-center shadow-inner">
              <span className="text-xs font-mono text-accent/80 text-center leading-tight">MCU<br/>ATmega</span>
            </div>
            {/* Pins */}
            {[0,1,2,3].map(i => (
              <div key={i} className="absolute left-[-8px] w-2 h-px bg-accent/50" style={{ top: `${20 + i * 14}px` }} />
            ))}
            {[0,1,2,3].map(i => (
              <div key={i} className="absolute right-[-8px] w-2 h-px bg-cyan/50" style={{ top: `${20 + i * 14}px` }} />
            ))}
          </div>
        </div>

        {/* ECG waveform */}
        <div className="bg-[#07111F] rounded-lg p-2 border border-white/5">
          <p className="text-[9px] text-cyan/60 font-mono mb-1">PCG SIGNAL — LIVE</p>
          <svg viewBox="0 0 200 80" className="w-full h-10">
            <motion.path
              d={ecgPath}
              fill="none"
              stroke="#00D4FF"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <line x1="0" y1="60" x2="200" y2="60" stroke="#ffffff10" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Status indicators */}
        <div className="flex justify-between mt-3">
          {['3.3V', 'I²C', 'SPI', 'PWM'].map(label => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              <span className="text-[8px] font-mono text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating chips */}
      {[
        { label: 'SENSOR', x: '-left-8', y: 'top-8', color: 'accent' },
        { label: 'IoT', x: '-right-6', y: 'top-12', color: 'cyan' },
        { label: 'ADC', x: '-left-6', y: 'bottom-12', color: 'cyan' },
        { label: 'UART', x: '-right-8', y: 'bottom-8', color: 'accent' },
      ].map(({ label, x, y, color }, i) => (
        <motion.div
          key={label}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          className={`absolute ${x} ${y} glass rounded px-2 py-1 text-[9px] font-mono text-${color} border border-${color}/20`}
        >
          {label}
        </motion.div>
      ))}
    </div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
})

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      <CircuitBg />
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left */}
        <div>
          <motion.p {...fadeUp(0.1)} className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-4">
            Hello, I'm Prajwal Banajawad
          </motion.p>

          <motion.h1 {...fadeUp(0.2)} className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight mb-6 font-['Space_Grotesk']">
            Engineering{' '}
            <span className="grad-text">Intelligent</span>
            <br />Connections Between
            <br /><span className="grad-text">Hardware & Software.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.35)} className="text-sm font-semibold tracking-widest text-cyan/80 uppercase mb-4">
            Medical Electronics Engineer | Embedded Systems & IoT Enthusiast
          </motion.p>

          <motion.p {...fadeUp(0.45)} className="text-gray-400 text-base leading-relaxed max-w-lg mb-8">
            Passionate about developing intelligent hardware-software solutions through embedded programming, biomedical instrumentation, sensor integration, and IoT-based automation.
          </motion.p>

          {/* Buttons */}
          <motion.div {...fadeUp(0.55)} className="flex flex-wrap gap-4 mb-10">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(38,119,255,0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-cyan text-white font-semibold text-sm shadow-lg shadow-accent/20"
            >
              Explore My Work <ArrowRight size={16} />
            </motion.button>
            <motion.a
              href="/resume.pdf" download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-accent/30 text-white font-semibold text-sm hover:border-accent/60 transition-colors"
            >
              <Download size={16} /> Download Resume
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-gray-300 font-semibold text-sm hover:border-white/30 transition-colors"
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* Social */}
          <motion.div {...fadeUp(0.65)} className="flex items-center gap-5">
            <span className="text-xs text-gray-600 uppercase tracking-widest">Connect</span>
            <div className="w-8 h-px bg-white/10" />
            {[
              { icon: Linkedin, href: contact.linkedin, label: 'LinkedIn' },
              { icon: Github, href: contact.github, label: 'GitHub' },
              { icon: Mail, href: `mailto:${contact.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label} href={href} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.2, color: '#2677FF' }}
                className="text-gray-500 hover:text-accent transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right – profile photo + illustration */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex flex-col items-center gap-8"
        >
          {/* Profile photo */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 to-cyan/20 blur-2xl scale-110" />
            <div className="relative w-52 h-52 rounded-full border-2 border-accent/30 overflow-hidden shadow-2xl shadow-accent/20">
              <img src={profileImg} alt="Prajwal Banajawad" className="w-full h-full object-cover" loading="eager" />
            </div>
            {/* Orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-12px] rounded-full border border-dashed border-accent/20"
            />
          </div>

          {/* Engineering illustration */}
          <div className="w-full h-64">
            <EngineeringIllustration />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600"
      >
        <ChevronDown size={20} />
      </motion.div>
    </section>
  )
}
