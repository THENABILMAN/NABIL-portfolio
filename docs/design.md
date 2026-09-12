# Design System — Monochrome Void (Pure Black & White)

## 1. Aesthetic Direction & Brand Concept
- **Vibe**: Ultra-minimalist dark-stage environment, high-contrast monolithic typography, pure black void, weightless layout.
- **Canvas Philosophy**: Pure black `#000000` void is the only surface—no dark gray cards, borders, or translucent panels. UI elements float on black using whitespace alone.
- **Signature Visual**: An animated particle field of monochrome outlined triangles forming an organic neural/constellation network against pure black.

## 2. Color Palette & Design Tokens

| Token Name | Hex Value | Role & Usage |
| :--- | :--- | :--- |
| `--color-void` | `#000000` | Full-page background, negative space, pure black canvas |
| `--color-bone-white` | `#ffffff` | **Primary text, active CTA buttons, active nav state, icon fills** |
| `--color-ash-gray` | `#888888` | Muted nav text, ghost link color, secondary section labels |
| `--color-silver-mist` | `#b0b0b0` | Tertiary body copy, quiet supporting context, caption labels |
| `--color-charcoal-border`| `#1f1f1f` | Extremely subtle divider lines (if structural separation is required) |

## 3. Typography Rules & Hierarchy

### Typeface Setup
- **Font Family**: `PPNeueMontreal` (Fallback: `Inter`).
- **Hierarchy Principle**: Absolute contrast driven by **massive scale jumps** (113px display vs 18px body) and tracking, never font weight.

### Type Scale Breakdown
- **Display / Hero Headline**: `113px` | Weight: `400` | Line Height: `1.1` | Letter Spacing: `-4.52px` | Color: `#ffffff`
- **Large Section Headline**: `78px` | Weight: `400` | Line Height: `1.1` | Letter Spacing: `-3.12px` | Color: `#ffffff`
- **Standard Headline**: `42px` | Weight: `400` | Line Height: `1.2` | Letter Spacing: `-1.68px` | Color: `#ffffff`
- **Subheading / Accent Title**: `27px` / `24px` | Weight: `400` | Color: `#ffffff`
- **Body Copy**: `18px` | Weight: `200` (Signature ultra-light reading) | Line Height: `1.5` | Color: `#b0b0b0`
- **Nav & Small Labels**: `14px` | Weight: `600` | Uppercase | Tracking: `0.025em` | Color: `#888888` -> Active: `#ffffff`

## 4. Component Rules & Shape Guidelines

### Primary Action Button (White Pill)
- **Background**: `#ffffff` (Bone White)
- **Text**: `#000000` (Pure Black), `14px`, Weight `600`, Uppercase with `0.025em` tracking
- **Border Radius**: `22.5px` (Full Pill)
- **Padding**: `14.4px` vertical × `16px` horizontal
- *Rule*: Max 1 primary white filled button per viewport.

### Ghost Text Links & Secondary CTAs
- **Background**: None (`bg-transparent`)
- **Border**: None or `1px solid #ffffff` (Outlined Pill variant)
- **Color**: `#888888` (Ash Gray) -> Hover: `#ffffff` (Bone White)

### Surface & Elevation Rules
- **No Card Containers**: Do NOT use background cards, gray fills, shadows, or borders for projects or skills.
- **Whitespace Floating**: Elements float on pure `#000000` black separated by generous layout gaps (`60px` to `120px`).

## 5. CSS Variables (`globals.css`)

```css
:root {
  /* Palette */
  --color-void: #000000;
  --color-bone-white: #ffffff;
  --color-ash-gray: #888888;
  --color-silver-mist: #b0b0b0;
  --color-charcoal-border: #1f1f1f;

  /* Fonts */
  --font-ppneuemontreal: 'PPNeueMontreal', 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* Spacing & Radii */
  --radius-button: 22.5px;
  --radius-card: 24px;
  --page-max-width: 1280px;
}