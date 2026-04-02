# Blau Batch: Light Theme & Bright Hero Redesign

## Goal
Transition the entire `blaubatch-site` from its current deep "Dark Mode" (Navy backgrounds, white text, dark overlays) to a premium, clean "Light Mode" aesthetic. The site should feel modern, airy, and professional, while incorporating bright, immersive hero photography.

## Steps

### Phase 1: Global CSS Redesign [Claude Code]
1. Open `src/index.css`.
2. Keep `--navy: #141B3E;` but change the `body` background color from `#141B3E` to a clean off-white like `#FAFAFC` or `#FFFFFF`.
3. Change the `body` text color from `#fff` to a dark charcoal `#334155` or navy `#141B3E`.
4. Ensure the `--line` variable (currently white at 0.09) is updated to a dark line (e.g. `rgba(20,27,62,0.08)`) so borders remain visible entirely.
5. Update scrollbar styles to match a light theme.
**Definition of Done:** The whole site has a white background with dark, readable text.

### Phase 2: Invert Glassmorphism & UI Components [Claude Code]
1. Update `src/components/` and `src/components/shared/` files containing hardcoded `rgba(255,255,255,0.1)` backgrounds.
2. Convert light glassmorphism to dark glassmorphism: use `rgba(255,255,255,0.85)` with a delicate dark border (`rgba(0,0,0,0.06)`), or `rgba(20,27,62,0.03)` with `backdrop-filter: blur(8px)`.
3. Update specific text colors that were forced to `#fff` to `#141B3E` to ensure contrast (e.g., stats grids in `Hero.jsx`, button text colors).
4. Leave the logo exactly as it is (it may be hard to read for now, but user requested to review it first).
**Definition of Done:** All floating elements, buttons, and "glass" cards are visible, readable, and premium-looking on a white background.

### Phase 3: Bright Hero Redesign [Claude Code]
1. Open `src/components/Hero.jsx` and `src/components/shared/PageHero.jsx`.
2. Remove the heavy `rgba(10,14,40,0.72)` dimming gradients.
3. Instead of darkening the *entire* image, implement a localized dark or white blurred underlay *only* directly under the text container to ensure typography legibility. The right side of the screen should be fully transparent to allow bright hero photography to shine.
4. Set the text color in the Hero sections dynamically, or force it to Dark Navy since the backgrounds will now be bright/white images.
**Definition of Done:** Hero background images are clearly visible without screen-dimming overlays, while text remains legible.

### Phase 4: Sourcing Images [Antigravity]
1. Create 7 new premium industrial product photos using AI generation.
2. Verify visual contrast using browser tests.
**Definition of Done:** `public/images/heroes/` is populated with high-quality JPGs.

### Phase 5: High-End Industry Imagery & UI Polish [Claude Code]
1. Open `src/components/Industries.jsx`.
2. Remove emojis (📦, 🔧, 🌾, 🧵, 🏗️, ⚡, 🚗, 🛍️) from the `INDUSTRIES` array.
3. Instead of emojis, implement a rich visual thumbnail using the new macro photography found in `public/images/industries/` (e.g., `packaging.png`, `pipes.png`, `agriculture.png`, `textiles.png`, `construction.png`, `wire_cable.png`, `automotive.png`, `consumer_goods.png`).
4. Update the Industry card styling to be more premium: add a subtle hover gradient or border glow to replace the standard shadow. Ensure images have a sleek aspect ratio (e.g., 16:9) directly in the card or as a background with a clean overlay.
5. In the individual industry pages (e.g., `src/pages/industries/IndustryPage.jsx` or specific ones like `Packaging.jsx`), use the corresponding image from `public/images/industries/` as the `bgImage` for `<PageHero />`. 
**Definition of Done:** 
- The Industries section on the Home page is completely emoji-free and features beautiful macro thumbnails.
- Hovering over cards feels premium (subtle glowing borders or image zooms).
- Industry specific pages load the correct new backdrop imagery.
