import { Link, Outlet, useLocation } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'

const adminNav = [
  { path: '/admin', labelKey: 'dashboard' },
  { path: '/admin/activities', labelKey: 'activities' },
  { path: '/admin/gallery', labelKey: 'gallery' },
  { path: '/admin/messages', labelKey: 'messages' },
]

export function AdminLayout() {
  const { t } = useLanguage()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-light">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-card">
        <div className="container-custom px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-heading font-bold text-primary">
              AHPC
            </Link>
            <nav className="flex gap-4">
              {adminNav.map(({ path, labelKey }) => (
                <Link
                  key={path}
                  to={path}
                  className={`font-medium ${
                    location.pathname === path ? 'text-primary' : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {t(labelKey)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
