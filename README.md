# ✨ Life Stats — Your Life in Numbers

> Enter your birth date and discover surprising statistics about your life: heartbeats, breaths, kilometers traveled through space, full moons witnessed, and much more.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)
![i18n](https://img.shields.io/badge/Languages-5-green)

## 🚀 What is Life Stats?

Life Stats is a viral web app that transforms your birth date into mind-blowing statistics. It calculates everything from how many times your heart has beaten to how far you've traveled through space aboard planet Earth.

**Perfect for sharing on social media** — includes a beautiful downloadable card optimized for Instagram, Twitter, and more.

## 🌟 Features

- **📊 Real-time Statistics** — Heartbeats, breaths, blinks, days lived, sleep hours, meals, and more
- **🌍 Space Travel** — How many kilometers you've traveled through space on Earth
- **🗓️ Life in Weeks Grid** — Visual representation of your life organized by decades
- **⏳ Time Perspective** — Progress bars showing life completed vs. life ahead
- **🎲 Fun Facts** — Moon trips, pizza slices, hair growth, and other surprising data
- **⏱️ Live Counter** — Seconds ticking in real-time since your birth
- **📸 Social Share Card** — Beautiful 1080×1350 image ready for Instagram/Twitter
- **🌐 5 Languages** — English, Spanish, Portuguese, Hindi, and French
- **🔍 Auto Language Detection** — Detects your browser language automatically
- **📱 Fully Responsive** — Works beautifully on mobile, tablet, and desktop
- **🎬 Smooth Animations** — Intersection Observer + progressive fill animations

## 🛠️ Tech Stack

| Tech                      | Purpose                            |
| ------------------------- | ---------------------------------- |
| **Next.js 16**            | App Router, SSR, static generation |
| **TypeScript**            | Strict mode, full type safety      |
| **Tailwind CSS v4**       | Utility-first styling              |
| **Recharts**              | (Available for future charts)      |
| **html2canvas**           | Generate shareable images          |
| **Vitest**                | Unit testing framework             |
| **React Testing Library** | Component testing                  |

## 📦 Getting Started

### Prerequisites

- **Node.js 18.18+** (recommended: v22)
- **Yarn** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Joel-SD/life-stats.git
cd life-stats

# Install dependencies
yarn install

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `yarn dev`   | Start development server |
| `yarn build` | Production build         |
| `yarn start` | Start production server  |
| `yarn test`  | Run unit tests           |
| `yarn lint`  | Run ESLint               |

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run tests in watch mode
npx vitest
```

**39 unit tests** covering calculations, i18n, and components.

## 🌐 Supported Languages

| Language      | Code | Auto-detected |
| ------------- | ---- | ------------- |
| 🇺🇸 English    | `en` | ✅            |
| 🇪🇸 Spanish    | `es` | ✅            |
| 🇧🇷 Portuguese | `pt` | ✅            |
| 🇮🇳 Hindi      | `hi` | ✅            |
| 🇫🇷 French     | `fr` | ✅            |

The app automatically detects your browser language. You can also switch manually using the language selector in the header.

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Landing page with date input
│   ├── stats/page.tsx    # Results page with all statistics
│   ├── layout.tsx        # Root layout with i18n provider
│   └── globals.css       # Global styles & animations
├── components/           # React components
│   ├── StatsDisplay.tsx  # Main orchestrator for all stat sections
│   ├── LifeGrid.tsx      # Life in weeks grid (by decades)
│   ├── LiveCounter.tsx   # Real-time seconds counter
│   ├── FunFacts.tsx      # Fun facts section
│   ├── ShareableCard.tsx # Social media image card
│   ├── ShareButton.tsx   # Download/share functionality
│   └── ...               # DateInput, StatCard, Header, Footer
├── lib/                  # Core logic
│   ├── calculations.ts   # All life statistics formulas
│   ├── i18n.ts           # Translations for 5 languages
│   └── i18n-context.tsx  # React context for language state
└── __tests__/            # Unit tests
```

## 📸 Share Card

The app generates a high-resolution **1080×1350** image (4:5 ratio) optimized for social media, featuring:

- 6 key life statistics with vibrant colors
- Life progress bar with percentage
- Your exact age
- Branded watermark
- Beautiful gradient background with decorative elements

## 📄 License

MIT

---

**Made with ❤️ by [Joel-SD](https://github.com/Joel-SD)**
