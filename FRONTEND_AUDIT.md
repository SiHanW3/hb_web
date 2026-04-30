# HuiBao Web Frontend Audit
**Date**: April 30, 2026  
**Project**: /home/WSH/tshp/hb_web

---

## 1. PUBLIC PAGES STRUCTURE (src/app/(public)/)

### **1.1 Home Page** (`/page.tsx`)
**Route**: `/`  
**Sections**:
- **Hero** (py-24): Welcome message + 2 CTA buttons (Start Project, View Our Work)
  - Uses `AnimateIn` component (delay 0, 0.2)
  - Uses `HeroAnimation` component with overlapping 3-image carousel
- **Value Props** (py-24, bg-surface-soft): "Why HuiBao" section with 3 feature cards
  - Features: Design-Led Approach, Premium Quality, Brand-Focused
  - AnimateIn with staggered delays (0.1 per card)
- **Our Work Preview** (py-24): 3 category cards (Rigid Box, Book & Manual, Label)
  - Links to `/our-work/{slug}` pages
  - AnimateIn staggered (0.1 per card)
- **Stats Section** (py-16, bg-surface-dark): 4 statistics with dark theme
  - Stats: 10+ Years, 500+ Projects, 200+ Brands, 15+ Countries
  - AnimateIn staggered (0.1 per stat)
- **CtaBand**: Generic footer CTA section

### **1.2 About Page** (`/about/page.tsx`)
**Route**: `/about`  
**Sections**:
- **Hero** (py-28 md:py-36): "Crafting Brand Experiences Through Packaging"
  - AnimateIn wrapper
- **Mission & Vision** (py-24): 2 sections with image + text blocks
  - Each wrapped in AnimateIn (side-by-side layout with alternating image position)
- **Process Section** (py-24, bg-surface-soft): 4-step process cards
  - Steps: Consult, Design, Produce, Deliver
  - Grid layout (sm:grid-cols-2 lg:grid-cols-4)
  - AnimateIn with 0.1 stagger
- **Why HuiBao Section** (py-24): 3 feature cards (In-House Design Team, Quality Guaranteed, Startup-Friendly)
  - AnimateIn with 0.1 stagger
- **CtaBand**

### **1.3 Contact Page** (`/contact/page.tsx`)
**Route**: `/contact`  
**Client Component** (`"use client"`)  
**Sections**:
- **Hero** (py-28 md:py-36): "Get In Touch" heading
  - AnimateIn wrapper
- **Form + Contact Info** (py-24): 2-column layout (lg:col-span-5)
  - Form (lg:col-span-3): name, email, company, message fields
    - Form handling with status states (idle, sending, sent, error)
    - Fetch to `/api/contact` endpoint
  - Contact Info (lg:col-span-2): 3 info cards (Visit, Email, Call)
    - AnimateIn with delay 0.15

### **1.4 Our Work - Main Page** (`/our-work/page.tsx`)
**Route**: `/our-work`  
**Sections**:
- **Hero** (py-28): "Packaging That Performs"
  - AnimateIn wrapper
- **Category Cards - Zigzag** (pb-24): 3 category cards (rigid-box, book-manual, label)
  - Uses `CategoryCard` component with alternating left/right image layout
  - Staggered with 0.1 delay per card

### **1.5 Category Pages** (Rigid Box, Book & Manual, Label)
**Routes**: `/our-work/rigid-box`, `/our-work/book-manual`, `/our-work/label`  
**Pattern** (each identical structure):
- **Breadcrumb** (pt-10)
- **Hero** (py-20): Category title + description
  - AnimateIn wrapper
- **Product Grid** (pb-24): Responsive grid of product cards
  - Uses `ProductCard` component
  - Grid: md:grid-cols-2 lg:grid-cols-3
  - Staggered AnimateIn (0.08 per card)
- **CtaBand**: Customized CTA per category

### **1.6 Product Detail Page** (`/our-work/[category]/[id]/page.tsx`)
**Route**: `/our-work/{category}/{id}` (dynamic)  
**Sections**:
- **Breadcrumb** (pt-10)
- **Product Detail** (py-16): 2-column layout
  - Left (lg:w-1/2): `ProductGallery` component
  - Right (lg:w-1/2): Title, description, features list, materials tags, CTA button
  - Both sections wrapped in AnimateIn (delays 0, 0.15)

### **1.7 Team Page** (`/team/page.tsx`)
**Route**: `/team`  
**Sections**:
- **Hero** (py-28 md:py-36): "The People Behind Every Package"
  - AnimateIn wrapper
- **Team Grid** (py-24, bg-surface-soft): 8 team members in grid
  - Grid: sm:grid-cols-2 lg:grid-cols-4
  - Each card has image placeholder (aspect-[3/4]) + name/role
  - AnimateIn staggered (0.06 per card)
- **Values Section** (py-24): 3 value cards (Passion for Craft, Client Partnership, Continuous Innovation)
  - AnimateIn staggered (0.1 per card)
- **CtaBand**: "Join Our Team" CTA

---

## 2. UI COMPONENTS (src/components/ui/)

### **2.1 AnimateIn.tsx**
**Status**: ✅ **Client Component** (`"use client"`)  
**Library**: Framer Motion  
**Props**:
- `children`: ReactNode
- `className?`: string
- `delay?`: number (default 0)

**Animation**:
- Initial: `{ opacity: 0, y: 24 }`
- Animate: `{ opacity: 1, y: 0 }`
- Viewport: `{ once: true, margin: "-60px" }`
- Transition: `duration: 0.6, delay: ${delay}, ease: [0.22, 1, 0.36, 1]`

**Used in**: Every major section, every page (foundation animation)

---

### **2.2 HeroAnimation.tsx**
**Status**: ✅ **Client Component** (`"use client"`)  
**Library**: Framer Motion  
**Purpose**: Hero section image carousel with 3 overlapping slides  
**Images**:
1. Rigid Box (hero-rigid-box.jpg) - 62% width, z-10, left-0 top-0
2. Book (hero-book.jpg) - 55% width, z-20, right-0 top-[12%]
3. Label (hero-label.jpg) - 52% width, z-30, left-[18%] bottom-0

**Animation per slide**:
- Initial: `{ opacity: 0, y: 30, scale: 0.95 }`
- Animate: `{ opacity: 1, y: 0, scale: 1 }`
- Duration: 0.7s
- Delays: 0s, 0.15s, 0.3s (staggered)
- Ease: `[0.22, 1, 0.36, 1]`

**Features**:
- Overlapping layout with z-index layering
- Label badge on each image
- Shadow effect (shadow-lg)
- Responsive sizing

**Used in**: Home page hero only

---

### **2.3 SectionHeader.tsx**
**Status**: ✅ **Server Component**  
**Props**:
- `eyebrow`: string (uppercase label)
- `title`: string (h2 heading)
- `description`: string (paragraph)

**Layout**:
- Centered text (max-w-[600px] mx-auto)
- Uses `AnimateIn` wrapper
- Eyebrow in primary color, xs font
- Title: `font-[family-name:var(--font-display)]` text-4xl/5xl
- Description: text-base text-body

**Used in**: 
- Home: Why HuiBao, What We Create
- About: Why HuiBao, How We Work, What Sets Us Apart
- Team: Our Values

---

### **2.4 CtaBand.tsx**
**Status**: ✅ **Server Component**  
**Props**:
- `title?`: string (default "Let's Create Together")
- `description?`: string (default "Ready to elevate...")
- `buttonText?`: string (default "Get In Touch")
- `buttonHref?`: string (default "/contact")

**Layout**:
- Primary color background (bg-primary, rounded-2xl)
- Centered text (py-24 px-10)
- Uses `AnimateIn` wrapper
- Button styled: white background, hover to surface-soft

**Used in**: Every page end (generic reusable component)

---

### **2.5 ProductCard.tsx**
**Status**: ✅ **Client Component** (`"use client"`)  
**Library**: Framer Motion  
**Props**:
- `id`: string
- `title`: string
- `description`: string
- `image?`: string
- `categorySlug`: string
- `index`: number

**Animation**:
- Container:
  - Initial: `{ opacity: 0, y: 32 }`
  - Animate: `{ opacity: 1, y: 0 }`
  - Duration: 0.5s, delay: `index * 0.08`, ease: `[0.22, 1, 0.36, 1]`
  - Viewport: `{ once: true, margin: "-40px" }`

- On Hover:
  - Card: `whileHover={{ y: -6 }}`
  - Image: `whileHover={{ scale: 1.05 }}`
  - Transition: duration 0.3/0.4, ease: `[0.22, 1, 0.36, 1]`

**Layout**:
- Link to `/our-work/${categorySlug}/${id}`
- Image (aspect-[4/3]) with gradient fallback
- Content section (p-6) with title, description
- bg-surface-card rounded-xl

**Used in**: Category pages (rigid-box, book-manual, label)

---

### **2.6 ProductGallery.tsx**
**Status**: ✅ **Client Component** (`"use client"`)  
**Library**: Framer Motion, AnimatePresence  
**Props**:
- `images`: string[]
- `title`: string

**Features**:
- Main image carousel with AnimatePresence + drag support
- Navigation arrows (prev/next buttons, conditional render)
- Dots indicator (clickable)
- Thumbnail strip (clickable)

**Animation**:
- Main image:
  - Variants: enter (x: ±300, opacity: 0), center, exit
  - Duration: 0.35s, ease: `[0.22, 1, 0.36, 1]`
  - Drag: x-axis with constraints, elastic 0.7
  - Threshold: ±60px to navigate

**Interaction**:
- Drag navigation
- Button navigation
- Dot navigation
- Thumbnail selection

**Used in**: Product detail page (left column)

---

### **2.7 CategoryCard.tsx**
**Status**: ✅ **Client Component** (`"use client"`)  
**Location**: `src/app/(public)/our-work/CategoryCard.tsx`  
**Library**: Framer Motion  
**Props**:
- `cat`: object with slug, title, eyebrow, description, href, image
- `index`: number

**Animation**:
- Container:
  - Initial: `{ opacity: 0, y: 40 }`
  - Animate: `{ opacity: 1, y: 0 }`
  - Duration: 0.6s, delay: `index * 0.1`, ease: `[0.22, 1, 0.36, 1]`
  - Viewport: `{ once: true, margin: "-60px" }`

- On Hover:
  - Card: `whileHover={{ y: -4 }}`
  - Image: `whileHover={{ scale: 1.04 }}`
  - Transition: duration 0.3/0.5, ease: `[0.22, 1, 0.36, 1]`

**Layout**:
- Zigzag pattern: alternates image left/right based on even/odd index
- Image (lg:w-1/2) + text (lg:w-1/2)
- Text: eyebrow, title, description, button link
- Mobile: stacked, Desktop: side-by-side

**Used in**: Our Work main page

---

## 3. GLOBAL LAYOUT & CONFIGURATION

### **3.1 Layout** (`src/app/layout.tsx`)
- Root layout for entire app
- Fonts:
  - Display: **Playfair Display** (400 weight)
  - Body: **Inter** (400, 500 weights)
  - Injected as CSS variables: `--font-display`, `--font-body`
- Metadata: title, description

### **3.2 Global CSS** (`src/app/globals.css`)
**Tailwind v4 with @theme**

**Color Palette**:
```
Canvas & Surfaces:
  --color-canvas: #faf9f5 (primary bg)
  --color-surface-soft: #f5f0e8
  --color-surface-card: #efe9de
  --color-surface-cream-strong: #e8e0d2

Dark:
  --color-surface-dark: #181715
  --color-surface-dark-elevated: #252320

Primary/Accent:
  --color-primary: #cc785c (warm terracotta/rust)
  --color-primary-active: #a9583e (darker on interaction)
  --color-primary-disabled: #e6dfd8

Text:
  --color-ink: #141413 (darkest text)
  --color-body-strong: #252523
  --color-body: #3d3d3a (default text)
  --color-muted: #6c6a64
  --color-muted-soft: #8e8b82

Status:
  --color-success: #5db872
  --color-error: #c64545

Dark Mode:
  --color-on-primary: #ffffff
  --color-on-dark: #faf9f5
  --color-on-dark-soft: #a09d96

Utility:
  --color-hairline: #e6dfd8 (borders)

Fonts:
  --font-display: Playfair Display, Cormorant Garamond, EB Garamond, serif
  --font-body: Inter, system fonts, sans-serif
```

**Global Styles**:
- Body bg: var(--color-canvas)
- Body text color: var(--color-body)
- Font smoothing enabled

### **3.3 PostCSS Config** (`postcss.config.mjs`)
- Plugin: `@tailwindcss/postcss` (Tailwind v4)

---

## 4. ANIMATION PATTERNS & EASING

### **4.1 Standard Easing Function**
```
[0.22, 1, 0.36, 1]  // Custom cubic-bezier
// Interpreted as: ease-out with elastic feel
// Similar to "anticipate" easing
```

### **4.2 Common Durations**
- **Fade-in entries**: 0.5s - 0.7s
- **Hover interactions**: 0.3s - 0.5s
- **Image transitions**: 0.35s - 0.4s
- **Drag transitions**: 0.35s

### **4.3 Stagger Patterns**
```
Regular stagger: delay = index * 0.08 - 0.1  (ProductCard, categories)
Slower stagger: delay = index * 0.06  (Team grid)
Feature cards: delay = i * 0.1  (home, about, team)
```

### **4.4 Viewport Triggers**
- Margin: `-60px` (most AnimateIn)
- Margin: `-40px` (ProductCard)
- Once: true (all animations fire once)

### **4.5 Common Animation Configs**
**Scale + Fade In** (HeroAnimation, hover states):
```
whileHover={{ scale: 1.04-1.05 }}
```

**Y-axis Lift** (hover states):
```
whileHover={{ y: -4 to -6 }}
```

**Slide + Fade** (ProductGallery carousel):
```
x: ±300px offset with opacity 0
```

---

## 5. DEPENDENCIES AUDIT

### **5.1 Motion Library**
✅ **Framer Motion v12.38.0** (installed)
- Used in: AnimateIn, HeroAnimation, ProductCard, ProductGallery, CategoryCard
- No other motion libraries detected

### **5.2 Other Key Dependencies**
- **Next.js** 16.2.4 (app router, SSR)
- **React** 19.2.4
- **Tailwind CSS** v4 (with @tailwindcss/postcss)
- **Lucide React** 1.14.0 (icons)
- **Prisma** 7.8.0 (database ORM)

### **5.2 Font Delivery**
- next/font/google (Playfair Display, Inter)

---

## 6. SECTION BREAKDOWN BY PAGE

| Page | Sections | Animation Components | Static Components |
|------|----------|---------------------|------------------|
| Home | Hero, Value Props, Our Work, Stats, CTA | AnimateIn (6x), HeroAnimation, CtaBand | SectionHeader (2x) |
| About | Hero, Mission, Vision, Process, Why, CTA | AnimateIn (6x), CtaBand | SectionHeader (2x) |
| Contact | Hero, Form+Info, No CTA | AnimateIn (2x) | (form fields) |
| Our Work | Hero, Categories, CTA | AnimateIn, CategoryCard (3x), CtaBand | (none) |
| Category Pages | Breadcrumb, Hero, Products, CTA | AnimateIn, ProductCard (n), CtaBand | (none) |
| Product Detail | Breadcrumb, Gallery+Info | AnimateIn (2x), ProductGallery | (text, buttons) |
| Team | Hero, Team Grid, Values, CTA | AnimateIn (2x), TeamCards (8x), CtaBand | SectionHeader |

---

## 7. MOTION OPPORTUNITIES & NOTES

### **Current State**:
- ✅ Framer Motion fully integrated
- ✅ Standard easing applied consistently
- ✅ Viewport-triggered animations (scroll-based)
- ✅ Hover states on interactive elements
- ✅ Drag support on gallery

### **Potential for Enhancement**:
1. **Section transitions**: Different easing/stagger per page section
2. **Scroll velocity**: Physics-based animations on category cards
3. **Parallax effects**: On hero images or backgrounds
4. **Gesture interactions**: Additional drag/swipe patterns
5. **Loading states**: Skeleton screens during data fetch
6. **Page transitions**: Shared layout animations between pages
7. **Micro-interactions**: Button ripples, form validation feedback
8. **Text animations**: Word/character-level staggering in headers

### **Consistency Notes**:
- All easing uses same cubic-bezier `[0.22, 1, 0.36, 1]`
- Viewport margin: `-60px` standard (slightly generous)
- Delay units: 0.06 (team), 0.08 (products), 0.1 (features/categories)
- Y-offset: 24px (AnimateIn), 30px (HeroAnimation), 32px (ProductCard), 40px (CategoryCard)

---

## 8. SUMMARY STATISTICS

**Total Pages**: 7 (including 3 category pages + 1 dynamic detail page)  
**UI Components**: 7 (AnimateIn, SectionHeader, CtaBand, HeroAnimation, ProductCard, ProductGallery, CategoryCard)  
**Client Components** (motion): 5 (AnimateIn, HeroAnimation, ProductCard, ProductGallery, CategoryCard)  
**Server Components**: 2 (SectionHeader, CtaBand)  
**Framer Motion Usage**: 10+ instances across all pages  
**Color Tokens**: 20+ CSS variables (warm, earthy palette)  
**Font Families**: 2 (Playfair Display display, Inter body)  
**Animation Easing Standard**: 1 (cubic-bezier [0.22, 1, 0.36, 1])
