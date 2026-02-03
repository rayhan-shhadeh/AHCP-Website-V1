import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'

const programs = [
  {
    id: 'education',
    titleKey: 'education',
    icon: '📚',
    description: 'We provide tutoring, school supplies, scholarships, and learning support to ensure orphan children can access quality education and build their futures.',
    highlights: ['Tutoring programs', 'School supplies distribution', 'Scholarship support', 'After-school activities'],
  },
  {
    id: 'healthcare',
    titleKey: 'healthcare',
    icon: '🏥',
    description: 'Our healthcare initiatives include regular check-ups, vaccinations, mental health support, and access to medical care for children in need.',
    highlights: ['Health check-ups', 'Vaccinations', 'Mental health support', 'Medical referrals'],
  },
  {
    id: 'shelter',
    titleKey: 'shelter',
    icon: '🏠',
    description: 'We support families with shelter assistance, winterization programs, and essential household items to ensure children have safe, warm homes.',
    highlights: ['Shelter assistance', 'Winter clothing distribution', 'Household essentials', 'Emergency support'],
  },
  {
    id: 'food',
    titleKey: 'foodSecurity',
    icon: '🍽️',
    description: 'Our food security program provides nutritious meals, food parcels, and nutritional support to families struggling to make ends meet.',
    highlights: ['Food parcels', 'Nutritional support', 'Community kitchens', 'Emergency food aid'],
  },
]

export function Programs() {
  const { t } = useLanguage()

  return (
    <>
      <Helmet>
        <title>{t('programs')} - {t('organizationName')}</title>
        <meta name="description" content={`${t('programs')} - ${t('organizationName')}`} />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary-50 to-white">
        <div className="container-custom px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-bold text-4xl md:text-5xl text-dark mb-4"
          >
            {t('programs')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl"
          >
            Comprehensive support for orphan children in Palestine
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-12">
            {programs.map((program, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-card shadow-card overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-1/3 bg-primary-50 flex items-center justify-center p-8">
                  <span className="text-6xl">{program.icon}</span>
                </div>
                <div className="md:w-2/3 p-8">
                  <h2 className="font-heading font-bold text-2xl text-dark mb-4">
                    {t(program.titleKey)}
                  </h2>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {program.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-secondary-700">
                        <span className="text-secondary">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/donate"
                    className="inline-block mt-6 text-primary font-semibold hover:underline"
                  >
                    {t('donateNow')} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
