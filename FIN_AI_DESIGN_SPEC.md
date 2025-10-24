# Fin.ai Website - Complete Design Specification

## Color Palette
```
Primary Background: #050505
Secondary Background: #0a0a0a
Tertiary Background: #1a1a1a
Border Color: #2a2a2a
Text Primary: #ffffff
Text Secondary: #b0b0b0
Text Tertiary: #808080
Accent Blue Light: #3b82f6
Accent Blue Primary: #1e40af
Accent Blue Hover: #60a5fa
```

## Typography System
```
Font Family Primary: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue"

Font Sizes & Weights:
- Hero H1: 56-64px, weight 700-800, letter-spacing: -1.5px to -2px
- Section H2: 42-48px, weight 700, letter-spacing: -1px
- Card H3: 18-24px, weight 700, letter-spacing: -0.5px
- Body Text: 14-16px, weight 400, letter-spacing: 0px
- Small Text: 12-13px, weight 500, letter-spacing: 0.3px
- Labels: 11-12px, weight 600, letter-spacing: 0.5px
```

## Spacing Scale
```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
2xl: 32px
3xl: 48px
4xl: 64px
5xl: 96px
```

## Components & Styling

### Navigation
- Height: 56px
- Padding: 16px 48px
- Background: rgba(5, 5, 5, 0.8)
- Backdrop Filter: blur(8px)
- Border Bottom: 1px solid rgba(30, 64, 175, 0.15)
- Position: sticky, top 0, z-index 100

### Buttons
#### Primary Button
- Background: #1e40af
- Color: #ffffff
- Padding: 12-14px 24-36px
- Border Radius: 6-8px
- Font Weight: 600
- Transition: all 0.2s ease
- Hover: bg #3b82f6, box-shadow 0 0 30px rgba(30, 64, 175, 0.4)

#### Secondary Button
- Background: transparent
- Border: 1px solid rgba(30, 64, 175, 0.3)
- Color: #ffffff
- Padding: 12-14px 24-36px
- Border Radius: 6-8px
- Hover: bg rgba(30, 64, 175, 0.15), border rgba(30, 64, 175, 0.5)

#### Outline Button
- Background: rgba(30, 64, 175, 0.15)
- Border: 1px solid rgba(30, 64, 175, 0.3)
- Color: #ffffff
- Padding: 10px 24px
- Border Radius: 6px
- Hover: bg rgba(30, 64, 175, 0.25)

### Cards & Containers
- Background: rgba(10, 10, 10, 0.5) or rgba(10, 10, 10, 0.8)
- Border: 1px solid rgba(30, 64, 175, 0.1) to 0.2
- Border Radius: 8px
- Padding: 24-48px
- Transition: all 0.3s ease
- Hover: bg-darker, border-lighter, subtle shadow

### Forms
#### Input Fields
- Background: rgba(30, 64, 175, 0.05)
- Border: 1px solid rgba(30, 64, 175, 0.2)
- Color: #ffffff
- Padding: 12px 12px 12px 40px (with icon)
- Border Radius: 6px
- Focus: border rgba(30, 64, 175, 0.5), shadow 0 0 12px rgba(30, 64, 175, 0.2)

## Animation & Transitions
- Default Duration: 0.2s - 0.3s
- Timing Function: ease, cubic-bezier(0.4, 0, 0.2, 1)
- Fade In/Out: opacity 0.2s ease
- Slide Up/Down: transform + opacity 0.3s ease
- Scale: transform scale(1.02) 0.2s ease on hover

## Layout Patterns
- Max Content Width: 1200px
- Horizontal Padding: 48px (desktop), 24px (mobile)
- Section Vertical Padding: 80-120px
- Container Gaps: 16-40px

## Shadow & Elevation
```
Soft: 0 4px 12px rgba(0, 0, 0, 0.3)
Medium: 0 8px 24px rgba(0, 0, 0, 0.4)
Hard: 0 12px 48px rgba(0, 0, 0, 0.5)
Glow Blue: 0 0 20px rgba(30, 64, 175, 0.3)
```

## Specific Section Details

### Hero Section
- Min Height: 600-700px
- Padding Top: 120-160px
- Background Gradient: linear-gradient(135deg, #050505 0%, #0a0a0a 100%)
- Headline Size: 56-64px
- Subheading Size: 18-20px, color: #b0b0b0
- Button Group: flex, gap 16px, justify-center
- Badge: inline-block, padding 12px 20px, background rgba(30, 64, 175, 0.1)

### Feature Cards Grid
- Display: grid
- Grid Columns: repeat(auto-fit, minmax(300-320px, 1fr))
- Gap: 32-40px
- Card Padding: 32px
- Icon Size: 32-40px
- Icon Color: #3b82f6
- Hover Effect: bg-darker, border-lighter, slight scale

### Stats Section
- Background: rgba(30, 64, 175, 0.08)
- Grid Columns: repeat(4, 1fr) or repeat(auto-fit, minmax(250px, 1fr))
- Gap: 60px
- Stat Number: 48px, weight 800, color #3b82f6
- Stat Label: 15px, weight 500, color #b0b0b0

### Testimonial Cards
- Max Width: 600px (if single column)
- Padding: 36px
- Border Left: 3px solid #3b82f6
- Quote Mark: Optional decorative element
- Logo Size: 40-48px
- Company Name: 14px, weight 600
- Title: 12px, color #b0b0b0
- Quote: 16px, line-height 1.6

### Pricing Card
- Max Width: 600px
- Center aligned on page
- Padding: 48px
- Background: rgba(10, 10, 10, 0.5)
- Border: 1px solid rgba(30, 64, 175, 0.2)
- Price Display: 48px, weight 800, color #3b82f6
- List Items: flex, gap 12px, padding 12px 0, border-bottom 1px solid rgba(30, 64, 175, 0.1)

### Footer
- Background: rgba(5, 5, 5, 0.8)
- Border Top: 1px solid rgba(30, 64, 175, 0.15)
- Padding: 40-48px
- Text Color: #b0b0b0
- Links: hover color #60a5fa
- Font Size: 12-13px

## Responsive Breakpoints
- Mobile: < 640px (single column, 24px padding)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3+ columns, 48px padding)

## Accessibility
- Color Contrast: All text WCAG AA compliant
- Focus States: Visible outline or box-shadow
- Motion: Respect prefers-reduced-motion
- Semantic HTML: Proper heading hierarchy

## Special Effects
- Background Solar Flare: Decorative SVG or gradient animation
- Parallax: Subtle background movement on scroll
- Lazy Loading: Images load on viewport visibility
- Video Player: Embedded with play/unmute controls
- Line Animations: SVG animations on scroll trigger
