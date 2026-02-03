import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export function FloatingDonateButton() {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 end-6 z-40"
    >
      <Link
        to="/donate"
        className="flex items-center gap-2 bg-accent hover:bg-accent-600 text-white font-bold py-3 px-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="text-lg">❤️</span>
        <span>{t('donateNow')}</span>
      </Link>
    </motion.div>
  )
}
