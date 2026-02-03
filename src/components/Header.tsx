import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const navLinks = [
  { path: '/', labelKey: 'home' },
  { path: '/about', labelKey: 'about' },
  { path: '/programs', labelKey: 'programs' },
  { path: '/activities', labelKey: 'activities' },
  { path: '/gallery', labelKey: 'gallery' },
  { path: '/donate', labelKey: 'donate' },
  { path: '/contact', labelKey: 'contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t, lang, setLang } = useLanguage()
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-card">
      <div className="container-custom px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="AHPC" className="h-10 md:h-12 w-auto" />
            <span className="font-heading font-bold text-primary text-lg md:text-xl hidden sm:inline">
              AHPC
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ path, labelKey }) => (
              <Link
                key={path}
                to={path}
                className={`font-medium transition-colors ${
                  location.pathname === path ? 'text-primary' : 'text-dark hover:text-primary'
                }`}
              >
                {t(labelKey)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="text-sm font-medium text-dark hover:text-primary px-2 py-1 rounded"
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <Link
              to="/donate"
              className="btn-primary hidden sm:inline-flex text-sm py-2 px-4"
            >
              {t('donateNow')}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-dark"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <nav className="container-custom px-4 py-4 flex flex-col gap-2">
              {navLinks.map(({ path, labelKey }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 font-medium ${
                    location.pathname === path ? 'text-primary' : 'text-dark'
                  }`}
                >
                  {t(labelKey)}
                </Link>
              ))}
              <Link
                to="/donate"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-2 text-center"
              >
                {t('donateNow')}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
