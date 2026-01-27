# Deployment Guide

Step-by-step instructions to deploy your Motor-FSRS landing page.

## Prerequisites

- GitHub account (free)
- Vercel account (free)
- Supabase account (free tier available)

---

## Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"New Project"**
3. Sign in with GitHub (or create account)
4. Click **"New Project"**
5. Fill in:
   - **Name**: `motor-fsrs-landing` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
6. Click **"Create new project"** (takes ~2 minutes)

### 1.2 Create Database Tables

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Paste this SQL:

```sql
-- Waitlist signups
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  martial_art TEXT,
  experience_level TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  referral_source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

-- Survey responses (linked to waitlist)
CREATE TABLE survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  waitlist_id UUID REFERENCES waitlist(id),
  training_frequency TEXT,
  biggest_pain_point TEXT,
  role TEXT,
  would_pay TEXT,
  most_exciting_feature TEXT,
  heard_about_us TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous users
CREATE POLICY "Allow anonymous inserts" ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts" ON survey_responses FOR INSERT WITH CHECK (true);

-- Allow reading count
CREATE POLICY "Allow count reads" ON waitlist FOR SELECT USING (true);
```

4. Click **"Run"** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

### 1.3 Get Your Supabase Credentials

1. Go to **Settings** → **API** (left sidebar)
2. Copy these values (you'll need them in Step 3):
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

---

## Step 2: Push Code to GitHub

### 2.1 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **"+"** → **"New repository"**
3. Fill in:
   - **Repository name**: `SportApp-Landing` (or your choice)
   - **Visibility**: Public or Private
   - **DO NOT** initialize with README (we already have one)
4. Click **"Create repository"**

### 2.2 Push Your Code

Open terminal in the landing page directory and run:

```bash
cd /Users/simonknogler/Desktop/SportApp-Landing

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/SportApp-Landing.git

# Push to GitHub
git push -u origin main
```

**Note**: If you get an authentication error, GitHub may require a Personal Access Token instead of password. See: [GitHub Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

## Step 3: Deploy to Vercel

### 3.1 Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account

### 3.2 Import Your Project

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find and select your `SportApp-Landing` repository
3. Click **"Import"**

### 3.3 Configure Environment Variables

**Before deploying**, add your Supabase credentials:

1. In the **"Configure Project"** screen, scroll to **"Environment Variables"**
2. Add these variables:

| Name | Value |
|------|-------|
| `PUBLIC_SUPABASE_URL` | Your Supabase Project URL (from Step 1.3) |
| `PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon public key (from Step 1.3) |

3. Click **"Add"** for each variable
4. (Optional) Add `PUBLIC_PLAUSIBLE_DOMAIN` if using Plausible analytics

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait ~2-3 minutes for build to complete
3. You'll get a URL like: `https://sportapp-landing.vercel.app`

### 3.5 Verify Deployment

1. Visit your deployment URL
2. Test the waitlist form:
   - Enter an email
   - Select martial art and experience level
   - Submit
3. Check Supabase:
   - Go to **Table Editor** → **waitlist**
   - You should see your test entry!

---

## Step 4: Set Up Custom Domain (Optional)

### 4.1 Add Domain in Vercel

1. In Vercel project dashboard, go to **Settings** → **Domains**
2. Enter your domain (e.g., `motorfsrs.com`)
3. Click **"Add"**

### 4.2 Configure DNS

Vercel will show you DNS records to add. Typically:

- **A Record**: `@` → `76.76.21.21`
- **CNAME Record**: `www` → `cname.vercel-dns.com`

Add these in your domain registrar's DNS settings (GoDaddy, Namecheap, etc.)

---

## Step 5: Set Up Analytics (Optional)

### 5.1 Plausible Analytics

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Copy your domain name
4. In Vercel, add environment variable:
   - `PUBLIC_PLAUSIBLE_DOMAIN` = `your-domain.com`
5. Redeploy (Vercel → Deployments → ... → Redeploy)

---

## Troubleshooting

### Form Not Working?

1. Check browser console (F12) for errors
2. Verify Supabase credentials in Vercel environment variables
3. Check Supabase RLS policies are set correctly
4. Test API endpoint directly: `https://your-site.vercel.app/api/waitlist`

### Build Fails?

1. Check Vercel build logs
2. Ensure all dependencies are in `package.json`
3. Verify `astro.config.mjs` has Vercel adapter

### Database Errors?

1. Verify tables exist in Supabase SQL Editor
2. Check RLS policies are enabled and allow inserts
3. Test with Supabase API directly using their docs

---

## Quick Reference

**Supabase Dashboard**: [app.supabase.com](https://app.supabase.com)  
**Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)  
**GitHub Repos**: [github.com](https://github.com)

---

## Next Steps After Deployment

1. ✅ Test waitlist form end-to-end
2. ✅ Test survey submission
3. ✅ Set up email notifications (optional - Supabase has webhooks)
4. ✅ Monitor analytics
5. ✅ Share your landing page URL!

---

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Astro Docs**: [docs.astro.build](https://docs.astro.build)
