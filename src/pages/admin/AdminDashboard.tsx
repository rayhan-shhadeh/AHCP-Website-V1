import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'

export function AdminDashboard() {
  const { user, signOut } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-light pt-24 pb-12">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="font-heading font-bold text-3xl text-dark">{t('dashboard')}</h1>
          <div className="flex gap-4">
            <span className="text-gray-600">{user?.email}</span>
            <button onClick={handleLogout} className="text-red-600 hover:underline">
              {t('logout')}
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/activities"
            className="bg-white rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow"
          >
            <div className="text-4xl mb-2">📋</div>
            <h2 className="font-heading font-semibold text-xl">{t('activities')}</h2>
            <p className="text-gray-600 text-sm mt-1">Add, edit, delete activities</p>
          </Link>
          <Link
            to="/admin/gallery"
            className="bg-white rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow"
          >
            <div className="text-4xl mb-2">🖼️</div>
            <h2 className="font-heading font-semibold text-xl">{t('gallery')}</h2>
            <p className="text-gray-600 text-sm mt-1">Manage gallery images</p>
          </Link>
          <Link
            to="/admin/messages"
            className="bg-white rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow"
          >
            <div className="text-4xl mb-2">✉️</div>
            <h2 className="font-heading font-semibold text-xl">{t('messages')}</h2>
            <p className="text-gray-600 text-sm mt-1">View contact form submissions</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
