# AHCP Website Deployment Guide

Complete guide for deploying the AHCP bilingual NGO website.

## Project Overview

This project consists of two parts:
1. **Backend**: Strapi v5 CMS (in root directory)
2. **Frontend**: Next.js 15 website (in `frontend/` directory)

## Quick Start (Local Development)

### 1. Start Strapi Backend

```bash
# From project root
npm install
npm run develop
```

Strapi admin will be available at: http://localhost:1337/admin

### 2. Start Next.js Frontend

```bash
# From project root
cd frontend
npm install
npm run dev
```

Website will be available at: http://localhost:3000

## Production Deployment

### Option 1: Deploy Both to Vercel (Recommended)

#### Deploy Strapi Backend

1. **Prepare Strapi for Vercel:**

Create `vercel.json` in project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

2. **Deploy Strapi:**
   - Push to GitHub
   - Import to Vercel
   - Set root directory to `.` (project root)
   - Add environment variables:
     ```
     DATABASE_CLIENT=better-sqlite3
     HOST=0.0.0.0
     PORT=1337
     APP_KEYS=your-random-keys
     API_TOKEN_SALT=your-random-salt
     ADMIN_JWT_SECRET=your-random-secret
     TRANSFER_TOKEN_SALT=your-random-salt
     JWT_SECRET=your-random-secret
     ```
   - Deploy

3. **Note your Strapi URL:** `https://your-strapi.vercel.app`

#### Deploy Next.js Frontend

1. **Update Frontend Environment:**
   - Set `NEXT_PUBLIC_STRAPI_URL` to your Strapi Vercel URL

2. **Deploy Frontend:**
   - Import same repository to Vercel
   - Set root directory to `frontend`
   - Add environment variables:
     ```
     NEXT_PUBLIC_STRAPI_URL=https://your-strapi.vercel.app
     NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID=your_paypal_id
     ```
   - Deploy

### Option 2: Deploy to Separate Platforms

#### Strapi Options:
- **Railway**: Great for Strapi with PostgreSQL
- **Render**: Free tier available
- **DigitalOcean App Platform**: Reliable and affordable

#### Frontend Options:
- **Vercel**: Best for Next.js (recommended)
- **Netlify**: Great alternative
- **Cloudflare Pages**: Fast and free

## Environment Variables

### Strapi Backend (.env)

```env
# Server
HOST=0.0.0.0
PORT=1337

# Secrets (generate with: openssl rand -base64 32)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_random_salt
ADMIN_JWT_SECRET=your_random_secret
TRANSFER_TOKEN_SALT=your_random_salt
JWT_SECRET=your_random_secret

# Database
DATABASE_CLIENT=better-sqlite3
DATABASE_FILENAME=.tmp/data.db

# For production, use PostgreSQL:
# DATABASE_CLIENT=postgres
# DATABASE_HOST=your_db_host
# DATABASE_PORT=5432
# DATABASE_NAME=strapi
# DATABASE_USERNAME=strapi
# DATABASE_PASSWORD=your_password
# DATABASE_SSL=true
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-url.com
NEXT_PUBLIC_STRAPI_API_TOKEN=
NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID=your_paypal_button_id
```

## Database Setup for Production

### Using PostgreSQL (Recommended)

1. **Create a PostgreSQL database** (e.g., on Railway, Render, or Supabase)

2. **Update Strapi config/database.js:**

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    debug: false,
  },
});
```

3. **Install PostgreSQL client:**

```bash
npm install pg
```

## Media Storage for Production

### Using Cloudinary (Free Tier Available)

1. **Install plugin:**

```bash
npm install @strapi/provider-upload-cloudinary
```

2. **Configure `config/plugins.js`:**

```javascript
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
    },
  },
});
```

3. **Add environment variables:**

```env
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

## PayPal Donation Setup

1. **Create PayPal Business Account** (if you don't have one)

2. **Generate Donate Button:**
   - Visit: https://www.paypal.com/donate/buttons/manage
   - Create new button
   - Customize appearance
   - Get button ID

3. **Add to Frontend:**
   - Copy button ID
   - Add to `.env.local`: `NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID=your_id`

## Post-Deployment Checklist

### Strapi (Backend)

- [ ] Create admin account
- [ ] Configure CORS to allow frontend domain
- [ ] Set up public permissions for Activities and Articles
- [ ] Upload initial content (activities and news)
- [ ] Test API endpoints
- [ ] Enable image uploads

### Next.js (Frontend)

- [ ] Verify Strapi connection
- [ ] Test language switching (AR/EN)
- [ ] Add hero video and images
- [ ] Test all pages (home, about, activities, news, contact, donate)
- [ ] Verify PayPal donation button
- [ ] Test responsive design on mobile
- [ ] Run Lighthouse audit

## Domain Setup

### Custom Domain for Frontend

1. **Purchase domain** (e.g., isaadtefelfalastini.com)

2. **Add to Vercel:**
   - Go to project settings > Domains
   - Add your domain
   - Update DNS records as instructed

3. **Configure DNS:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Custom Domain for Strapi (Optional)

Similar process with your hosting provider (e.g., api.isaadtefelfalastini.com)

## Monitoring and Maintenance

### Recommended Tools

1. **Uptime Monitoring:**
   - UptimeRobot (free)
   - Better Uptime

2. **Error Tracking:**
   - Sentry (frontend & backend)
   - LogRocket (frontend)

3. **Analytics:**
   - Google Analytics
   - Plausible (privacy-friendly)

### Regular Maintenance

- [ ] Backup Strapi database weekly
- [ ] Update dependencies monthly
- [ ] Review and moderate content
- [ ] Monitor server costs
- [ ] Check broken links
- [ ] Update content regularly

## Troubleshooting

### Frontend Can't Connect to Strapi

1. Check CORS settings in Strapi `config/middlewares.js`
2. Verify `NEXT_PUBLIC_STRAPI_URL` is correct
3. Check Strapi public permissions

### Images Not Loading

1. Verify Strapi media upload is working
2. Check image URLs in browser console
3. Ensure Next.js `remotePatterns` includes Strapi domain

### PayPal Button Not Showing

1. Verify `NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID` is set
2. Check browser console for errors
3. Ensure PayPal script is loading

## Support Resources

- Next.js: https://nextjs.org/docs
- Strapi: https://docs.strapi.io
- Vercel: https://vercel.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

## Security Best Practices

- [ ] Use strong admin passwords
- [ ] Enable 2FA for admin accounts
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Regular security audits
- [ ] Limit API access with proper permissions

## Cost Estimation

### Free Tier Setup
- Frontend: Vercel (Free)
- Backend: Vercel/Railway (Free tier)
- Database: Railway (Free 500MB) or SQLite
- Media: Cloudinary (Free 25GB)
- Domain: ~$10-15/year

### Recommended Production Setup
- Frontend: Vercel Pro ($20/month)
- Backend: Railway ($5-10/month)
- Database: Railway/Supabase ($10/month)
- Media: Cloudinary ($0-25/month)
- Total: ~$35-65/month

---

For additional help, refer to the frontend README.md or contact the development team.
