import { Link } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'

const footerLinks = [
  { path: '/about', labelKey: 'about' },
  { path: '/programs', labelKey: 'programs' },
  { path: '/activities', labelKey: 'activities' },
  { path: '/gallery', labelKey: 'gallery' },
  { path: '/donate', labelKey: 'donate' },
  { path: '/contact', labelKey: 'contact' },
]

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-dark text-white">
      <div className="container-custom px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="AHPC" className="h-12 w-auto" />
              <span className="font-heading font-bold text-xl">AHPC</span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              {t('organizationName')} - {t('tagline')}
            </p>
            <p className="text-gray-400 text-sm">
              مخيم عسكر القديم - بجانب مدرسة قرطبة الثانوية للبنات، نابلس، فلسطين
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">{t('contact')}</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>+970 599 116 582</li>
              <li>+970 923 19 9816</li>
              <li>
                <a href="mailto:isaadtefelfalastini@gmail.com" className="hover:text-primary transition-colors">
                  isaadtefelfalastini@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/share/1Agb8p5Xji"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">{t('followUs')}</h4>
            <nav className="flex flex-wrap gap-4">
              {footerLinks.map(({ path, labelKey }) => (
                <Link
                  key={path}
                  to={path}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {t(labelKey)}
                </Link>
              ))}
            </nav>
            <Link
              to="/donate"
              className="inline-block mt-4 btn-accent"
            >
              {t('donateNow')}
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} {t('organizationName')}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
