# Implementation Plan - Blog Post Page Refinement

## Goal
Refine the appearance of the blog post page (`src/pages/post/[slug].astro`) to improve typography, spacing, and layout according to user specifications.

## Changes

### 1. Typography & Colors
- **Font Family**: Updated post content and excerpts to use `var(--font-family-sans)` (Inter) to match the homepage, replacing the serif font.
- **Headings**: 
    - Moved the date above the H1 title.
    - Increased H1 size significantly (`3rem` mobile, `4.5rem` desktop).
    - Removed bold weight from H1 (set to `400`).
- **Links**:
    - Build links (back arrow and content links) set to `#eb5027`.
    - Content links now maintain an underline.
    - **Fix**: Used `:global(a)` selector for PortableText content to ensure link styles are correctly applied to CMS content in Astro component.

### 2. Layout & Spacing
- **Image**:
    - Removed `750px` width constraint on the main image.
    - Set image to `width: 100%` and `aspect-ratio: 16/9` to fully cover the available space (Columns 2 and 3).
- **Spacing**:
    - Added generous padding to the post container (`4rem` on desktop) to create proper "breathing room" against the borders.
    - Adjusted vertical margins for better flow.
    - **Revised Spacing**:
        - Increased spacing between the main image and date (`margin-top: 3rem`).
        - Increased spacing between H1 title and excerpt (`margin-top: 2.5rem` on excerpt).
        - **Gap Removal**: Removed all vertical spacing (`margin-bottom: 0` on header, `margin-top: 0` on post) between the "BLOG" header and the main image to make them flush.
    - **Content Alignment**:
        - Removed extra padding (`0 2rem`) from the article body (`.post__content`) so it aligns perfectly with the H1 and excerpt.

### 3. Header
- **Navigation**:
    - Added "BLOG" text next to the back arrow in the header.
    - Styled "BLOG" to match the homepage section title (Uppercase, `#ff8565`, `0.05em` spacing).

### 4. Contact Form
- **Component**: Created `ContactModal` (React) with clean, minimal styling.
- **Backend**: Implemented `api/contact.ts` using Resend.
- **Integration**: Added to `ThreeColumnLayout` so it appears on all pages.
- **Fixes**:
    - Updated modal title to "Get in touch with me".
    - Updated placeholder to "How can I help?".
    - Fixed close icon svg path.
    - **Resolved API Key**: Copied `RESEND_API_KEY` from `studio/.env` to `astro-app/.env` to fix runtime error.

## Verification
- **Visuals**: Use the browser preview (if available) or deploy to verify the visual changes match the "premium" and "spacious" look requested.
- **Responsiveness**: Ensure the padding and image sizing work well on mobile (default styles) and desktop (`min-width: 800px` media query).
