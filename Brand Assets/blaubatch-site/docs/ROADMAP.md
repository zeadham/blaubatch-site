# Blau Batch: Publishing Roadmap 🚀

This is the comprehensive checklist for Claude Code to execute the completion and deployment of the website.

## Phase 1: Solidify the Light Theme
1. **Global CSS (`index.css`)**: 
   - Change the `body` background color to `#FAFAFC` or `#FFFFFF`.
   - Update text color to a dark charcoal `#334155` or navy `#141B3E`.
2. **Glassmorphism Inversion**:
   - Update `src/components/` and `src/components/shared/` files containing hardcoded `rgba(255,255,255,0.1)` backgrounds.
   - Convert to dark glassmorphism (e.g. `rgba(20,27,62,0.03)` with `backdrop-filter: blur(8px)` or `rgba(255,255,255,0.85)` with a faint shadow/border).
   - Update white text (`#fff`) over these sections to deep navy so it remains readable.
   - *Leave the Navbar logo images exactly as they are for now.*

## Phase 2: Photography Integration & Hero Redesign
1. Un-dim the Heroes: In `Hero.jsx` and `PageHero.jsx`, remove the heavy `rgba(10,14,40,0.72)` dimming gradients. Give the text container a soft white underlay/blur if needed for contrast, but let the image shine on the right.
2. The AI-generated photography is now located in `public/images/heroes/` (home.png, white.png, black.png, colour.png, filler.png, additive.png).
3. Update `Hero.jsx` to use `/images/heroes/home.png` instead of the Unsplash URL.
4. Update the pages in `src/pages/` to pass the correct image to the `bgImage` prop of `<PageHero />`. 
   - Keep placeholders for Industries, or reuse `home.png` for them.

## Phase 3: Forms & Backend Verification
1. Open `netlify/functions/send-quote.js` and verify it expects the payload from `<QuoteForm />` correctly.
2. Create an `.env.example` file in the project root listing the required environment variables for Netlify (e.g., `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`).

## Definition of Done for Claude Code
After running `npm run lint` and `npm run dev`, make sure there are no errors. 
Inform Adham to hand back to Antigravity so Antigravity can run Browser tests.
