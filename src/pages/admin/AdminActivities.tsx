import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useLanguage } from '@/context/LanguageContext'
import {
  getActivities,
  deleteActivity,
  type Activity,
} from '@/services/activities'

export function AdminActivities() {
  const { t } = useLanguage()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadActivities()
  }, [])

  const loadActivities = () => {
    setLoading(true)
    getActivities('all', 50).then(({ activities: data }) => {
      setActivities(data)
      setLoading(false)
    })
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`${t('confirmDelete')} "${title}"?`)) return
    try {
      await deleteActivity(id!)
      toast.success('Activity deleted.')
      loadActivities()
    } catch {
      toast.error('Failed to delete.')
    }
  }

  return (
    <div className="min-h-screen bg-light pt-24 pb-12">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="font-heading font-bold text-3xl text-dark">{t('activities')}</h1>
          <Link to="/admin/activities/new" className="btn-primary">
            {t('addActivity')}
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-24 rounded-card" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-start px-4 py-3 font-semibold">{t('title')}</th>
                    <th className="text-start px-4 py-3 font-semibold">{t('date')}</th>
                    <th className="text-start px-4 py-3 font-semibold">{t('category')}</th>
                    <th className="text-end px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((a) => (
                    <tr key={a.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">{a.title}</td>
                      <td className="px-4 py-3">{a.date}</td>
                      <td className="px-4 py-3">{a.category}</td>
                      <td className="px-4 py-3 text-end">
                        <Link
                          to={`/admin/activities/edit/${a.id}`}
                          className="text-primary hover:underline me-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(a.id!, a.title)}
                          className="text-red-600 hover:underline"
                        >
                          {t('delete')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {activities.length === 0 && (
              <p className="text-center text-gray-500 py-12">{t('noActivities')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
