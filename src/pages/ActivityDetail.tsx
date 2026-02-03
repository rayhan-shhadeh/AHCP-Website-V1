import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { useLanguage } from '@/context/LanguageContext'
import { getActivityById } from '@/services/activities'
import type { Activity } from '@/services/activities'

export function ActivityDetail() {
  const { id } = useParams<{ id: string }>()
  const { t } = useLanguage()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getActivityById(id).then((data) => {
      setActivity(data || null)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="pt-32 section-padding">
        <div className="container-custom">
          <div className="skeleton h-96 rounded-card" />
        </div>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="pt-32 section-padding text-center">
        <p className="text-gray-500">Activity not found.</p>
        <Link to="/activities" className="text-primary mt-4 inline-block">← Back to Activities</Link>
      </div>
    )
  }

  const formattedDate = activity.date ? format(new Date(activity.date), 'MMMM d, yyyy') : ''

  return (
    <>
      <Helmet>
        <title>{activity.title} - {t('organizationName')}</title>
        <meta name="description" content={activity.shortDescription} />
        <meta property="og:title" content={activity.title} />
        <meta property="og:description" content={activity.shortDescription} />
        <meta property="og:image" content={activity.imageUrl} />
      </Helmet>

      <section className="pt-32 pb-8">
        <div className="container-custom px-4">
          <Link to="/activities" className="text-primary hover:underline mb-4 inline-block">
            ← {t('activities')}
          </Link>
        </div>
      </section>

      <article className="section-padding pt-0">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-card overflow-hidden shadow-card mb-8"
          >
            <img
              src={activity.imageUrl || '/placeholder.jpg'}
              alt={activity.title}
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="p-6 md:p-8">
              <span className="text-primary font-medium">{formattedDate}</span>
              <span className="mx-2">•</span>
              <span className="text-gray-600">{activity.category}</span>
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-dark mt-2">
                {activity.title}
              </h1>
              <p className="text-xl text-gray-600 mt-4">{activity.shortDescription}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            <ReactMarkdown>{activity.fullDescription}</ReactMarkdown>
          </motion.div>
        </div>
      </article>
    </>
  )
}
