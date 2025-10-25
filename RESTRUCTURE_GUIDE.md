# VOICE AI Website Restructure - Complete Guide

## Project Overview
This document provides a complete blueprint for restructuring the website to match the VOICE AI landing page design using React with CSS Modules.

## File Structure
```
src/
├── styles/
│   └── global.css                    ✅ Created - Design tokens & base styles
├── components/
│   ├── Header/
│   │   ├── Header.jsx               ✅ Created
│   │   └── Header.module.css        ✅ Created
│   ├── Hero/
│   │   ├── Hero.jsx                 ⏳ To create
│   │   └── Hero.module.css          ⏳ To create
│   ├── Experience/
│   │   ├── Experience.jsx           ⏳ To create
│   │   └── Experience.module.css    ⏳ To create
│   ├── TestRefine/
│   │   ├── TestRefine.jsx           ⏳ To create
│   │   └── TestRefine.module.css    ⏳ To create
│   ├── Testimonials/
│   │   ├── Testimonials.jsx         ⏳ To create
│   │   └── Testimonials.module.css  ⏳ To create
│   ├── Integrations/
│   │   ├── Integrations.jsx         ⏳ To create
│   │   └── Integrations.module.css  ⏳ To create
│   ├── Pricing/
│   │   ├── Pricing.jsx              ⏳ To create
│   │   └── Pricing.module.css       ⏳ To create
│   ├── CTA/
│   │   ├── CTA.jsx                  ⏳ To create
│   │   └── CTA.module.css           ⏳ To create
│   └── Footer/
│       ├── Footer.jsx               ⏳ To create
│       └── Footer.module.css        ⏳ To create
└── App.jsx                          ✅ Updated - VOICE AI structure
```

## Component Specifications

### 1. Hero Component
**Purpose:** Prominent hero section with headline and CTA

**Key Elements:**
- H1: "The #1 AI Agent for all customer service—now on the phone"
- Subheading: Descriptive text about Fin Voice
- Two CTAs: "Start Free Trial" and "View Demo"
- Gradient or dark background with subtle animations
- Badge: "#1 Agent on G2" and uptime indicators

**Styling:**
- Dark navy background (#000a1a)
- White text
- Orange accent buttons
- Hero height: 90vh (full viewport minus header)
- Responsive: Stack CTA buttons on mobile

### 2. Experience Component
**Purpose:** Showcase the product experience with phone mockup and particles

**Key Elements:**
- Section title: "Natural conversations. Instant answers."
- Description text
- Phone mockup showing interface
- Animated particles dome above phone (250 particles)
- Dialogue text: "Fin: and Williamsburg store."
- Three feature tiles below

**Styling:**
- Light background card on dark background
- Phone mockup with gradient (#4a5568 to #2d3748)
- Particle animation: 6s cycle, infinite loop
- Grid layout: 3 columns for features (collapse to 1 on mobile)
- Hover effects on feature tiles

### 3. TestRefine Component
**Purpose:** Display the test, refine, and launch workflow

**Key Elements:**
- Section title: "Test, refine, and launch with confidence"
- Three workflow steps with icons
- Step descriptions and benefits
- Preview images/mockups

**Styling:**
- Two-column layout (image on right)
- Alternating layout for each step
- Stack to single column on mobile
- Image takes 60% width on desktop

### 4. Testimonials Component
**Purpose:** Show customer testimonials and case studies

**Key Elements:**
- "The most trusted AI agent for customer service"
- Testimonial cards with:
  - Customer quote
  - Customer name and role
  - Company logo/name
  - Star rating

**Styling:**
- Dark background with light cards
- Grid layout: 2 columns (1 on mobile)
- Card: White background, padding, shadow
- Responsive text size

### 5. Integrations Component
**Purpose:** Highlight seamless integrations with existing systems

**Key Elements:**
- Section title: "Seamlessly integrate with your existing systems"
- Description of integration capabilities
- Integration partner logos (grid)
- Feature highlights

**Styling:**
- Light background card on dark background
- Logo grid: 4 columns (2 on mobile)
- Each logo with hover scale effect
- Centered layout

### 6. Pricing Component
**Purpose:** Display simple, outcome-based pricing

**Key Elements:**
- Section title: "Simple, outcome-based pricing"
- Subtitle: "#1 Agent on Q2"
- Price display: $0.99 per resolution
- Pricing details
- Two CTAs: "Start Free Trial" and "View Demo"

**Styling:**
- Dark background
- Price card with accent background
- Large typography for price
- Centered layout
- Responsive: Stack elements on mobile

### 7. CTA Component
**Purpose:** Final call-to-action before footer

**Key Elements:**
- Headline: "Ready to transform customer service?"
- Subheading: Description
- Two prominent CTAs
- Optional: Newsletter signup

**Styling:**
- Dark background with gradient overlay
- Large white text
- Prominent button styling
- Center-aligned

### 8. Testimonials/Social Proof Component
**Purpose:** Show stats and customer trust indicators

**Key Elements:**
- Key metrics: 65% resolution rate, 99.9% uptime, 150+ countries
- "Most trusted AI" badge
- Customer logos/count

**Styling:**
- Stats in grid layout
- Large numbers with accent color
- Subtle icons or separators

### 9. Footer Component
**Purpose:** Navigation and legal links

**Key Elements:**
- Company links (About, Blog, Careers)
- Product links (Docs, API, Status)
- Legal links (Privacy, Terms, Security)
- Social media links
- Copyright info

**Styling:**
- Dark background
- Three-column layout (1 on mobile)
- Link lists with hover effects
- Bottom border separator

## Animation Guidelines

### Recommended Animations

1. **Fade-In-Up on Scroll**
   - Elements fade in and slide up when scrolled into view
   - Duration: 600ms
   - Timing: cubic-bezier(0.25, 0.8, 0.25, 1)

2. **Particle Float**
   - Particles float upward infinitely
   - Duration: 6 seconds per cycle
   - Starting position: 80px below
   - Ending position: 280px above

3. **Hover Scale**
   - Interactive elements scale to 1.03 on hover
   - Duration: 300ms ease-out

4. **Button Lift**
   - On hover: translateY(-4px) + box-shadow
   - Duration: 300ms ease-out

## Responsive Design Breakpoints

```css
/* Mobile First */
Base: 0-480px    (Mobile)
Tablet: 481-768px
Desktop: 769px+

Key Breakpoint: 768px (max-width)
```

### Responsive Strategy
- Mobile: Single column, large touch targets, reduced spacing
- Tablet: Two columns, optimized images
- Desktop: Multi-column, full layouts, rich animations

## Implementation Checklist

### Phase 1: Core Structure ✅
- [x] Global styles with design tokens
- [x] Header component
- [ ] Hero component
- [ ] Experience component

### Phase 2: Middle Sections
- [ ] TestRefine component
- [ ] Testimonials component
- [ ] Integrations component

### Phase 3: Bottom Sections
- [ ] Pricing component
- [ ] CTA component
- [ ] Footer component

### Phase 4: Polish & Optimization
- [ ] Mobile responsiveness testing
- [ ] Animation implementation
- [ ] Performance optimization
- [ ] Accessibility review

## Design Tokens Summary

### Colors
- Primary BG: #000a1a
- Secondary BG: #f5f5f5
- Text Dark: #1a1a1a
- Text Light: #ffffff
- Accent: #ff6b35
- Border: #e0e0e0

### Typography
- Serif: Merriweather (headlines)
- Sans: Inter (body)
- Sizes: 12px - 72px (11 levels)

### Spacing
- Unit: 8px
- Scale: xs (8px) - 3xl (80px)

### Effects
- Transitions: 150ms - 500ms
- Border Radius: 4px - 9999px
- Shadows: Subtle to strong

## Next Steps

1. Create Hero component with full-height section and CTAs
2. Build Experience section with particle animations
3. Create remaining section components
4. Implement scroll-triggered animations
5. Test responsive design on all breakpoints
6. Performance optimization and bundling
7. Deploy to production

---

**Status:** In Progress
**Last Updated:** October 24, 2025
**Version:** 1.0
