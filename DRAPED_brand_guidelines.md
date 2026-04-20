# DRAPED — Brand & Design System Guidelines
> Upload this file to Claude Code and reference it in every prompt with:
> "Follow the DRAPED brand guidelines in DRAPED_brand_guidelines.md"

---

## Brand Identity

**Product:** DRAPED — a mobile-first marketplace for buying, selling, and renting South Asian (and culturally adjacent) occasion wear.

**Brand feeling:** Clean and trustworthy. Luxurious and aspirational. Editorial restraint — like a trusted authentication house, not a fast-fashion app.

**Closest reference:** The RealReal — authenticated luxury, editorial presentation, quiet confidence.

**What DRAPED is NOT:** Flashy. Playful. Decorative. Trend-chasing. It never shouts.

---

## Color Palette

Use these exact hex values throughout the app. No substitutions.

| Token Name        | Hex       | Usage                                                        |
|-------------------|-----------|--------------------------------------------------------------|
| `--parchment`     | `#FAFAF0` | Primary background (all screens)                            |
| `--deep-umber`    | `#2C2418` | Primary text, wordmark, primary CTA background              |
| `--terracotta`    | `#B5732A` | Accent — CTAs hover, AI labels, active states, links        |
| `--linen`         | `#E5E0D5` | Borders, dividers, input outlines                           |
| `--cream`         | `#EAE6DC` | Tags, badges, card surfaces, occasion pills                 |
| `--warm-stone`    | `#7A6E60` | Secondary / muted text, placeholders, labels                |
| `--white-soft`    | `#FFFFFF` | Card backgrounds when elevated above parchment              |

### Accent Rule
Terracotta (`#B5732A`) is used **sparingly** — only for:
- Primary CTA hover state
- "Verified by DRAPED AI" labels
- Active/selected occasion pills
- Price highlights
- Links

Never use it for decoration, backgrounds, or general UI chrome.

### Dark surfaces
When using Deep Umber (`#2C2418`) as a background (e.g. top nav, active pill):
- Text on it must be `#FAFAF0` (Parchment)
- Never use pure white (`#FFFFFF`) on Umber — use Parchment

---

## Typography

### Font Stack
- **Display / Wordmark:** Georgia, "Times New Roman", serif
- **UI / Body / Data:** -apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", sans-serif

If using Google Fonts: import `Cormorant Garamond` (weight 400) for display, `Inter` (weights 400, 500) for UI.

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400&family=Inter:wght@400;500&display=swap');
```

### Type Scale

| Role                  | Font       | Size  | Weight | Letter-spacing | Case       |
|-----------------------|------------|-------|--------|----------------|------------|
| Wordmark              | Serif      | 24px  | 400    | 0.18em         | ALL CAPS   |
| Display headline      | Serif      | 28px  | 400    | normal         | Sentence   |
| Section headline      | Serif      | 20px  | 400    | normal         | Sentence   |
| Section label         | Sans       | 11px  | 500    | 0.10em         | ALL CAPS   |
| Body                  | Sans       | 14px  | 400    | normal         | Sentence   |
| Body emphasis         | Sans       | 14px  | 500    | normal         | Sentence   |
| Price / Data          | Sans       | 15px  | 500    | normal         | —          |
| Badge / tag           | Sans       | 11px  | 500    | 0.05em         | Sentence   |
| Caption / helper      | Sans       | 12px  | 400    | normal         | Sentence   |

### Typography Rules
- **Two weights only:** 400 (regular) and 500 (medium). Never 600, 700, or bold.
- **No italic** in UI — italic only acceptable in editorial/editorial body copy.
- **Sentence case** everywhere except: wordmark (ALL CAPS), section labels (ALL CAPS).
- Line height: 1.7 for body, 1.3 for headlines, 1.5 for UI labels.

---

## Wordmark

```
DRAPED
```

- Font: Cormorant Garamond or Georgia, weight 400
- Letter-spacing: 0.18em
- Always ALL CAPS
- Never bold, never sans-serif, never condensed, never with an icon next to it

### Approved wordmark color combinations:
| Background   | Wordmark color |
|--------------|----------------|
| `#FAFAF0`    | `#2C2418`      |
| `#2C2418`    | `#FAFAF0`      |
| `#B5732A`    | `#FAFAF0`      |
| `#EAE6DC`    | `#2C2418`      |

---

## Spacing System

Use multiples of 4px.

| Token  | Value  | Usage                              |
|--------|--------|------------------------------------|
| `xs`   | 4px    | Icon gaps, tight inline spacing    |
| `sm`   | 8px    | Between related elements           |
| `md`   | 12px   | Card internal padding              |
| `lg`   | 16px   | Section padding, card gaps         |
| `xl`   | 24px   | Between sections                   |
| `2xl`  | 32px   | Screen-level vertical rhythm       |
| `3xl`  | 48px   | Top/bottom screen padding          |

---

## Border Radius

| Context                          | Radius |
|----------------------------------|--------|
| Buttons                          | 4px    |
| Input fields                     | 6px    |
| Occasion pills / badges          | 20px (fully rounded) |
| Cards                            | 12px   |
| Bottom sheet / modals            | 16px top corners only |
| Images (garment photos)          | 8px    |

---

## Component Specs

### Bottom Navigation Bar
- Height: 64px
- Background: `#FAFAF0` with 0.5px top border `#E5E0D5`
- 3 tabs: Home, Browse, Sell
- Active tab: icon + label in `#2C2418`, weight 500
- Inactive tab: `#7A6E60`, weight 400
- No tab bar background color change on active
- Font size for labels: 11px, letter-spacing 0.05em, ALL CAPS

### Top Navigation Bar
- Height: 52px
- Background: `#FAFAF0`
- Wordmark centered (or left-aligned): Cormorant Garamond / serif, 20px, tracking 0.18em, `#2C2418`
- Bottom border: 0.5px `#E5E0D5`
- Avatar/icon right: 32px circle, `#EAE6DC` background

### Occasion Pills (horizontal scroll)
- Height: 36px
- Padding: 0 16px
- Border-radius: 20px
- **Default state:** background `#EAE6DC`, text `#4A3F2C`, border none
- **Active/selected state:** background `#2C2418`, text `#FAFAF0`
- Font: 13px, weight 500, letter-spacing 0.03em
- Gap between pills: 8px
- Row has horizontal scroll, no visible scrollbar

### Garment Card (2-column grid)
- Card background: `#FFFFFF`
- Border-radius: 12px
- Border: 0.5px solid `#E5E0D5`
- Image: 3:4 aspect ratio, border-radius 8px top corners
- Padding below image: 10px 12px 12px
- Garment name: 13px, weight 500, `#2C2418`, max 2 lines, ellipsis
- Occasion tag: 11px, weight 500, `#7A6E60`, letter-spacing 0.05em, uppercase
- Price line: 13px, weight 500, `#2C2418`
- Condition badge: see Condition Badges below

### Condition Badges
| Grade     | Background | Text      |
|-----------|------------|-----------|
| Excellent | `#EAE6DC`  | `#4A3F2C` |
| Good      | `#E0EDE4`  | `#2A5035` |
| Fair      | `#F0E8DE`  | `#5C3E26` |

- Font: 11px, weight 500, letter-spacing 0.05em
- Padding: 3px 10px
- Border-radius: 20px

### "Verified by DRAPED AI" Label
- Text: `DRAPED AI` in `#B5732A` (Terracotta)
- Font: 11px, weight 500, letter-spacing 0.08em, ALL CAPS
- No background, no border — text only with a small dot or checkmark prefix

### Primary CTA Button
- Background: `#2C2418`
- Text: `#FAFAF0`, 14px, weight 500, letter-spacing 0.04em
- Height: 48px
- Border-radius: 4px
- Full width on mobile
- Hover/active: background `#B5732A`

### Secondary CTA Button
- Background: transparent
- Border: 0.5px solid `#2C2418`
- Text: `#2C2418`, 14px, weight 500
- Height: 48px
- Border-radius: 4px

### Input Fields
- Height: 48px
- Background: `#FFFFFF`
- Border: 0.5px solid `#E5E0D5`
- Border-radius: 6px
- Focus border: `#2C2418`
- Placeholder text: `#7A6E60`, 14px, weight 400
- Label above field: 11px, weight 500, `#7A6E60`, ALL CAPS, letter-spacing 0.08em
- Padding: 0 14px

### Section Dividers
- 0.5px solid `#E5E0D5`
- Never use full horizontal rules heavier than 0.5px

### Step Indicator (seller flow)
- "Step 1 of 3" — 12px, `#7A6E60`, weight 400
- Active step dot: `#2C2418`, 8px
- Inactive step dot: `#E5E0D5`, 8px

---

## Screen-level Layout

**Mobile-first. Max-width: 390px. Center on desktop.**

```css
.app-container {
  max-width: 390px;
  margin: 0 auto;
  background: #FAFAF0;
  min-height: 100vh;
  position: relative;
}
```

Screen padding (left/right): 16px
Bottom padding (above nav bar): 80px (accounts for 64px nav + 16px breathing room)

---

## Imagery Rules

### Do
- Neutral backgrounds: Parchment, warm white, linen
- Close-ups of embroidery, fabric texture, detail work
- Natural daylight or soft studio light
- Garment flat-lay OR on a real body (not mannequins)
- Consistent crop ratio: **3:4 portrait** for all garment photos
- Use `picsum.photos` with a consistent seed per garment ID for mock data

### Don't
- Busy or colored backgrounds
- Heavy filters or oversaturated editing
- Harsh flash or dark moody photography
- Lifestyle clutter — props, food, decor in garment photos
- Mixed aspect ratios in the same listing grid

---

## Voice & Copy

### Tone
Elegant and understated. Precise over effusive. Warm but never chatty.

### Write this
- "Find your look for the occasion."
- "Verified condition. Fair price. Your next occasion, sorted."
- "List your piece. We handle the rest."
- "Based on similar listings, we suggest: $380–$440."
- "Request sent. The seller will confirm within 24 hours."

### Not this
- "Shop amazing outfits!" ✗
- "AI-powered super smart pricing tool" ✗
- "We're revolutionizing fashion!" ✗
- "Hey! Ready to find your perfect look? 🎉" ✗

### UI copy rules
- CTAs: imperative, short — "Rent", "Buy", "List your piece", "Publish listing"
- Confirmation messages: calm and confident — "Your listing is live."
- Error states: direct, no blame — "We couldn't process that. Try again."
- Empty states: helpful, not apologetic — "No garments found for this occasion."
- Section labels: ALL CAPS, muted, 11px — "FEATURED LISTINGS", "CONDITION REPORT", "MEASUREMENTS"

---

## What to Avoid (Universal Rules)

- No gradients anywhere
- No drop shadows (except 0 0 0 Npx focus rings on inputs)
- No decorative borders or ornamental dividers
- No cultural motifs (marigolds, paisleys, geometric patterns) — brand is culture-neutral
- No emoji in UI
- No font weights above 500
- No colored backgrounds on screens (always Parchment `#FAFAF0`)
- No pure black (`#000000`) — use Deep Umber (`#2C2418`) instead
- No pure white on Deep Umber backgrounds — use Parchment (`#FAFAF0`)
- No rounded corners on single-sided borders

---

## Mock Data Conventions

When generating placeholder garment data:
- Use `picsum.photos/seed/{garmentId}/400/533` for 3:4 ratio images
- Garment names should be specific: "Emerald Anarkali Set", "Ivory Silk Lehenga", "Rose Banarasi Saree"
- Prices: buy range $200–$1200, rent range $60–$200 per 4 days
- Occasion variety: Mehendi, Sangeet, Wedding Reception, Haldi, Engagement, Eid, Diwali, Garba/Navratri
- Condition variety: mix of Excellent / Good / Fair across the dataset
- Seller ratings: 4.6–5.0, rental counts 4–28

---

*End of DRAPED Brand Guidelines v1.0*
*Group 8 — BUSN 37215 — Booth School of Business*
