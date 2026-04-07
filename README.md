> [!WARNING]
> This repository is a **take-home test submission** created solely for the Frontend Developer position at **Swift Dynamics Co., Ltd.** It is intended for evaluation purposes only. Please do not copy, redistribute, or use this code as your own submission.

> [!IMPORTANT]
> **To the reviewer at Swift Dynamics:** Once the evaluation is complete, kindly notify the candidate of the result — **pass or fail** — so that this repository can be **deleted or set to private** promptly. Thank you.

---

# Frontend Developer Test — Swift Dynamics Co., Ltd.

A Next.js application built as a technical assessment for the Frontend Developer role at Swift Dynamics. The project covers two test scenarios: a CSS shape layout with interactive controls, and a CRUD form with a data table.

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI Library | Ant Design 6 |
| State Management | Redux Toolkit |
| Persistence | localStorage (via custom hook) |
| Styling | SCSS Modules + Tailwind CSS 4 |
| i18n | i18next + react-i18next |
| Package Manager | pnpm |

## Features

### Test 1 — Layout & Style (`/m-style`)
- Six CSS shapes rendered with pure SCSS (square, rectangle, circle, oval, trapezoid variants)
- **Move Shape** — rotates the shape list left or right using arrow buttons
- **Move Position** — swaps the grid between two staggered row layouts (up / down)
- **Click a shape** — randomly shuffles all shape positions
- Colors used: `#ffa200` and `#6eda78`

### Test 2 — Form & Table (`/form`)
- Personal data form (title, first/last name, birthday, nationality, gender, citizen ID, passport, expected salary)
- **Create / Edit / Delete** individual records
- **Select All + Bulk Delete** via table checkboxes
- Table with **pagination** and **column sorting**
- All data persisted to **localStorage** — survives page refresh
- State managed entirely with **Redux Toolkit** (no `useState` for form data)

### Global
- **Language switcher** (EN / TH) powered by i18next, available on every page via the Navbar
- Responsive layout with Ant Design Grid

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/
│   ├── (main)/          # Home page — test selector
│   ├── (style)/m-style/ # Test 1: Layout & Shape
│   └── (form)/form/     # Test 2: Form & Table
├── components/
│   ├── common/          # Navbar, Layout, Providers
│   ├── person/          # PersonForm, PersonTable
│   └── shape/           # ShapeCard, ShapeGrid
├── hooks/               # usePersonForm, usePersist
├── store/               # Redux store + personSlice
├── styles/              # Global SCSS variables
├── types/               # TypeScript types
└── utils/               # i18n config, validators
```

## Notes

- Node.js **18+** is required.
- Use **pnpm** as the package manager (`pnpm-workspace.yaml` is present).
- i18n locale files are located at `src/public/locales/{en,th}/common.json`.
