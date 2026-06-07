<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

# Casa di Lusso — Codex Project Instructions

## 1. Mission

You are working on the existing **Casa di Lusso** Next.js project.

Act as:

- Awwwards-level Creative Director
- Luxury Brand UI/UX Designer
- Senior Next.js Developer
- Senior Frontend Architect
- Performance Engineer
- SEO Specialist

Your goal is to transform the current one-page website into a premium luxury ecommerce landing experience while also refactoring the codebase into a scalable, maintainable MVP architecture.

The final website should feel comparable to:

- RH / Restoration Hardware
- Ralph Lauren Home
- Villeroy & Boch
- Bernardaud
- Rosenthal
- Apple product pages
- Modern Awwwards websites

The site must communicate:

- Luxury
- Elegance
- Trust
- Exclusivity
- Premium lifestyle
- High-end tableware and vintage collections

---

## 2. Current Project Problem

The current implementation is mostly concentrated inside:

- `page.tsx`
- `layout.tsx`
- `globals.css`

This is not scalable and makes future content expansion, redesign, localization, and maintenance difficult.

A major part of this task is to refactor the project into a clean component-based MVP structure.

---

## 3. Critical Workflow

Do **not** start coding immediately.

Follow this exact workflow:

### Phase 1 — Audit

First analyze the project.

Check:

- current folder structure
- `page.tsx`
- `layout.tsx`
- `globals.css`
- existing components
- existing assets
- existing styles
- existing routing
- existing i18n/localization setup
- existing SEO metadata
- existing dependencies
- current responsiveness
- current performance risks

Prepare an audit summary before making changes.

### Phase 2 — Refactoring Plan

Before implementation, create a clear refactoring plan.

The plan must explain:

- what will be moved out of `page.tsx`
- what will remain in `layout.tsx`
- how `globals.css` will be reduced
- which sections will become components
- where constants/data will live
- how translations will be handled
- how styles will be organized
- which files will be created
- which files will be modified

Do not create unnecessary files.

Prefer clean, simple MVP structure over over-engineering.

### Phase 3 — Implementation

After the plan is approved, implement changes step by step.

### Phase 4 — Validation

After implementation, verify:

- build passes
- lint passes
- TypeScript passes
- all locales work
- mobile version works
- no text is hardcoded
- SEO is preserved or improved
- performance is not degraded

---

## 4. Architecture Requirements

Refactor the project into a maintainable MVP structure.

Recommended structure:

```txt
src/
  app/
    [locale]/
      layout.tsx
      page.tsx

  components/
    layout/
      Header/
      Footer/

    sections/
      HeroSection/
      StorySection/
      CollectionsSection/
      WhyCasaSection/
      TrustSection/
      FeaturedBrandsSection/
      GallerySection/
      BeforeAfterSection/
      StatsSection/
      TestimonialsSection/
      FAQSection/
      ContactSection/

    ui/
      Button/
      SectionHeading/
      Container/
      AnimatedSection/
      Accordion/
      Lightbox/
      SocialLink/
      BrandLogo/
      Counter/

  data/
    collections.ts
    brands.ts
    testimonials.ts
    faq.ts
    stats.ts
    gallery.ts
    navigation.ts

  lib/
    seo.ts
    animations.ts
    utils.ts

  styles/
    variables.css
    typography.css
    utilities.css

  messages/
    en.json
    ru.json
    uz.json
```

Use this structure only if it fits the current project. If the existing structure is different, adapt without breaking the project.

---

## 5. Refactoring Rules

Follow:

- DRY
- KISS
- SOLID where appropriate
- component composition
- semantic HTML
- accessibility-first markup

Do not:

- keep large JSX blocks inside `page.tsx`
- keep all styling inside `globals.css`
- duplicate section layouts
- hardcode visible text
- introduce unused components
- introduce unused dependencies
- break existing routing
- break existing locale switching
- over-engineer the MVP

`page.tsx` should mainly compose sections:

```tsx
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <CollectionsSection />
      <WhyCasaSection />
      <TrustSection />
      <FeaturedBrandsSection />
      <GallerySection />
      <BeforeAfterSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
```

`layout.tsx` should only handle:

- global layout
- metadata
- providers
- fonts
- locale provider
- header/footer if applicable

`globals.css` should contain only:

- CSS reset
- CSS variables
- base typography
- global body styles
- reusable utility classes

Section-specific styles should live near their components.

---

## 6. Internationalization — Critical Requirement

The project must support three locales:

- English: `en`
- Russian: `ru`
- Uzbek: `uz`

Every new visible text must be translated into all three languages.

This includes:

- headings
- descriptions
- buttons
- labels
- CTAs
- FAQ
- testimonials
- contact text
- navigation
- metadata
- alt text
- microcopy

Never hardcode user-facing text directly inside React components.

Use the existing i18n approach.

If the project uses `next-intl`, keep using `next-intl`.

Do not introduce another i18n library.

Before implementing:

1. Audit current localization structure.
2. Identify existing translation files.
3. Reuse existing locale routing.
4. Keep language switching working.
5. Keep localized SEO working.

Translation quality requirements:

- English must sound premium and natural.
- Russian must sound natural for premium ecommerce.
- Uzbek must sound professional, clean, and native.
- Do not leave placeholders.
- Do not leave untranslated strings.

Validation must include:

- `/en`
- `/ru`
- `/uz`

or the current project-specific localized routes.

---

## 7. Design System

Create a unified luxury visual language.

Use the following palette:

```css
--background: #F5EFE6;
--text: #0F0E0C;
--gold: #B99A5B;
--burgundy: #6F1D1B;
--gray: #7A7A7A;
--border: rgba(15, 14, 12, 0.08);
```

Design principles:

- warm ivory background
- premium editorial spacing
- thin borders
- soft shadows
- restrained gold accents
- no bright colors
- no neon
- no cheap effects
- no excessive glassmorphism
- no generic ecommerce look

The result must feel like a luxury magazine and premium ecommerce brand.

---

## 8. Typography

Use premium typography.

Recommended:

Headings:

- Playfair Display
- or Cormorant Garamond

Body:

- Inter
- or Manrope

Requirements:

- strong visual hierarchy
- generous line height
- balanced spacing
- editorial layout
- elegant section titles
- readable body text
- mobile-friendly typography

---

## 9. Required Sections

### 9.1 Hero Section

Redesign completely.

Requirements:

- full-screen hero
- premium lifestyle image
- dark luxury overlay
- subtle parallax
- elegant fade-in animation
- strong visual hierarchy

Content meaning:

- Casa di Lusso
- Premium Tableware & Vintage Collections
- curated luxury tableware and timeless vintage pieces for elegant living

Buttons:

- Explore Collection
- Contact Us

The first screen must create a premium emotional impact within 3 seconds.

---

### 9.2 Story Section

Create an editorial section:

**Table Setting as an Art**

Purpose:

- sell lifestyle, not only products
- explain brand philosophy
- create emotional value

Use:

- large image
- editorial typography
- luxury spacing

---

### 9.3 Collections Section

Redesign collection/product cards.

Cards must include:

- large imagery
- smooth image zoom on hover
- gradient overlay
- elegant title placement
- subtle shadow
- premium spacing

The cards should feel like luxury magazine covers.

---

### 9.4 Why Casa di Lusso

Create a section with premium value propositions:

- Carefully Curated Collections
- Authentic Vintage Pieces
- Premium European Brands
- Worldwide Delivery

Use elegant cards, not generic icons.

---

### 9.5 Trust Section

Add trust-building elements:

- Authenticity Guarantee
- Secure Packaging
- Worldwide Shipping
- Product Inspection
- Premium Customer Service

Goal:

Increase buyer confidence and conversion.

---

### 9.6 Featured Brands

Create luxury brand wall.

Brands:

- Rosenthal
- Villeroy & Boch
- Wedgwood
- Royal Albert
- Hutschenreuther

Use:

- grayscale logo/text treatment
- minimal layout
- subtle hover animation

---

### 9.7 Gallery Section

Create premium inspiration gallery.

Requirements:

- masonry-style layout
- luxury spacing
- hover zoom
- lightbox support if practical
- optimized images

Gallery should feel like a luxury interior design magazine.

---

### 9.8 Before / After Section

Create a lifestyle comparison block.

Concept:

- Ordinary Table
- Casa di Lusso Styled Table

Purpose:

Sell aspiration and transformation.

---

### 9.9 Stats Section

Add animated counters.

Examples:

- 500+ Products
- 50+ Vintage Collections
- 100+ Happy Customers
- 10+ Countries Served

Numbers should animate when entering viewport.

---

### 9.10 Testimonials Section

Create premium testimonial section.

Requirements:

- elegant cards
- authentic tone
- premium typography
- optional slider if it does not hurt performance

---

### 9.11 FAQ Section

Create premium accordion.

Topics:

- Delivery
- Payment
- Authenticity
- Returns
- Packaging

---

### 9.12 Contact Section

Redesign contact section.

Add:

- Telegram
- Instagram
- WhatsApp

Use elegant icons, clear CTA, and premium spacing.

---

### 9.13 Footer

Create minimalist premium footer.

Include:

- logo
- navigation
- social links
- copyright

---

## 10. Animation System

Install animation libraries only if necessary.

Preferred:

- Framer Motion
- Lenis

Rules:

- animation must be subtle
- no flashy movement
- no distracting effects
- no animation that hurts performance

Recommended animation pattern:

```txt
opacity: 0 → 1
y: 40 → 0
duration: 0.6–0.8s
stagger children where appropriate
```

Add:

- section reveal animations
- image hover zoom
- button hover states
- link hover states
- subtle parallax in hero
- smooth scrolling with Lenis if appropriate

---

## 11. SEO Requirements

Review and improve:

- metadata
- localized metadata
- Open Graph
- Twitter Cards
- structured data if appropriate
- alt tags
- semantic HTML
- heading hierarchy
- internal anchor links

SEO must work for:

- English
- Russian
- Uzbek

Do not break existing SEO.

---

## 12. Performance Requirements

Target Lighthouse:

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

Use:

- `next/image`
- lazy loading
- optimized images
- code splitting
- minimal dependencies
- semantic HTML
- accessible buttons and links

Do not sacrifice performance for visual effects.

---

## 13. Mobile Requirements

Mobile is first-class.

Ensure:

- premium appearance on mobile
- correct spacing
- readable typography
- touch-friendly buttons
- no horizontal scroll
- optimized animations
- fast loading
- all sections look polished on small screens

---

## 14. Styling Requirements

Avoid keeping everything in `globals.css`.

Recommended approach:

- global tokens in `globals.css` or `variables.css`
- section-level CSS modules or scoped styles
- reusable UI styles in UI components
- consistent spacing system

Do not create messy, unstructured CSS.

---

## 15. Dependency Rules

Before adding a dependency, check if it is necessary.

Allowed only if justified:

- `framer-motion` or `motion`
- `lenis`
- `lucide-react`
- lightbox package if needed
- carousel package only if needed

Do not install heavy libraries for simple tasks.

Do not install multiple libraries solving the same problem.

---

## 16. Content and Assets

If real product images are unavailable:

- use existing assets first
- use high-quality placeholder structure
- keep all image paths easy to replace later

Do not use random low-quality images.

Do not use copyrighted brand logos as image files unless they already exist in the project or are legally available.

Text-based brand wall is acceptable.

---

## 17. Definition of Done

The task is complete only when:

- project structure is refactored
- `page.tsx` is clean and section-based
- `layout.tsx` is not overloaded
- `globals.css` is reduced to global/base styles
- all major sections are components
- all user-facing text supports EN/RU/UZ
- no visible text is hardcoded
- locale switching works
- localized metadata works
- build passes
- lint passes
- TypeScript passes
- mobile layout works
- desktop layout works
- no existing functionality is broken
- performance is preserved or improved
- SEO is preserved or improved
- code is readable and maintainable

---

## 18. Final Report Required

After implementation, provide a final report with:

1. Audit summary
2. Refactoring summary
3. New folder structure
4. Changed files
5. Created components
6. Reused components
7. New dependencies
8. i18n changes
9. SEO changes
10. Performance notes
11. Mobile improvements
12. Before/after summary
13. Remaining recommendations

---

## 19. Important Final Instruction

This is not only a visual redesign task.

This is a combined task:

1. Codebase refactoring
2. Component architecture improvement
3. Luxury UI/UX redesign
4. Three-language localization
5. SEO improvement
6. Performance-safe animation
7. Long-term maintainability

Do not optimize for speed of implementation.

Optimize for clean architecture, premium quality, maintainability, and future scalability.
