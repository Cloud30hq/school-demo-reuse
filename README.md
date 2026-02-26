# School Demo Template

Modern, animated, mobile-friendly school website template using plain HTML, CSS, and JavaScript.

## Files

- `index.html`: Structure and sections
- `styles.css`: Theme, layout, responsive behavior, visual style
- `script.js`: School config loader, content rendering, smooth scroll, animations
- `schools/*.json`: Per-school data files
- `vercel.json`: Vercel-friendly static settings

## Quick Reuse

Create a new JSON file in `schools/` and share a URL with a `school` query key.

Examples:

- `https://your-domain.vercel.app/?school=rechabite`
- `https://your-domain.vercel.app/?school=aster`

To add another school:

1. Duplicate `schools/rechabite.json`.
2. Rename it to `schools/<new-key>.json` (for example, `schools/greenfield.json`).
3. Update the file content:
   - Name, tagline, contact details
   - City text in hero (`city`)
   - Programs and outcomes
   - Gallery/campus images
   - Stories/testimonials
   - Scrolling signal strip content
4. Open `/?school=<new-key>` to preview.

The layout uses alternating section moods (dark/light) and built-in conversion bands for better admissions flow.

## Deploy On Vercel

1. Import this folder as a project.
2. Framework preset: `Other`.
3. Build command: leave empty.
4. Output directory: root (`.`).

The site is static and deploys directly.
# school-demo-reuse
