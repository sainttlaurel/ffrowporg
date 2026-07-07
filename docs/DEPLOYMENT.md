# Deployment Guide - Dragons Project

This guide explains how to deploy the Dragons Project to GitHub and Vercel.

## Prerequisites
- GitHub account
- Vercel account (vercel.com)
- Git installed on your machine
- Node.js and npm installed

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and log in to your account
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `frowprojand` (or your preferred name)
5. Description: "Dragons Project - Premium Landing Page Design"
6. Choose "Public" or "Private"
7. Click "Create repository"
8. **Do NOT initialize with README** (we already have files)

## Step 2: Push Code to GitHub

Run these commands in the project directory:

```bash
# Add the remote repository (update USERNAME if different)
git remote add origin https://github.com/sainttlaurel/frowprojand.git

# Rename branch to main (if not already)
git branch -M main

# Push to GitHub
git push -u origin main
```

If you already have a remote set up, remove it first:
```bash
git remote remove origin
git remote add origin https://github.com/sainttlaurel/frowprojand.git
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Authenticate with Vercel:
```bash
vercel login
```

3. Deploy the project:
```bash
vercel
```

4. Follow the prompts:
   - Confirm the project name
   - Confirm the framework (Vite)
   - Accept default settings for build and output directories

### Option B: Using Vercel Dashboard (Web Interface)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Connect your GitHub account if not already connected
5. Select the `frowprojand` repository
6. Configure project:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click "Deploy"

## Step 4: Automatic Deployments

Once connected to Vercel:
- Every push to the `main` branch will trigger a new deployment
- Preview deployments are created for pull requests
- You can view deployment history in the Vercel dashboard

## Verification

After deployment:
1. Check GitHub: Your code should be visible at `https://github.com/sainttlaurel/frowprojand`
2. Check Vercel: Your live site will be at a URL like `https://frowprojand.vercel.app`

## Environment Variables (if needed)

To add environment variables:
1. Go to Vercel project settings
2. Navigate to "Environment Variables"
3. Add your variables
4. Redeploy the project

## Troubleshooting

**Build fails on Vercel:**
- Check the build log in Vercel dashboard
- Ensure all dependencies are in package.json
- Run `npm run build` locally to test

**GitHub push is rejected:**
- Ensure remote URL is correct: `git remote -v`
- Check GitHub credentials and permissions
- Use personal access token if SSH is not set up

## Additional Commands

```bash
# View deployment status
vercel status

# View logs
vercel logs

# Open project in browser
vercel open

# Check current branch
git branch

# View remote URL
git remote -v
```

For more help, visit:
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Documentation](https://docs.github.com)
- [Vite Documentation](https://vitejs.dev)
