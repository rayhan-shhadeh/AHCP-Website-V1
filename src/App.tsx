import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/AuthContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingDonateButton } from '@/components/FloatingDonateButton'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { AdminLayout } from '@/components/AdminLayout'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Programs } from '@/pages/Programs'
import { Activities } from '@/pages/Activities'
import { ActivityDetail } from '@/pages/ActivityDetail'
import { Gallery } from '@/pages/Gallery'
import { Donate } from '@/pages/Donate'
import { Contact } from '@/pages/Contact'
import { AdminLogin } from '@/pages/admin/AdminLogin'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { AdminActivities } from '@/pages/admin/AdminActivities'
import { ActivityForm } from '@/pages/admin/ActivityForm'
import { AdminGallery } from '@/pages/admin/AdminGallery'
import { AdminMessages } from '@/pages/admin/AdminMessages'

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingDonateButton />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Toaster position="top-center" />
            <Routes>
              <Route
                path="/"
                element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <MainLayout>
                    <About />
                  </MainLayout>
                }
              />
              <Route
                path="/programs"
                element={
                  <MainLayout>
                    <Programs />
                  </MainLayout>
                }
              />
              <Route
                path="/activities"
                element={
                  <MainLayout>
                    <Activities />
                  </MainLayout>
                }
              />
              <Route
                path="/activities/:id"
                element={
                  <MainLayout>
                    <ActivityDetail />
                  </MainLayout>
                }
              />
              <Route
                path="/gallery"
                element={
                  <MainLayout>
                    <Gallery />
                  </MainLayout>
                }
              />
              <Route
                path="/donate"
                element={
                  <MainLayout>
                    <Donate />
                  </MainLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <MainLayout>
                    <Contact />
                  </MainLayout>
                }
              />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="activities" element={<AdminActivities />} />
                <Route path="activities/new" element={<ActivityForm />} />
                <Route path="activities/edit/:id" element={<ActivityForm />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="messages" element={<AdminMessages />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </HelmetProvider>
  )
}
