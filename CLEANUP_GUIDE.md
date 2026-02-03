# Git Repository Cleanup Guide

## Current Situation

You have:
- **Master branch**: Strapi backend only (2 commits)
- **Feature branch** (`claude/bilingual-ngo-website-GrilI`): Backend + Frontend (3 commits)

The frontend folder was added to a feature branch and needs to be properly integrated.

## Recommended Solution: Option 1 ⭐

**Merge everything to master for a clean, unified project.**

### Current Project Structure
```
AHCP/
├── config/           # Strapi config
├── src/             # Strapi backend
├── frontend/        # Next.js frontend (NEW)
├── database/
├── public/
└── package.json     # Backend deps
```

This is a **monorepo** structure - both projects in one repository.

### Steps to Execute

1. **Checkout master:**
   ```bash
   git checkout master
   ```

2. **Merge the frontend changes:**
   ```bash
   git merge claude/bilingual-ngo-website-GrilI
   ```

3. **Push to GitHub:**
   ```bash
   git push origin master
   ```

4. **Clean up the feature branch (optional):**
   ```bash
   git branch -d claude/bilingual-ngo-website-GrilI
   git push origin --delete claude/bilingual-ngo-website-GrilI
   ```

### Result
- ✅ Master branch has both backend and frontend
- ✅ Clean git history (3 commits total)
- ✅ One repository, two projects
- ✅ Simple to manage

---

## Alternative Options

### Option 2: Reorganize as Explicit Monorepo

Move files to explicit `backend/` and `frontend/` directories:

```
AHCP/
├── backend/         # Strapi (moved here)
│   ├── config/
│   ├── src/
│   └── package.json
└── frontend/        # Next.js (already here)
    ├── app/
    └── package.json
```

**Use this if:** You want clear separation and plan to add more projects later.

**Run:** `bash option2-monorepo-structure.sh`

### Option 3: Start Fresh with Clean History

Squash all commits into a single clean commit.

**Use this if:** You want a minimal git history and haven't shared this repo with others.

**Run:** `bash option3-start-fresh.sh`

---

## Quick Decision Guide

Choose **Option 1** if:
- ✅ You want the simplest solution
- ✅ You're okay with the current structure
- ✅ You want to preserve git history

Choose **Option 2** if:
- ✅ You want explicit folder separation
- ✅ You might add more projects later
- ✅ You want deployment clarity

Choose **Option 3** if:
- ✅ You want a clean slate
- ✅ This is a new project (not shared with team)
- ✅ Git history doesn't matter

---

## After Cleanup

### Run the Project

**Backend (Strapi):**
```bash
# From project root
npm install
npm run develop
```
Runs at: http://localhost:1337

**Frontend (Next.js):**
```bash
# From project root
cd frontend
npm install
npm run dev
```
Runs at: http://localhost:3000

### Deploy

Both can be deployed to Vercel:
1. **Backend**: Deploy from root directory
2. **Frontend**: Deploy from `frontend/` directory

See `DEPLOYMENT.md` for details.

---

## Need Help?

**Check current status:**
```bash
git status
git log --oneline --graph --all
```

**See what's on each branch:**
```bash
git ls-tree -r master --name-only     # Master branch files
git ls-tree -r HEAD --name-only       # Current branch files
```

---

## Recommended: Just Do This! 🚀

```bash
# The simplest, cleanest solution
git checkout master
git merge claude/bilingual-ngo-website-GrilI
git push origin master

# Optional: Clean up
git branch -d claude/bilingual-ngo-website-GrilI
git push origin --delete claude/bilingual-ngo-website-GrilI
```

Done! Your repository is now clean with both backend and frontend on master.
