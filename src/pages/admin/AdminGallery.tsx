import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useLanguage } from '@/context/LanguageContext'
import {
  getGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
  uploadGalleryImage,
  type GalleryImage,
} from '@/services/gallery'

const categories = [
  { value: 'activities', labelKey: 'activities' },
  { value: 'education', labelKey: 'education' },
  { value: 'healthcare', labelKey: 'healthcare' },
  { value: 'shelter', labelKey: 'shelter' },
  { value: 'events', labelKey: 'activities' },
]

export function AdminGallery() {
  const { t } = useLanguage()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [newCaption, setNewCaption] = useState('')
  const [newCategory, setNewCategory] = useState('activities')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = () => {
    setLoading(true)
    getGalleryImages('all').then((data) => {
      setImages(data)
      setLoading(false)
    })
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      toast.error('Please select an image.')
      return
    }
    setUploading(true)
    try {
      const url = await uploadGalleryImage(selectedFile)
      await addGalleryImage({ url, caption: newCaption, category: newCategory })
      toast.success('Image added.')
      setShowForm(false)
      setNewCaption('')
      setSelectedFile(null)
      loadImages()
    } catch {
      toast.error('Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDelete'))) return
    try {
      await deleteGalleryImage(id)
      toast.success('Image deleted.')
      loadImages()
    } catch {
      toast.error('Failed to delete.')
    }
  }

  return (
    <div className="min-h-screen bg-light pt-24 pb-12">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="font-heading font-bold text-3xl text-dark">{t('gallery')}</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {t('addImage')}
          </button>
        </div>

        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            onSubmit={handleUpload}
            className="bg-white rounded-card shadow-card p-6 mb-8 space-y-4"
          >
            <h2 className="font-heading font-semibold text-xl">Upload Image</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('caption')}</label>
              <input
                type="text"
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                className="w-full rounded-button border px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('category')}</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full rounded-button border px-4 py-2"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {t(c.labelKey)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <button type="submit" disabled={uploading} className="btn-primary">
                {uploading ? 'Uploading...' : t('save')}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-600 hover:underline">
                {t('cancel')}
              </button>
            </div>
          </motion.form>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton h-40 rounded-card" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-card shadow-card overflow-hidden group"
              >
                <img
                  src={img.url || '/placeholder.jpg'}
                  alt={img.caption}
                  className="w-full h-40 object-cover"
                />
                <div className="p-2">
                  <p className="text-sm text-gray-600 line-clamp-2">{img.caption}</p>
                  <button
                    onClick={() => handleDelete(img.id!)}
                    className="text-red-600 text-sm mt-1 hover:underline"
                  >
                    {t('delete')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {!loading && images.length === 0 && (
          <p className="text-center text-gray-500 py-12">{t('noImages')}</p>
        )}
      </div>
    </div>
  )
}
