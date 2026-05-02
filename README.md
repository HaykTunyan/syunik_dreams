# Syunik Dreams 🏔️

**Syunik Dreams** is a premium tourism and cultural platform dedicated to the Syunik region of Armenia—the "Southern Gate" of the country. This project serves as a comprehensive digital guide, showcasing the unconquerable spirit, eternal mountains, and rich historical heritage of Syunik.

## 🌟 Overview

Syunik Dreams is designed to bridge the gap between ancient history and modern tourism. It provides users with an immersive experience exploring the cities, nature, and cultural landmarks of one of Armenia's most strategic and beautiful provinces.

### Key Features

- **🗺️ Interactive Exploration**: Detailed guides for major cities including Kapan, Goris, Meghri, Sisian, and more.
- **📜 Historical Heritage**: Deep dives into the Kingdom of Syunik, the liberation struggle led by Davit Bek, and the heroic battles of Garegin Nzhdeh.
- **🚠 Tourism & Adventures**: Integrated information on world-famous sites like Tatev Monastery, the Wings of Tatev, and the Khndzoresk Swinging Bridge.
- **🛍️ Exclusive Merchandise**: The "Spirit of Mount Khustup" collection—hand-crafted, premium quality t-shirts inspired by Syunik's sacred peaks.
- **🌐 Internationalization**: Full support for Armenian and English languages via `next-intl`.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State & Logic**: Framer Motion for animations, lucide-react for iconography.
- **Localization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Testing**: [Cypress](https://www.cypress.io/) (E2E & Component Testing)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/syunik_dreams.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `/src/app/[locale]` - Main application routes with localization support.
- `/src/components` - Reusable UI components.
- `/src/container` - Large-scale page sections and layout controllers.
- `/messages` - Translation files (en.json, hy.json).
- `/public` - Static assets and imagery.

## 🧪 Testing

This project uses **[Cypress](https://www.cypress.io/)** for both end-to-end (E2E) and component-level testing.

### Configuration

Cypress is configured in `cypress.config.ts` with:
- **Base URL**: `http://localhost:3000`
- **Component testing**: Next.js framework with Webpack bundler
- **Project ID**: `1p9o4i` (Cypress Cloud)

### Running Tests

Make sure the development server is running first (`npm run dev`), then:

```bash
# Open Cypress Test Runner (interactive UI)
npm run test:open

# Run all tests headlessly (CI mode)
npm run test:run
```

### E2E Tests (`cypress/e2e/`)

End-to-end tests validate full user flows across all major pages:

| Test File | Coverage |
|---|---|
| `home.cy.js` | Navbar links, language switcher, Hero section, Attractions grid, Footer |
| `city.cy.js` | City detail pages, city cards, map section |
| `history.cy.js` | History page content, timeline, media elements |
| `contact.cy.js` | Contact form validation, submission flow |
| `trips.cy.js` | Trips listing, filters, trip detail navigation |
| `product.cy.js` | Product catalog, cart interactions |
| `navigation.cy.js` | Cross-page routing and link integrity |

### Component Tests (`cypress/support/`)

Component-level tests are configured via `cypress/support/component.ts` and `component-index.html`, allowing isolated rendering and testing of individual React components using the Next.js + Webpack dev server.

Support files:
- `cypress/support/commands.ts` — Custom Cypress commands (e.g. `cy.realClick`)
- `cypress/support/e2e.ts` — Global E2E hooks and setup
- `cypress/support/component.ts` — Component test mount setup

---

## ✨ Contribution

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

---

*“Syunik is our backbone, without which Armenia cannot exist.” — Garegin Nzhdeh*

