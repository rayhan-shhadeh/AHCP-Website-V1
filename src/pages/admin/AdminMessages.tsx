import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { useLanguage } from '@/context/LanguageContext'
import {
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage,
  type ContactMessage,
} from '@/services/contact'

export function AdminMessages() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = () => {
    setLoading(true)
    getContactMessages().then((data) => {
      setMessages(data)
      setLoading(false)
    })
  }

  const handleMarkRead = async (id: string) => {
    try {
      await markMessageAsRead(id)
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m))
      )
    } catch {
      toast.error('Failed to update.')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDelete'))) return
    try {
      await deleteContactMessage(id)
      toast.success('Message deleted.')
      loadMessages()
    } catch {
      toast.error('Failed to delete.')
    }
  }

  return (
    <div className="min-h-screen bg-light pt-24 pb-12">
      <div className="container-custom px-4">
        <h1 className="font-heading font-bold text-3xl mb-8">{t('messages')}</h1>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-32 rounded-card" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-card shadow-card p-6 ${
                  !msg.read ? 'border-l-4 border-primary' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="font-semibold">{msg.name}</span>
                      <span className="text-gray-500">{msg.email}</span>
                      {msg.subject && (
                        <span className="text-primary">Re: {msg.subject}</span>
                      )}
                    </div>
                    <p className="text-gray-600 whitespace-pre-wrap">{msg.message}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {msg.createdAt
                        ? format(new Date(msg.createdAt), 'MMM d, yyyy HH:mm')
                        : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!msg.read && (
                      <button
                        onClick={() => handleMarkRead(msg.id!)}
                        className="text-sm text-primary hover:underline"
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(msg.id!)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      {t('delete')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {!loading && messages.length === 0 && (
          <p className="text-center text-gray-500 py-12">No messages yet.</p>
        )}
      </div>
    </div>
  )
}
