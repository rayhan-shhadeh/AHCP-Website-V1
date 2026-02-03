import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '@/context/LanguageContext'

const impactAmounts = [
  { amount: 25, impact: 'Provides school supplies for one child' },
  { amount: 50, impact: 'Covers a health check-up for a child' },
  { amount: 100, impact: 'Supports a family with food for one month' },
  { amount: 250, impact: 'Funds educational materials for 5 children' },
  { amount: 500, impact: 'Provides winter clothing for 10 children' },
]

const faqs = [
  { q: 'Is my donation tax-deductible?', a: 'AHPC is a registered nonprofit. Please consult your local tax advisor for deductibility in your country.' },
  { q: 'How is my donation used?', a: '100% of donations go directly to our programs: education, healthcare, shelter, and food security for orphan children.' },
  { q: 'Can I donate by bank transfer?', a: 'Yes! See the bank details below for local and international transfers.' },
  { q: 'Is it safe to donate online?', a: 'We use secure payment processors. Your financial information is never stored on our servers.' },
]

export function Donate() {
  const { t } = useLanguage()
  const donorboxUrl = import.meta.env.VITE_DONORBOX_URL || 'https://donorbox.org/embed/ahpc-donate'

  return (
    <>
      <Helmet>
        <title>{t('donate')} - {t('organizationName')}</title>
        <meta name="description" content={`${t('donate')} to ${t('organizationName')}`} />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-bold text-4xl md:text-5xl text-dark mb-4"
          >
            {t('donate')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl"
          >
            Your generosity changes lives. Every donation helps orphan children in Palestine.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-card shadow-card p-6"
              >
                <h2 className="font-heading font-bold text-2xl mb-4">Donate via Donorbox</h2>
                <p className="text-gray-600 mb-4">
                  Secure online donations. You can also set up recurring monthly giving.
                </p>
                <div className="aspect-[4/3] min-h-[400px] bg-gray-100 rounded flex items-center justify-center">
                  <iframe
                    src={donorboxUrl}
                    name="donorbox"
                    allow="payment"
                    seamless
                    frameBorder="0"
                    scrolling="no"
                    className="w-full h-full min-h-[500px]"
                    title="Donorbox donation form"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Donorbox embed: Add your Donorbox campaign URL to <code className="bg-gray-100 px-1">VITE_DONORBOX_URL</code> in .env
                </p>
              </motion.div>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-heading font-bold text-2xl mb-4">{t('impactBreakdown')}</h2>
                <div className="space-y-3 mb-8">
                  {impactAmounts.map((item) => (
                    <div
                      key={item.amount}
                      className="bg-white rounded-card shadow-card p-4 border-l-4 border-primary"
                    >
                      <span className="font-bold text-primary">${item.amount}</span>
                      <p className="text-sm text-gray-600 mt-1">{item.impact}</p>
                    </div>
                  ))}
                </div>

                <h2 className="font-heading font-bold text-2xl mb-4">{t('bankTransfer')}</h2>
                <div className="bg-white rounded-card shadow-card p-6 text-sm">
                  <p className="font-semibold mb-2">Bank Details (Palestine)</p>
                  <p className="text-gray-600">
                    Account Name: جمعية إسعاد الطفل الفلسطيني (AHPC)<br />
                    Bank: [Add your bank name]<br />
                    Account: [Add account number]<br />
                    SWIFT: [Add SWIFT code]<br />
                    IBAN: [Add IBAN]
                  </p>
                  <p className="text-gray-500 mt-4 text-xs">
                    Contact us for updated bank details: isaadtefelfalastini@gmail.com
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-light">
        <div className="container-custom max-w-3xl">
          <h2 className="font-heading font-bold text-2xl mb-6">{t('donationFaq')}</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-card shadow-card p-4"
              >
                <summary className="font-semibold cursor-pointer">{faq.q}</summary>
                <p className="text-gray-600 mt-2 text-sm">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
