import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '@/context/LanguageContext'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { getLatestActivities } from '@/services/activities'
import { useEffect, useState } from 'react'
import { ActivityCard } from '@/components/ActivityCard'
import type { Activity } from '@/services/activities'

const stats = [
  { key: 'childrenHelped', value: 1250, suffix: '+' },
  { key: 'familiesSupported', value: 320, suffix: '+' },
  { key: 'programsRun', value: 12, suffix: '' },
  { key: 'yearsServing', value: 15, suffix: '+' },
]

const testimonials = [
  {
    quote: 'AHPC has transformed the lives of so many children. Their dedication is truly inspiring.',
    author: 'International Donor',
  },
  {
    quote: 'The education programs gave my children hope for a better future. We are forever grateful.',
    author: 'Beneficiary Parent',
  },
  {
    quote: 'Transparent, effective, and making real impact. Proud to support AHPC.',
    author: 'Community Partner',
  },
]

export function Home() {
  const { t } = useLanguage()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLatestActivities(3).then((data) => {
      setActivities(data)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>{t('organizationName')} - {t('tagline')}</title>
        <meta name="description" content={t('supportingOrphans')} />
        <meta property="og:title" content={t('organizationName')} />
        <meta property="og:description" content={t('supportingOrphans')} />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 container-custom px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-bold text-4xl md:text-6xl mb-4"
          >
            {t('organizationName')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            {t('supportingOrphans')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link to="/donate" className="btn-accent text-lg px-8 py-4 inline-block">
              {t('donateNow')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">
              {t('ourMission')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('supportingOrphans')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ key, value, suffix }) => (
              <StatCard key={key} labelKey={key} value={value} suffix={suffix} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Activities */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="font-heading font-bold text-3xl text-dark">
              {t('latestActivities')}
            </h2>
            <Link to="/activities" className="text-primary font-semibold hover:underline">
              {t('viewAll')}
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton h-80 rounded-card" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activities.map((a, i) => (
                <ActivityCard key={a.id} activity={a} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <h2 className="font-heading font-bold text-3xl text-dark text-center mb-12">
            {t('testimonials')}
          </h2>
          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            {t('makeADifference')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t('joinUs')}
          </p>
          <Link to="/donate" className="btn-accent bg-white text-primary hover:bg-gray-100">
            {t('donateNow')}
          </Link>
        </div>
      </section>
    </>
  )
}

function StatCard({
  labelKey,
  value,
  suffix,
}: {
  labelKey: string
  value: number
  suffix: string
}) {
  const { count, ref } = useAnimatedCounter(value)
  const { t } = useLanguage()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-heading font-bold mb-2">
        {count}{suffix}
      </div>
      <div className="text-primary-100">{t(labelKey)}</div>
    </motion.div>
  )
}

function TestimonialsCarousel({
  items,
}: {
  items: { quote: string; author: string }[]
}) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), 5000)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-card p-8 shadow-card text-center"
      >
        <p className="text-xl text-gray-700 italic mb-4">"{items[active].quote}"</p>
        <p className="text-primary font-semibold">— {items[active].author}</p>
      </motion.div>
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === active ? 'bg-primary' : 'bg-gray-300'
            }`}
            aria-label={`View testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
