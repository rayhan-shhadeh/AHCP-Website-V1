import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '@/context/LanguageContext'
import { getActivities } from '@/services/activities'
import { ActivityCard } from '@/components/ActivityCard'
import { ActivityCardSkeleton } from '@/components/LoadingSkeleton'
import type { Activity } from '@/services/activities'

const categories = [
  { value: 'all', labelKey: 'all' },
  { value: 'education', labelKey: 'education' },
  { value: 'healthcare', labelKey: 'healthcare' },
  { value: 'shelter', labelKey: 'shelter' },
  { value: 'food', labelKey: 'foodSecurity' },
]

export function Activities() {
  const { t } = useLanguage()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')

  useEffect(() => {
    setLoading(true)
    getActivities(category).then(({ activities: data }) => {
      setActivities(data)
      setLoading(false)
    })
  }, [category])

  return (
    <>
      <Helmet>
        <title>{t('activities')} - {t('organizationName')}</title>
        <meta name="description" content={`${t('activities')} - ${t('organizationName')}`} />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-bold text-4xl md:text-5xl text-dark mb-4"
          >
            {t('activities')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl"
          >
            Latest news and activities from our programs
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('filterBy')}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-button border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {t(c.labelKey)}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ActivityCardSkeleton key={i} />
              ))}
            </div>
          ) : activities.length === 0 ? (
            <p className="text-center text-gray-500 py-12">{t('noActivities')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((a, i) => (
                <ActivityCard key={a.id} activity={a} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
