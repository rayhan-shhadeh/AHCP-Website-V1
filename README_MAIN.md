# AHPC - Association for Happiness of the Palestinian Child

![AHPC Logo](./favicon.png)

A modern, professional, bilingual website for جمعية إسعاد الطفل الفلسطيني (AHPC), a non-profit organization dedicated to supporting orphan children in Palestine.

## 🌟 Overview

This is a full-stack web application built to showcase the activities, news, and mission of AHPC while providing an easy way for supporters to donate and stay connected.

### Organization Details

**جمعية إسعاد الطفل الفلسطيني (AHPC)**
- **Type**: Non-governmental organization (NGO)
- **Mission**: Cultural and educational charitable organization supporting orphan children
- **License**: Ministry of Interior and Ministry of Social Development
- **Location**: مخيم عسكر القديم - بجانب مدرسة قرطبة الثانوية للبنات، نابلس، فلسطين
- **Contact**:
  - Phone: +970 599 116 582, +970 923 19 9816
  - Email: isaadtefelfalastini@gmail.com
  - Website: www.isaadtefelfalastini.com
  - Facebook: facebook.com/share/1Agb8p5Xji

## 🎯 Features

### For Users
- ✅ Bilingual interface (Arabic/English) with RTL support
- ✅ Dynamic activities showcase with photo galleries
- ✅ News and updates section
- ✅ Easy PayPal donation integration
- ✅ Contact information and location map
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Professional NGO aesthetic with trust-building design

### For Administrators
- ✅ Easy content management via Strapi CMS
- ✅ Rich text editor for activities and news
- ✅ Multi-image upload support
- ✅ Draft and publish workflow
- ✅ No coding required for content updates

## 🏗️ Architecture

```
AHCP/
├── frontend/              # Next.js 15 frontend
│   ├── app/              # App router pages
│   ├── components/       # React components
│   ├── lib/             # Utilities and API client
│   ├── messages/        # i18n translations
│   └── public/          # Static assets
│
├── src/                  # Strapi v5 backend
│   ├── api/             # Content types
│   │   ├── activity/   # Activities content type
│   │   └── article/    # News/articles content type
│   ├── admin/          # Admin panel customization
│   └── extensions/     # Strapi extensions
│
├── config/              # Strapi configuration
├── database/           # Database files
└── public/            # Strapi uploads
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and npm
- Git

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd AHCP

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Configure Environment

**Backend (.env):**
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-keys-here
API_TOKEN_SALT=your-salt
ADMIN_JWT_SECRET=your-secret
JWT_SECRET=your-secret
```

**Frontend (frontend/.env.local):**
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID=your_paypal_id
```

### 3. Start Development Servers

**Terminal 1 - Start Strapi:**
```bash
npm run develop
```
Access admin at: http://localhost:1337/admin

**Terminal 2 - Start Next.js:**
```bash
cd frontend
npm run dev
```
Access website at: http://localhost:3000

### 4. Initial Setup

1. **Create Strapi Admin Account:**
   - Visit http://localhost:1337/admin
   - Create your first admin user

2. **Configure Permissions:**
   - Settings → Roles → Public
   - Enable `find` and `findOne` for Activities and Articles

3. **Add Content:**
   - Content Manager → Activities → Create new entry
   - Content Manager → Articles → Create new entry

4. **Add Media:**
   - Place hero video as `frontend/public/hero-video.mp4`
   - Place hero poster as `frontend/public/hero-poster.jpg`

## 📚 Documentation

- **[Frontend README](./frontend/README.md)** - Next.js frontend documentation
- **[Deployment Guide](./DEPLOYMENT.md)** - Complete deployment instructions
- **[Strapi Docs](https://docs.strapi.io)** - Official Strapi documentation
- **[Next.js Docs](https://nextjs.org/docs)** - Official Next.js documentation

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **i18n**: next-intl
- **Fonts**: Inter (English), Cairo (Arabic)

### Backend
- **CMS**: Strapi v5
- **Database**: SQLite (development) / PostgreSQL (production)
- **API**: RESTful API
- **Media**: Local storage / Cloudinary

### Infrastructure
- **Hosting**: Vercel (recommended)
- **Media Storage**: Cloudinary (optional)
- **Domain**: Custom domain support

## 📱 Pages

1. **Home** (`/` or `/ar`, `/en`)
   - Hero video section
   - About section with stats
   - Latest activities (3)
   - Latest news (3)
   - Donation call-to-action

2. **About** (`/about`)
   - Organization description
   - Mission and vision
   - Achievements
   - Call to action

3. **Activities** (`/activities`)
   - All activities grid
   - Individual activity pages with galleries

4. **News** (`/news`)
   - All news articles
   - Individual article pages

5. **Contact** (`/contact`)
   - Contact information
   - Location map
   - Social media links

6. **Donate** (`/donate`)
   - PayPal donation integration
   - Why donate section
   - Other ways to help

## 🎨 Design System

### Colors
- **Primary (Green)**: Trust, growth, hope - `#22c55e`
- **Secondary (Purple)**: Care, compassion - `#d946ef`
- **Trust (Blue)**: Reliability, stability - `#3b82f6`

### Typography
- **Arabic**: Cairo font family
- **English**: Inter font family
- **RTL Support**: Full right-to-left layout for Arabic

## 🔐 Security

- Environment variables for sensitive data
- Public API access restricted to read-only
- CORS configured for frontend domain
- Secure admin authentication
- HTTPS in production

## 📊 Content Management

### Adding an Activity

1. Log in to Strapi admin
2. Content Manager → Activities → Create new entry
3. Fill in:
   - **Title**: Activity name
   - **Description**: Rich text content
   - **Date**: Activity date
   - **Images**: Upload photos (multiple)
4. Save and **Publish**

### Adding News

1. Log in to Strapi admin
2. Content Manager → Articles → Create new entry
3. Fill in:
   - **Title**: Article headline
   - **Content**: Rich text content
   - **Date**: Publication date
   - **Image**: Featured image (single)
4. Save and **Publish**

## 🌍 Internationalization

The website supports two languages:
- **Arabic (ar)** - Default, RTL layout
- **English (en)** - LTR layout

To add/edit translations:
1. Edit `frontend/messages/ar.json` for Arabic
2. Edit `frontend/messages/en.json` for English

## 💰 Donation Setup

1. Create PayPal Business account
2. Generate Donate button at: https://www.paypal.com/donate/buttons
3. Copy button ID
4. Add to `frontend/.env.local`:
   ```
   NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID=your_button_id
   ```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

### Quick Deploy to Vercel

1. Push to GitHub
2. Import to Vercel (backend)
3. Import to Vercel (frontend with root: `frontend/`)
4. Configure environment variables
5. Deploy!

## 🤝 Contributing

This is a project for AHPC. For contributions:
1. Contact the organization
2. Follow code standards
3. Test thoroughly
4. Document changes

## 📝 License

Proprietary software for Association for Happiness of the Palestinian Child (AHPC).

## 📞 Support

For technical support or questions:
- Email: isaadtefelfalastini@gmail.com
- Phone: +970 599 116 582

---

Built with ❤️ for the children of Palestine.

**جمعية إسعاد الطفل الفلسطيني**
