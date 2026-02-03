# Content Management Guide

This guide is for non-technical content managers who will be adding and updating content on the AHPC website through Strapi CMS.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Adding Activities](#adding-activities)
3. [Adding News Articles](#adding-news-articles)
4. [Image Upload Best Practices](#image-upload-best-practices)
5. [Bilingual Content Tips](#bilingual-content-tips)
6. [Publishing Content](#publishing-content)

## Getting Started

### Accessing Strapi Admin Panel

1. Navigate to your Strapi admin URL (typically `http://localhost:1337/admin` for local development)
2. Log in with your admin credentials
3. You'll see the Content Manager in the left sidebar

### Understanding the Interface

- **Content Manager**: Where you create and edit content
- **Content-Type Builder**: (Admin only) For creating new content types
- **Media Library**: Where all images and files are stored

## Adding Activities

Activities represent events, programs, or initiatives organized by AHPC.

### Step-by-Step Guide

1. **Navigate to Activities**
   - Click on "Content Manager" in the left sidebar
   - Click on "Activities" (or "الأنشطة" in Arabic)

2. **Create New Activity**
   - Click the "Create new entry" button (top right)
   - Fill in the following fields:

   **Required Fields:**
   - **Title** (العنوان): The activity name
     - Example: "Summer Camp 2024" / "معسكر صيفي 2024"
   - **Description** (الوصف): Detailed description of the activity
     - Use the rich text editor to format text
     - Add paragraphs, headings, lists, and links
   - **Date** (التاريخ): When the activity took place or will take place
     - Click the calendar icon to select a date

   **Optional Fields:**
   - **Images** (الصور): Upload multiple images
     - Click "Add an asset" or drag and drop images
     - Recommended: Upload 3-5 high-quality images
     - First image will be the featured image

3. **Localization (Bilingual Content)**
   - After saving, you can add translations
   - Click on the language switcher (AR/EN) at the top
   - Fill in the same fields in the other language
   - This ensures the activity appears correctly in both Arabic and English

4. **Save and Publish**
   - Click "Save" to save as draft
   - Click "Publish" to make it visible on the website
   - **Important**: Only published activities appear on the website

### Activity Best Practices

- **Titles**: Keep them concise (50-100 characters)
- **Descriptions**: Write 2-3 paragraphs describing:
  - What the activity was about
  - Who participated
  - What was accomplished
  - Impact or outcomes
- **Dates**: Use the actual date of the activity
- **Images**: 
  - Use high-resolution images (at least 1200px wide)
  - Show children participating (with permission)
  - Include diverse activities
  - First image should be the most representative

## Adding News Articles

News articles are updates, announcements, or stories about AHPC's work.

### Step-by-Step Guide

1. **Navigate to Articles**
   - Click on "Content Manager" in the left sidebar
   - Click on "Articles" (or "المقالات" in Arabic)

2. **Create New Article**
   - Click the "Create new entry" button
   - Fill in the following fields:

   **Required Fields:**
   - **Title** (العنوان): Article headline
     - Example: "New Educational Program Launched" / "إطلاق برنامج تعليمي جديد"
   - **Content** (المحتوى): Full article text
     - Use the rich text editor
     - Structure with headings, paragraphs, and lists
   - **Date** (التاريخ): Publication date
     - Usually today's date for new articles

   **Optional Fields:**
   - **Image** (صورة): Featured image for the article
     - Single image upload
     - Recommended size: 1200x630px (for social media sharing)

3. **Localization**
   - Add Arabic and English versions
   - Switch languages using the language switcher
   - Ensure both versions are complete before publishing

4. **Save and Publish**
   - Save as draft to review later
   - Publish to make it live on the website

### Article Best Practices

- **Titles**: Make them engaging and descriptive (60-80 characters)
- **Content Structure**:
  - Start with a compelling introduction
  - Use headings to break up sections
  - Include quotes or testimonials when possible
  - End with a call-to-action (donate, volunteer, etc.)
- **Length**: Aim for 300-800 words
- **Images**: Use one high-quality featured image

## Image Upload Best Practices

### Image Requirements

- **Format**: JPG or PNG
- **Size**: 
  - Minimum width: 1200px for featured images
  - Maximum file size: 5MB (optimize before uploading)
- **Aspect Ratio**:
  - Activities: 16:9 or 4:3
  - News articles: 16:9 (1200x630px ideal for social sharing)

### Image Optimization

Before uploading:
1. **Resize**: Use image editing software to resize large images
2. **Compress**: Use tools like TinyPNG or ImageOptim to reduce file size
3. **Name files**: Use descriptive names (e.g., `summer-camp-2024-01.jpg`)

### Image Content Guidelines

- **Permissions**: Only upload images where you have permission to use them
- **Children**: Ensure you have parental/guardian consent
- **Quality**: Use clear, well-lit photos
- **Relevance**: Images should relate to the content
- **Diversity**: Show diverse participants and activities

### Uploading Images

1. **From Media Library**:
   - Go to Media Library
   - Click "Upload assets"
   - Select files or drag and drop
   - Add alt text for accessibility

2. **While Creating Content**:
   - In the content editor, click "Add an asset"
   - Upload new images or select from Media Library
   - Add descriptive alt text

## Bilingual Content Tips

### Creating Bilingual Content

1. **Start with One Language**: Create content in your primary language first
2. **Save**: Save the entry
3. **Switch Language**: Use the language switcher (AR/EN) in the top bar
4. **Translate**: Fill in all fields in the second language
5. **Review**: Ensure both versions are complete and accurate

### Translation Best Practices

- **Don't use auto-translate**: Write original content in each language
- **Cultural adaptation**: Adapt content culturally, not just linguistically
- **Consistency**: Use consistent terminology across all content
- **Review**: Have a native speaker review translations

### Common Fields to Translate

- Title
- Description/Content
- Alt text for images
- Any custom fields

## Publishing Content

### Draft vs. Published

- **Draft**: Saved but not visible on the website
- **Published**: Live and visible to website visitors

### Publishing Process

1. **Create Content**: Fill in all required fields
2. **Review**: Check spelling, grammar, and accuracy
3. **Add Images**: Upload and attach images
4. **Localize**: Add translations for both languages
5. **Publish**: Click the "Publish" button
6. **Verify**: Visit the website to confirm it appears correctly

### Unpublishing Content

- To temporarily hide content, click "Unpublish"
- Content remains in Strapi but won't appear on the website
- You can republish it later

### Editing Published Content

1. Find the content in Content Manager
2. Click to edit
3. Make changes
4. Click "Save" (changes go live immediately)
5. If you unpublish, make changes, then republish

## Content Calendar Suggestions

### Regular Content Updates

- **Activities**: Add new activities within 1-2 days of the event
- **News**: Publish news articles weekly or bi-weekly
- **Seasonal Content**: Update content for holidays and special occasions

### Content Ideas

**Activities:**
- Educational workshops
- Cultural events
- Sports activities
- Field trips
- Holiday celebrations
- Community service projects

**News:**
- Program announcements
- Success stories
- Volunteer spotlights
- Partnership news
- Impact reports
- Upcoming events

## Troubleshooting

### Content Not Appearing on Website

1. **Check Publication Status**: Ensure content is published (not draft)
2. **Check Language**: Verify both Arabic and English versions are published
3. **Check Date**: Ensure the date field is filled correctly
4. **Clear Cache**: Ask a developer to clear the website cache
5. **Check Permissions**: Verify Strapi permissions are set correctly

### Image Not Displaying

1. **Check File Size**: Ensure image is under 5MB
2. **Check Format**: Use JPG or PNG
3. **Check Upload**: Verify image uploaded successfully
4. **Check Alt Text**: Add descriptive alt text

### Translation Issues

1. **Check Language**: Ensure you're editing the correct language version
2. **Check All Fields**: Verify all fields are filled in both languages
3. **Check Publishing**: Both language versions must be published

## Getting Help

If you encounter issues:

1. **Check this guide** for common solutions
2. **Contact the development team** for technical issues
3. **Contact the content manager** for content-related questions

## Quick Reference

### Activity Checklist
- [ ] Title (AR & EN)
- [ ] Description (AR & EN)
- [ ] Date selected
- [ ] Images uploaded (3-5 recommended)
- [ ] Alt text added to images
- [ ] Both language versions published

### Article Checklist
- [ ] Title (AR & EN)
- [ ] Content (AR & EN)
- [ ] Date selected
- [ ] Featured image uploaded
- [ ] Alt text added to image
- [ ] Both language versions published

---

**Last Updated**: 2024
**For Questions**: Contact the development team
