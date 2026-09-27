# Website QA Checklist (First Demo)

Use this checklist during Phase 5 before approving full demo population.

## A. Pre-Check

- Staging URL is reachable
- Correct build/version deployed
- All required pages are published
- Test inbox or endpoint is available
- Test data prepared (name, email, phone, date/time, notes)

## B. Navigation & Routing

- Header logo returns to homepage
- Main navigation links open correct pages
- Footer links are valid and not broken
- CTA buttons route to intended destination
- 404 page exists and provides recovery links

## C. Core Conversion Flows

- Lead/inquiry/contact form loads without layout breaks
- Required fields validate correctly
- Invalid email/phone is rejected with clear message
- Successful submit shows confirmation state
- Duplicate or empty submit is prevented
- Error fallback state is visible

## D. Content & IA

- Offer categories are clear and consistently named
- Information hierarchy is readable on mobile
- Page headings match page purpose
- No placeholder text left (lorem ipsum, TODO, TBD)
- Tone is consistent across all primary pages

## E. Responsive UX

Test at minimum:

- Mobile 390x844
- Tablet 768x1024
- Desktop 1440x900

Checks:

- No horizontal scrolling
- Navigation works (including mobile menu)
- Key CTAs visible without confusion
- Forms usable with touch keyboard
- Images crop gracefully and stay relevant

## F. Accessibility Basics

- Exactly one H1 per page
- Heading order is logical (H1 -> H2 -> H3)
- Interactive elements are keyboard reachable
- Focus state is visible on links/buttons/inputs
- Image alt text exists for meaningful images
- Text/background contrast is readable

## G. SEO Basics

- Unique page title per core page
- Meta description present for core pages
- Canonical URL present where required
- Open Graph title/description/image present
- No duplicate H1 on key pages

## H. Performance Smoke

- Largest hero image optimized and not oversized
- No obviously blocking media on initial load
- Font loading does not cause severe layout shift
- Pages become interactable quickly on mobile network simulation

## I. Bug Reporting Template

Use this for each finding:

- ID:
- Severity: Critical / High / Medium / Low
- Title:
- Page/Feature:
- Repro Steps:
- Expected:
- Actual:
- Suggested Fix Direction:

## J. Go/No-Go Gate

No-Go when:

- Any Critical issue exists
- Two or more High issues affect core flows

Go with notes when:

- Core flows pass
- Only Medium/Low issues remain

Final approval question:

- Approve moving to full demo population? Yes/No
