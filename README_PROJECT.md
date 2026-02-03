# AHPC Website - Association for Happiness of the Palestinian Child

**جمعية إسعاد الطفل الفلسطيني**

A modern, professional nonprofit website for AHPC, supporting orphan children in Palestine with education, healthcare, and shelter.

## Quick Start

```bash
# Install
npm install

# Copy environment template
cp .env.example .env
# Edit .env with your Firebase credentials

# Run development server
npm run dev
```

Open http://localhost:5173

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **Firebase** (Auth, Firestore, Storage)
- **React Router**
- **Framer Motion**
- **TypeScript**

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, mission, stats, latest activities, testimonials |
| About | `/about` | Story, mission/vision, values, timeline |
| Programs | `/programs` | Education, healthcare, shelter, food security |
| Activities | `/activities` | Dynamic activity cards with filter |
| Activity Detail | `/activities/:id` | Full activity with markdown content |
| Gallery | `/gallery` | Masonry grid with lightbox |
| Donate | `/donate` | Donorbox embed, impact breakdown, bank transfer |
| Contact | `/contact` | Form, map, office info |
| Admin | `/admin` | Protected dashboard (login required) |

## Admin Panel

- **Login**: `/admin/login`
- **Activities**: Add, edit, delete with image upload
- **Gallery**: Upload images with captions and categories
- **Messages**: View contact form submissions

## Deployment

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for:

- Firebase setup
- Vercel deployment (free)
- Custom domain
- Donorbox integration

## Organization Info

- **Location**: مخيم عسكر القديم - بجانب مدرسة قرطبة الثانوية للبنات، نابلس، فلسطين
- **Phone**: +970 599 116 582, +970 923 19 9816
- **Email**: isaadtefelfalastini@gmail.com
- **Facebook**: facebook.com/share/1Agb8p5Xji

## License

Proprietary - Association for Happiness of the Palestinian Child (AHPC).
