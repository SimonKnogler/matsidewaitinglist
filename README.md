# Motor-FSRS Landing Page

A premium dark-themed landing page with waitlist signup for the Motor-FSRS martial arts training app.

## Tech Stack

- **Framework**: Astro
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (waitlist storage)
- **Analytics**: Plausible (optional)
- **Deployment**: Vercel

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file with:

```env
# Supabase Configuration
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Analytics (Plausible) - Optional
PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
```

### 3. Set Up Supabase

Create these tables in your Supabase project:

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

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:4321`

### 5. Deploy to Vercel

```bash
npm run build
vercel deploy
```

## Project Structure

```
src/
├── components/
│   ├── Analytics.astro    # Plausible analytics
│   ├── FinalCTA.astro     # Final call-to-action section
│   ├── Features.astro     # Features grid
│   ├── Hero.astro         # Hero with waitlist form
│   ├── Problem.astro      # Problem section with forgetting curve
│   ├── Solution.astro     # Solution preview with app mockup
│   └── SocialProof.astro  # Research backing section
├── layouts/
│   └── Layout.astro       # Base layout with meta tags
├── lib/
│   └── supabase.ts        # Supabase client
├── pages/
│   ├── api/
│   │   ├── survey.ts      # Survey submission endpoint
│   │   └── waitlist.ts    # Waitlist signup endpoint
│   ├── index.astro        # Main landing page
│   └── survey.astro       # Post-signup survey page
└── styles/
    └── global.css         # Global styles and animations
```

## Data Collection

### Primary Form
- Email (required)
- Martial art (dropdown)
- Experience level (dropdown)
- UTM parameters (automatic)

### Post-Signup Survey
- Training frequency
- Biggest pain point
- Role (student/coach/gym owner)
- Willingness to pay
- Most exciting feature
- Referral source

## Analytics Events

If Plausible is configured, these events are tracked:
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page (30s, 60s, 120s, 300s)
- Form submit attempts

## Customization

### Colors
Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --color-accent: #8b5cf6;
  --color-accent-hover: #a78bfa;
  /* ... */
}
```

### Content
Edit component files in `src/components/` to update copy and features.

## License

Private project - All rights reserved
