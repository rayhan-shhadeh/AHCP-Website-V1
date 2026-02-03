import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { useLanguage } from '@/context/LanguageContext'
import type { Activity } from '@/services/activities'

interface ActivityCardProps {
  activity: Activity
  index?: number
}

export function ActivityCard({ activity, index = 0 }: ActivityCardProps) {
  const { t, lang } = useLanguage()
  const dateStr = activity.date
  const formattedDate = dateStr ? format(new Date(dateStr), 'MMM d, yyyy') : ''

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/activities/${activity.id}`} className="block">
        <div className="rounded-card overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <img
              src={activity.imageUrl || '/placeholder.jpg'}
              alt={activity.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-2 start-2 bg-primary/90 text-white text-xs px-2 py-1 rounded">
              {formattedDate}
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-heading font-semibold text-lg text-dark group-hover:text-primary transition-colors line-clamp-2">
              {activity.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-1">
              {activity.shortDescription}
            </p>
            <span className="text-primary font-medium text-sm mt-2 inline-flex items-center gap-1">
              {t('readMore')}
              <span className="group-hover:translate-x-1 transition-transform" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
