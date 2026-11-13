import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { nav } from '../data/portfolioData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = nav.map(n => document.getElementById(n.toLowerCase()))
      sections.forEach(sec => {
        if (sec) {
          const { top, bottom } = sec.getBoundingClientRect()
          if (top <= 100 && bottom >= 100) setActive(sec.id.charAt(0).toUpperCase() + sec.id.slice(1))
        }
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#07111F]/80 backdrop-blur-xl border-b border-white/5 shadow-lg' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold tracking-tight cursor-pointer grad-text font-['Space_Grotesk']"
          onClick={() => scrollTo('home')}
        >
          PRAJWAL.
        </motion.span>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {nav.map(item => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group"
            >
              {item}
              <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-accent to-cyan transition-all duration-300 ${active === item ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-cyan text-white text-sm font-semibold shadow-lg shadow-accent/20"
          >
            <Download size={14} /> Resume
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B1728]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {nav.map(item => (
                <button key={item} onClick={() => scrollTo(item)} className="text-left text-gray-300 hover:text-white py-2 border-b border-white/5 text-sm font-medium">
                  {item}
                </button>
              ))}
              <a href="/resume.pdf" download className="flex items-center gap-2 text-sm font-semibold grad-text">
                <Download size={14} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
