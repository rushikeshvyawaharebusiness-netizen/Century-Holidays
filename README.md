# Century Holidays | Premium Travel & Adventure

Century Holidays is a high-end, modern travel website designed for adventure seekers and luxury travelers. Built with a focus on premium aesthetics, speed, and mobile responsiveness, it offers a seamless booking experience for curated tours and treks.

## 🚀 Key Features

- **Premium Theme**: Editorial serif + grotesk pairing on a brand yellow (`#F0EA1B`) and deep charcoal palette.
- **Fully Responsive**: Optimized for desktop, tablets, and smartphones.
- **Speed Optimized**: Astro's image pipeline automatically resizes/compresses every photo to modern formats (WebP) and lazy-loads off-screen images.
- **Dedicated Booking System**: Custom multi-step booking form for detailed traveler inquiries.
- **SEO Ready**: Optimized meta tags, JSON-LD structured data, and semantic HTML for better search engine ranking.

## 🛠️ Technology Stack

- **[Astro](https://astro.build)**: Static site generator — pages are `.astro` components, built to plain HTML/CSS/JS with no client-side framework runtime.
- **[Tailwind CSS v4](https://tailwindcss.com)**: Utility-first styling via `@tailwindcss/vite`, brand palette defined as CSS `@theme` tokens in `src/styles/global.css`.
- **Phosphor Icons**: Crisp, modern iconography.
- **Google Fonts**: Fraunces (display serif) + Outfit (sans-serif body/UI).

## 📂 Project Structure

- `src/pages/` — one file per route: `index.astro`, `about.astro`, `contact.astro`, `book.astro`, `privacy.astro`, `terms.astro`.
- `src/layouts/BaseLayout.astro` — shared `<head>`, SEO meta, Navbar + Footer wiring.
- `src/components/` — Navbar, MobileNav, Footer, TripCard, MarqueeTrack, CategoryCard, FeatureCard, FaqItem, FormField, PageHero.
- `src/data/trips.ts` — the destination/trending trip package data (names, prices, dates).
- `src/styles/global.css` — Tailwind import + brand theme tokens.
- `src/assets/images/` — source photos, imported and optimized via `astro:assets`.
- `public/` — files served byte-for-byte as-is: `robots.txt`, `sitemap.xml`, favicon.
- `astro.config.mjs` — sets `build: { format: 'file' }` so routes build to `about.html`, `contact.html`, etc. (not `about/index.html`), preserving the site's existing URLs.

## 🧞 Commands

Run from the project root in a terminal:

| Command             | Action                                             |
| :------------------ | :-------------------------------------------------- |
| `npm install`        | Install dependencies                                |
| `npm run dev`         | Start local dev server at `localhost:4321`          |
| `npm run build`       | Build the production site to `./dist/`              |
| `npm run preview`     | Preview the production build locally                |
| `npx astro check`    | Type-check all `.astro` files                       |

## 📦 How to Deploy

### Vercel (Recommended)
Vercel auto-detects the Astro framework preset. Build command `astro build`, output directory `dist` — no extra configuration needed. Every push to `master` deploys automatically.

### GitHub Pages
Unlike the previous plain-HTML version of this site, GitHub Pages can no longer serve the repository directly — Astro requires a build step first. Use the official [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/) to add a GitHub Actions workflow that runs `astro build` and publishes `dist/` to Pages.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛠️ Future Updates & Maintenance

Your website is now safely stored on GitHub: [new-century-holidays-website](https://github.com/rushikeshvyawaharebusiness-netizen/new-century-holidays-website)

### How to Edit Your Website
1.  **Clone/Download**: Access your code from any machine via GitHub.
2.  **Install dependencies**: `npm install` (first time only, or after pulling dependency changes).
3.  **Make Changes**: Edit `.astro` files in `src/pages`/`src/components`, or update copy in `src/data/trips.ts`.
4.  **Preview locally**: `npm run dev`, then open `http://localhost:4321`.
5.  **Save & Sync**:
    ```bash
    git add .
    git commit -m "Your update description"
    git push origin master
    ```
6.  **Auto-Deploy**: Vercel rebuilds and deploys automatically on every push.
