import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { contact } from '../data/portfolioData'

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="grad-text font-bold text-lg font-['Space_Grotesk']">PRAJWAL.</span>
          <p className="text-xs text-gray-600 mt-1">Medical Electronics Engineer · Bengaluru, India</p>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: Linkedin, href: contact.linkedin, label: 'LinkedIn' },
            { icon: Github, href: contact.github, label: 'GitHub' },
            { icon: Mail, href: `mailto:${contact.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              className="text-gray-600 hover:text-accent transition-colors" aria-label={label}>
              <Icon size={16} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Prajwal Banajawad</p>
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
