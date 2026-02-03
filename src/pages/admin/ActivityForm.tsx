import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useLanguage } from '@/context/LanguageContext'
import {
  getActivityById,
  createActivity,
  updateActivity,
  uploadActivityImage,
  type Activity,
} from '@/services/activities'

const categories = [
  { value: 'education', labelKey: 'education' },
  { value: 'healthcare', labelKey: 'healthcare' },
  { value: 'shelter', labelKey: 'shelter' },
  { value: 'food', labelKey: 'foodSecurity' },
]

export function ActivityForm() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<Omit<Activity, 'id'>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'education',
    shortDescription: '',
    fullDescription: '',
    imageUrl: '',
  })

  useEffect(() => {
    if (id) {
      getActivityById(id).then((data) => {
        if (data) setForm(data)
      })
    }
  }, [id])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      const url = await uploadActivityImage(file)
      setForm((f) => ({ ...f, imageUrl: url }))
      toast.success('Image uploaded.')
    } catch {
      toast.error('Upload failed.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.shortDescription || !form.fullDescription) {
      toast.error('Please fill required fields.')
      return
    }
    setLoading(true)
    try {
      if (isEdit && id) {
        await updateActivity(id, form)
        toast.success('Activity updated.')
      } else {
        await createActivity(form)
        toast.success('Activity created.')
      }
      navigate('/admin/activities')
    } catch {
      toast.error('Failed to save.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-light pt-24 pb-12">
      <div className="container-custom px-4 max-w-2xl">
        <h1 className="font-heading font-bold text-3xl mb-8">
          {isEdit ? t('editActivity') : t('addActivity')}
        </h1>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-card shadow-card p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">{t('title')} *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-button border px-4 py-2 focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('date')} *</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full rounded-button border px-4 py-2 focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('category')}</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-button border px-4 py-2 focus:ring-2 focus:ring-primary"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {t(c.labelKey)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('shortDescription')} *</label>
            <input
              type="text"
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="w-full rounded-button border px-4 py-2 focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('fullDescription')} * (Markdown supported)</label>
            <textarea
              value={form.fullDescription}
              onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
              rows={8}
              className="w-full rounded-button border px-4 py-2 focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
              className="w-full"
            />
            {form.imageUrl && (
              <img src={form.imageUrl} alt="Preview" className="mt-2 h-32 object-cover rounded" />
            )}
          </div>
          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : t('save')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/activities')}
              className="px-4 py-2 text-gray-600 hover:underline"
            >
              {t('cancel')}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}
