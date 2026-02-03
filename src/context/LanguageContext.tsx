import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  lang: Language
  setLang: (l: Language) => void
  t: (key: string) => string
  dir: 'ltr' | 'rtl'
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    about: 'About Us',
    programs: 'Our Programs',
    activities: 'Activities',
    gallery: 'Gallery',
    donate: 'Donate',
    contact: 'Contact',
    donateNow: 'Donate Now',
    ourMission: 'Our Mission',
    supportingOrphans: 'Supporting orphan children with education, healthcare, and shelter',
    childrenHelped: 'Children Helped',
    familiesSupported: 'Families Supported',
    programsRun: 'Programs',
    yearsServing: 'Years Serving',
    latestActivities: 'Latest Activities',
    viewAll: 'View All',
    testimonials: 'Testimonials',
    makeADifference: 'Make a Difference Today',
    joinUs: 'Join us in bringing hope and happiness to orphan children in Palestine.',
    learnMore: 'Learn More',
    readMore: 'Read More',
    ourStory: 'Our Story',
    missionVision: 'Mission & Vision',
    ourValues: 'Our Values',
    team: 'Our Team',
    achievements: 'Timeline of Achievements',
    education: 'Education',
    healthcare: 'Healthcare',
    shelter: 'Shelter',
    foodSecurity: 'Food Security',
    all: 'All',
    filterBy: 'Filter by category',
    noActivities: 'No activities found.',
    noImages: 'No images in gallery.',
    impactBreakdown: 'Impact Breakdown',
    bankTransfer: 'Bank Transfer',
    donationFaq: 'Donation FAQ',
    sendMessage: 'Send Message',
    yourName: 'Your Name',
    yourEmail: 'Email',
    subject: 'Subject',
    message: 'Message',
    officeHours: 'Office Hours',
    location: 'Location',
    followUs: 'Follow Us',
    adminLogin: 'Admin Login',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Dashboard',
    addActivity: 'Add Activity',
    editActivity: 'Edit Activity',
    deleteActivity: 'Delete Activity',
    addImage: 'Add Image',
    deleteImage: 'Delete Image',
    messages: 'Messages',
    title: 'Title',
    date: 'Date',
    category: 'Category',
    shortDescription: 'Short Description',
    fullDescription: 'Full Description',
    caption: 'Caption',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    confirmDelete: 'Are you sure you want to delete?',
    organizationName: 'AHPC - Association for Happiness of the Palestinian Child',
    tagline: 'Supporting orphan children in Palestine',
  },
  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    programs: 'برامجنا',
    activities: 'الأنشطة',
    gallery: 'معرض الصور',
    donate: 'التبرع',
    contact: 'اتصل بنا',
    donateNow: 'تبرع الآن',
    ourMission: 'مهمتنا',
    supportingOrphans: 'دعم الأطفال الأيتام بالتعليم والرعاية الصحية والمأوى',
    childrenHelped: 'طفل تم مساعدتهم',
    familiesSupported: 'عائلة مدعومة',
    programsRun: 'برنامج',
    yearsServing: 'سنوات خدمة',
    latestActivities: 'أحدث الأنشطة',
    viewAll: 'عرض الكل',
    testimonials: 'شهادات',
    makeADifference: 'اصنع فرقاً اليوم',
    joinUs: 'انضم إلينا في إحضار الأمل والسعادة لأطفال فلسطين الأيتام.',
    learnMore: 'اعرف المزيد',
    readMore: 'اقرأ المزيد',
    ourStory: 'قصتنا',
    missionVision: 'المهمة والرؤية',
    ourValues: 'قيمنا',
    team: 'فريقنا',
    achievements: 'إنجازاتنا',
    education: 'التعليم',
    healthcare: 'الرعاية الصحية',
    shelter: 'المأوى',
    foodSecurity: 'الأمن الغذائي',
    all: 'الكل',
    filterBy: 'تصفية حسب الفئة',
    noActivities: 'لا توجد أنشطة.',
    noImages: 'لا توجد صور في المعرض.',
    impactBreakdown: 'تفصيل التأثير',
    bankTransfer: 'التحويل البنكي',
    donationFaq: 'أسئلة التبرع',
    sendMessage: 'إرسال رسالة',
    yourName: 'اسمك',
    yourEmail: 'البريد الإلكتروني',
    subject: 'الموضوع',
    message: 'الرسالة',
    officeHours: 'ساعات العمل',
    location: 'الموقع',
    followUs: 'تابعنا',
    adminLogin: 'تسجيل دخول المشرف',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    dashboard: 'لوحة التحكم',
    addActivity: 'إضافة نشاط',
    editActivity: 'تعديل النشاط',
    deleteActivity: 'حذف النشاط',
    addImage: 'إضافة صورة',
    deleteImage: 'حذف الصورة',
    messages: 'الرسائل',
    title: 'العنوان',
    date: 'التاريخ',
    category: 'الفئة',
    shortDescription: 'وصف قصير',
    fullDescription: 'الوصف الكامل',
    caption: 'التسمية',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    confirmDelete: 'هل أنت متأكد من الحذف؟',
    organizationName: 'جمعية إسعاد الطفل الفلسطيني',
    tagline: 'دعم الأطفال الأيتام في فلسطين',
  },
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('ahpc-lang') as Language | null
    return saved === 'ar' || saved === 'en' ? saved : 'en'
  })

  useEffect(() => {
    localStorage.setItem('ahpc-lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const setLang = (l: Language) => setLangState(l)
  const t = (key: string) => translations[lang][key] ?? key
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
