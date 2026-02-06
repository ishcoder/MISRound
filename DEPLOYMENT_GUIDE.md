# 📘 Complete Deployment Guide - GitHub Pages

This guide will help you deploy the MIS Executive Assessment tool to GitHub Pages for free hosting.

## 🎯 Prerequisites

Before starting, ensure you have:
- [ ] GitHub account (free)
- [ ] Git installed on your computer
- [ ] Node.js 16+ installed
- [ ] Basic familiarity with command line

## 📋 Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** icon (top right) → **"New repository"**
3. Repository settings:
   - **Name**: `mis-executive-assessment` (or any name you prefer)
   - **Description**: "MIS Executive Skills Assessment Tool"
   - **Visibility**: Public (required for free GitHub Pages)
   - ✅ Check "Add a README file"
4. Click **"Create repository"**

### Step 2: Configure the Project

1. **Update vite.config.ts**:
   - Open the file `vite.config.ts`
   - Change line 6 to match your repository name:
   ```typescript
   base: '/mis-executive-assessment/', // Must match your exact repo name
   ```
   - If your repo name is different, update accordingly
   - **Important**: Keep the slashes `/` at start and end

### Step 3: Upload Code to GitHub

#### Option A: Using GitHub Web Interface (Easiest)

1. Go to your repository on GitHub
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop ALL project files
4. Scroll down, add commit message: "Initial project setup"
5. Click **"Commit changes"**

#### Option B: Using Command Line (Recommended)

```bash
# Navigate to your project folder
cd path/to/mis-assessment-deploy

# Initialize git
git init

# Add all files
git add .

# Commit files
git commit -m "Initial project setup"

# Add your GitHub repository as remote
# Replace 'yourusername' and 'mis-executive-assessment' with your details
git remote add origin https://github.com/yourusername/mis-executive-assessment.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** (top menu)
3. In left sidebar, click **"Pages"**
4. Under **"Build and deployment"**:
   - **Source**: Select "GitHub Actions"
5. GitHub Actions will now automatically build and deploy your site
6. Wait 2-3 minutes for the first deployment

### Step 5: Access Your Live Site

Your assessment will be available at:
```
https://yourusername.github.io/mis-executive-assessment/
```

Replace `yourusername` with your actual GitHub username and `mis-executive-assessment` with your repo name.

## 🔄 Making Updates

Whenever you make changes:

```bash
# Make your changes to files
# Then commit and push:

git add .
git commit -m "Description of changes"
git push

# GitHub Actions will automatically rebuild and deploy
```

## ⚙️ Alternative Deployment Methods

### Method 1: Using gh-pages Package

If you prefer manual deployment:

```bash
# Install gh-pages
npm install

# Deploy
npm run deploy
```

Then enable GitHub Pages:
- Go to Settings → Pages
- Source: Select "Deploy from a branch"
- Branch: Select `gh-pages`
- Click Save

### Method 2: Using Vercel (Alternative to GitHub Pages)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Import your repository
4. Framework: Select "Vite"
5. Deploy!

Your site will be live at: `https://project-name.vercel.app`

### Method 3: Using Netlify (Alternative)

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. "New site from Git" → Select your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy!

Your site will be live at: `https://project-name.netlify.app`

## 🎨 Customization Before Deployment

### Update Branding

1. **Title** - `index.html` (line 8):
   ```html
   <title>MIS Assessment | Your Company Name</title>
   ```

2. **Welcome Message** - `src/App.tsx` (line 137):
   ```tsx
   <h1>Your Company Assessment</h1>
   ```

3. **Colors** - Search for `from-blue-600` and replace with your brand colors

### Modify Questions

Edit `src/constants.ts`:
- Add new questions
- Modify existing ones
- Change categories
- Update correct answers

### Adjust Scoring

Edit `src/App.tsx` (around line 23):
- Change percentage thresholds
- Modify feedback messages
- Update recommendations

## 🐛 Troubleshooting

### Problem: Blank page after deployment

**Solution**: Check `vite.config.ts` - ensure `base` exactly matches repo name
```typescript
base: '/exact-repo-name/'  // Must match GitHub repo
```

### Problem: 404 Error

**Solution**: 
1. Ensure GitHub Pages is enabled (Settings → Pages)
2. Wait 5 minutes after first deployment
3. Clear browser cache (Ctrl+Shift+Delete)

### Problem: CSS not loading

**Solution**: Check browser console (F12) for errors. Usually means `base` path is wrong.

### Problem: Build fails on GitHub Actions

**Solution**: 
1. Check the Actions tab for error details
2. Ensure `package.json` has all dependencies
3. Try building locally first: `npm run build`

### Problem: Can't push to GitHub

**Solution**:
```bash
# Check remote
git remote -v

# If wrong, remove and re-add
git remote remove origin
git remote add origin https://github.com/yourusername/repo.git

# Push
git push -u origin main
```

## 🔒 Security Notes

- All processing is client-side (no server needed)
- No data is stored or transmitted
- No API keys required
- No backend costs
- GDPR compliant (no tracking)

## 📊 Monitoring Usage

To track usage (optional):
1. Add Google Analytics
2. Add in `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🚀 Performance Tips

1. **Image Optimization**: If adding images, use WebP format
2. **Caching**: GitHub Pages automatically caches static assets
3. **CDN**: GitHub Pages uses Fastly CDN globally
4. **HTTPS**: Automatically enabled, no setup needed

## 📱 Mobile Testing

Test on multiple devices:
- Chrome DevTools (F12 → Toggle device toolbar)
- Real devices
- [BrowserStack](https://www.browserstack.com/free-trial) (free trial)

## ✅ Pre-Deployment Checklist

Before going live:
- [ ] Test all questions work correctly
- [ ] Verify scoring logic
- [ ] Check mobile responsiveness
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Update company branding
- [ ] Test submission flow
- [ ] Check print functionality
- [ ] Review feedback messages
- [ ] Verify `base` path in vite.config.ts
- [ ] Test locally with `npm run build && npm run preview`

## 🎉 Post-Deployment

After deployment:
1. Test the live site thoroughly
2. Share the URL with your team
3. Monitor for any issues
4. Collect feedback
5. Make improvements

## 📞 Need Help?

- **GitHub Pages Docs**: https://docs.github.com/pages
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev

## 🔄 Updating the Assessment

To add new questions or make changes:

1. Edit the files locally
2. Test with `npm run dev`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Added new questions"
   git push
   ```
4. Wait 2-3 minutes for automatic deployment

## 💡 Pro Tips

1. **Custom Domain**: You can use your own domain (fintrust-assessment.com)
   - Add CNAME file in public folder
   - Configure DNS settings

2. **Analytics**: Track completion rates and performance

3. **Versioning**: Tag releases for tracking:
   ```bash
   git tag -a v1.0 -m "Initial release"
   git push --tags
   ```

4. **Backups**: GitHub automatically backs up your code

5. **Collaboration**: Invite team members to the repository

---

**Congratulations!** 🎊 Your assessment tool is now live and accessible worldwide, completely free of cost!
