import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, Send, AlertCircle } from 'lucide-react'
import { contact } from '../data/portfolioData'
import { useReveal, fadeUp, SectionTitle } from './utils'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID' // ← Replace with your Formspree endpoint

export default function Contact() {
  const { ref, inView } = useReveal()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', subject: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const field = (key, label, type = 'text', rows) => (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5 font-medium">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          value={form[key]}
          onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent/60 transition-colors resize-none"
          placeholder={`Your ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent/60 transition-colors"
          placeholder={`Your ${label.toLowerCase()}...`}
        />
      )}
      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <section id="contact" className="section bg-navy2">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <SectionTitle
          label="Get In Touch"
          title="Let's Build Something Intelligent Together."
          sub="Open to opportunities in Embedded Systems, IoT Engineering, Biomedical Electronics, and related engineering domains."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="space-y-6">
            {[
              { icon: MapPin, label: 'Location', value: contact.location },
              { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
              { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 glass rounded-xl p-4 grad-border">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm text-white hover:text-accent transition-colors">{value}</a>
                  ) : (
                    <p className="text-sm text-white">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-4 pt-2">
              {[
                { icon: Linkedin, href: contact.linkedin, label: 'LinkedIn' },
                { icon: Github, href: contact.github, label: 'GitHub' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex items-center gap-2 glass rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white border border-white/5 hover:border-accent/30 transition-all"
                >
                  <Icon size={16} /> {label} {href === '#' && <span className="text-gray-600 text-xs">(add URL)</span>}
                </motion.a>
              ))}
            </div>

            {/* Backend note */}
            <div className="flex gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-400/80">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>To activate the contact form, replace <code className="font-mono">YOUR_FORM_ID</code> in <code className="font-mono">Contact.jsx</code> with your <a href="https://formspree.io" target="_blank" rel="noreferrer" className="underline">Formspree</a> endpoint.</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            custom={1}
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 grad-border space-y-4"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {field('name', 'Full Name')}
              {field('email', 'Email Address', 'email')}
            </div>
            {field('subject', 'Subject')}
            {field('message', 'Message', 'text', 5)}

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(38,119,255,0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-accent to-cyan text-white font-semibold text-sm disabled:opacity-60"
            >
              <Send size={15} />
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </motion.button>

            {status === 'success' && (
              <p className="text-emerald-400 text-xs text-center">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-xs text-center">Something went wrong. Please try again or email directly.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
