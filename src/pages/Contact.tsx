import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { useLanguage } from '@/context/LanguageContext'
import { submitContactForm } from '@/services/contact'

export function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      await submitContactForm(form)
      toast.success('Message sent successfully! We will get back to you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>{t('contact')} - {t('organizationName')}</title>
        <meta name="description" content={`${t('contact')} ${t('organizationName')}`} />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-bold text-4xl md:text-5xl text-dark mb-4"
          >
            {t('contact')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl"
          >
            Get in touch with us
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-heading font-bold text-2xl mb-6">{t('sendMessage')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('yourName')} *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-button border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('yourEmail')} *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-button border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('subject')}</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-button border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('message')} *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full rounded-button border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Sending...' : t('sendMessage')}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-heading font-semibold text-lg mb-2">{t('location')}</h3>
                <p className="text-gray-600">
                  مخيم عسكر القديم - بجانب مدرسة قرطبة الثانوية للبنات، نابلس، فلسطين
                </p>
                <div className="mt-4 rounded-card overflow-hidden bg-gray-200 h-64">
                  <iframe
                    title="Location map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d434.68280029296875!2d35.2617!3d32.2219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151cf0b2e0a5a5a5%3A0x0!2z2KfZhNmF2YbZitix2YrYqSDZhNmE2K_Zitix2YrYqSDZhNmF2YbZitinYqSDZhNmE2YXYtdmI2YrYqSDYp9mE2LnYtdit2Kk!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg mb-2">{t('contact')}</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>+970 599 116 582</li>
                  <li>+970 923 19 9816</li>
                  <li>
                    <a href="mailto:isaadtefelfalastini@gmail.com" className="text-primary hover:underline">
                      isaadtefelfalastini@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg mb-2">{t('officeHours')}</h3>
                <p className="text-gray-600">Sunday - Thursday: 9:00 AM - 4:00 PM</p>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg mb-2">{t('followUs')}</h3>
                <a
                  href="https://facebook.com/share/1Agb8p5Xji"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Facebook
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
