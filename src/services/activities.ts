import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  type DocumentData,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from './firebase'

export interface Activity {
  id?: string
  title: string
  date: string
  category: string
  shortDescription: string
  fullDescription: string
  imageUrl: string
  createdAt?: string
  published?: boolean
}

const COLLECTION = 'activities'

export async function getActivities(
  category?: string,
  pageSize = 9,
  _lastDoc?: DocumentData
): Promise<{ activities: Activity[]; lastDoc: DocumentData | null }> {
  if (!db) {
    let activities = getMockActivities()
    if (category && category !== 'all') {
      activities = activities.filter((a) => a.category === category)
    }
    return { activities: activities.slice(0, pageSize), lastDoc: null }
  }
  const q = query(
    collection(db, COLLECTION),
    orderBy('date', 'desc'),
    limit(50)
  )
  const snapshot = await getDocs(q)
  let activities = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Activity))
  if (category && category !== 'all') {
    activities = activities.filter((a) => a.category === category)
  }
  const paginated = activities.slice(0, pageSize)
  const last = snapshot.docs[snapshot.docs.length - 1]
  return { activities: paginated, lastDoc: last || null }
}

export async function getLatestActivities(count = 3): Promise<Activity[]> {
  if (!db) return getMockActivities().slice(0, count)
  const q = query(
    collection(db, COLLECTION),
    orderBy('date', 'desc'),
    limit(count)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Activity))
}

export async function getActivityById(id: string): Promise<Activity | null> {
  if (!db) return getMockActivities().find((a) => a.id === id) || null
  const docRef = doc(db, COLLECTION, id)
  const snap = await getDoc(docRef)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Activity
}

export async function createActivity(activity: Omit<Activity, 'id'>): Promise<string> {
  if (!db) throw new Error('Firebase not configured')
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...activity,
    published: activity.published ?? true,
    createdAt: new Date().toISOString(),
  })
  return docRef.id
}

export async function updateActivity(id: string, data: Partial<Activity>): Promise<void> {
  if (!db) throw new Error('Firebase not configured')
  await updateDoc(doc(db, COLLECTION, id), data as Record<string, string | boolean | undefined>)
}

export async function deleteActivity(id: string): Promise<void> {
  if (!db) throw new Error('Firebase not configured')
  await deleteDoc(doc(db, COLLECTION, id))
}

export async function uploadActivityImage(file: File): Promise<string> {
  if (!storage) return '/placeholder.jpg'
  const storageRef = ref(storage, `activities/${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

function getMockActivities(): Activity[] {
  return [
    {
      id: '1',
      title: 'Summer Education Camp 2024',
      date: '2024-07-15',
      category: 'education',
      shortDescription: 'A two-week camp providing educational support and activities for 50 orphan children.',
      fullDescription: 'Our summer education camp brought together 50 orphan children for two weeks of learning, creativity, and fun. Activities included tutoring, arts and crafts, sports, and field trips.',
      imageUrl: '/placeholder.jpg',
      published: true,
    },
    {
      id: '2',
      title: 'Health Check-up Day',
      date: '2024-06-20',
      category: 'healthcare',
      shortDescription: 'Free medical check-ups and vaccinations for children in the community.',
      fullDescription: 'Partnering with local healthcare providers, we organized a comprehensive health check-up day. Over 80 children received vaccinations and general health assessments.',
      imageUrl: '/placeholder.jpg',
      published: true,
    },
    {
      id: '3',
      title: 'Winter Clothing Distribution',
      date: '2024-01-10',
      category: 'shelter',
      shortDescription: 'Distributed warm clothing and blankets to 100 families.',
      fullDescription: 'Thanks to generous donations, we distributed winter clothing, blankets, and essential supplies to 100 families in need during the cold winter months.',
      imageUrl: '/placeholder.jpg',
      published: true,
    },
  ]
}
