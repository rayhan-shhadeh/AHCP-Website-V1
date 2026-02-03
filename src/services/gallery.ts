import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from './firebase'

export interface GalleryImage {
  id?: string
  url: string
  caption: string
  category: string
  createdAt?: string
}

const COLLECTION = 'gallery'

export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  if (!db) {
    let images = getMockGalleryImages()
    if (category && category !== 'all') {
      images = images.filter((img) => img.category === category)
    }
    return images
  }
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  let images = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryImage))
  if (category && category !== 'all') {
    images = images.filter((img) => img.category === category)
  }
  return images
}

export async function addGalleryImage(image: Omit<GalleryImage, 'id'>): Promise<string> {
  if (!db) throw new Error('Firebase not configured')
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...image,
    createdAt: new Date().toISOString(),
  })
  return docRef.id
}

export async function deleteGalleryImage(id: string): Promise<void> {
  if (!db) throw new Error('Firebase not configured')
  await deleteDoc(doc(db, COLLECTION, id))
}

export async function uploadGalleryImage(file: File): Promise<string> {
  if (!storage) return '/placeholder.jpg'
  const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

function getMockGalleryImages(): GalleryImage[] {
  return [
    { id: '1', url: '/placeholder.jpg', caption: 'Children at summer camp', category: 'activities' },
    { id: '2', url: '/placeholder.jpg', caption: 'Education session', category: 'education' },
    { id: '3', url: '/placeholder.jpg', caption: 'Health check-up day', category: 'healthcare' },
    { id: '4', url: '/placeholder.jpg', caption: 'Community gathering', category: 'events' },
    { id: '5', url: '/placeholder.jpg', caption: 'Art workshop', category: 'activities' },
    { id: '6', url: '/placeholder.jpg', caption: 'Distribution day', category: 'shelter' },
  ]
}
