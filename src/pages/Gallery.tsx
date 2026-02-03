import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '@/context/LanguageContext'
import { getGalleryImages } from '@/services/gallery'
import { GallerySkeleton } from '@/components/LoadingSkeleton'
import type { GalleryImage } from '@/services/gallery'

const categories = [
  { value: 'all', labelKey: 'all' },
  { value: 'activities', labelKey: 'activities' },
  { value: 'education', labelKey: 'education' },
  { value: 'healthcare', labelKey: 'healthcare' },
  { value: 'shelter', labelKey: 'shelter' },
  { value: 'events', labelKey: 'activities' },
]

export function Gallery() {
  const { t } = useLanguage()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    setLoading(true)
    getGalleryImages(category).then((data) => {
      setImages(data)
      setLoading(false)
    })
  }, [category])

  return (
    <>
      <Helmet>
        <title>{t('gallery')} - {t('organizationName')}</title>
        <meta name="description" content={`${t('gallery')} - ${t('organizationName')}`} />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary-50 to-white">
        <div className="container-custom px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-bold text-4xl md:text-5xl text-dark mb-4"
          >
            {t('gallery')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl"
          >
            Moments from our programs and community
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
            <GallerySkeleton />
          ) : images.length === 0 ? (
            <p className="text-center text-gray-500 py-12">{t('noImages')}</p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="break-inside-avoid mb-4"
                >
                  <button
                    onClick={() => setLightboxImage(img)}
                    className="block w-full text-start rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
                  >
                    <img
                      src={img.url || '/placeholder.jpg'}
                      alt={img.caption}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {img.caption && (
                      <div className="p-3 bg-white">
                        <p className="text-sm text-gray-600 line-clamp-2">{img.caption}</p>
                      </div>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[90vh]"
            >
              <img
                src={lightboxImage.url}
                alt={lightboxImage.caption}
                className="max-w-full max-h-[85vh] object-contain rounded"
              />
              {lightboxImage.caption && (
                <p className="text-white text-center mt-4">{lightboxImage.caption}</p>
              )}
            </motion.div>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 end-4 text-white text-2xl hover:opacity-80"
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
