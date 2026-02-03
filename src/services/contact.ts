import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { db } from './firebase'

export interface ContactMessage {
  id?: string
  name: string
  email: string
  subject: string
  message: string
  read?: boolean
  createdAt?: string
}

const COLLECTION = 'contactMessages'

export async function submitContactForm(data: Omit<ContactMessage, 'id' | 'read' | 'createdAt'>): Promise<string> {
  if (!db) {
    console.warn('Firebase not configured. Message not saved.')
    return ''
  }
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    read: false,
    createdAt: new Date().toISOString(),
  })
  return docRef.id
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (!db) return []
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ContactMessage))
}

export async function markMessageAsRead(id: string): Promise<void> {
  if (!db) return
  await updateDoc(doc(db, COLLECTION, id), { read: true })
}

export async function deleteContactMessage(id: string): Promise<void> {
  if (!db) throw new Error('Firebase not configured')
  await deleteDoc(doc(db, COLLECTION, id))
}
