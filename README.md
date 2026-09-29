# 🎮 GameVault

A modern, self-hosted personal game tracking platform built with Next.js. Track your gaming backlog, write personal reviews, manage wishlists, and document your game notes — all in one beautifully designed interface.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss) ![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

---

## ✨ Features

- 🕹️ **Multi-Platform Tracking** — Track games across PC, PlayStation, Nintendo Switch, Xbox, Mobile, and Retro/Emulator.
- 🔍 **Auto Game Metadata** — Powered by the [RAWG Video Games Database API](https://rawg.io/apidocs) to auto-fill cover art, genres, developers, and release dates.
- 📋 **Status Management** — Organize your library with *Currently Playing*, *Completed*, *Wishlist*, *On Hold*, and *Dropped* statuses.
- 📖 **Personal Wiki & Notes** — Write Markdown notes for each game: build guides, boss strategies, hidden secrets, and lore summaries.
- ✅ **Quest Checklist** — Create personal checklists for in-game missions, trophies, and achievements.
- 📊 **Statistics Dashboard** — Automatic stats for total games, completed titles, total playtime, and average rating.
- 💾 **JSON Backup & Restore** — Export and import your entire library as a portable JSON file.
- ☁️ **Cloud-Ready** — Deployable to [Vercel](https://vercel.com/) for free with zero configuration.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + Lucide Icons |
| Data Storage | Browser LocalStorage (portable JSON backup) |
| Game Metadata | RAWG Video Games Database API |
| Deployment | Vercel (free tier) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/game-vault.git
cd game-vault

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### RAWG API Key (Optional)

GameVault works out of the box with a built-in offline database of popular titles. For full search access to 500,000+ games, get a free API key:

1. Visit [rawg.io/apidocs](https://rawg.io/apidocs) and register for a free account.
2. Copy your API key.
3. In the app, open **Settings** and paste your key.

---

## 📦 Deployment

Deploy instantly to Vercel:

1. Push this repository to your GitHub account.
2. Go to [vercel.com](https://vercel.com/) → **Add New Project** → Import your repo.
3. Click **Deploy**. Done!

---

## 📄 License

MIT License — free to use, modify, and distribute.
