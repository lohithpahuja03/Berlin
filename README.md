# BERLIN — Fast-Food Ordering & Delivery Platform

![Berlin Brand](https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80)

> A modern, production-grade full-stack fast-food ordering and delivery platform crafted with a bold **Black & Red** aesthetic, dynamic meal customization, server-side business logic, live driver tracking, and an intuitive customer experience.

---

## 1. Project Overview

**BERLIN** is a fast-food ordering and delivery platform built for speed, style, and culinary satisfaction. Designed to compete with modern industry-leading food delivery applications, Berlin puts fast-food cravings first with:

- Fast-food catalog (Gourmet Burgers, Stone-Baked Pizzas, Crispy Chicken, Loaded Fries, Wraps, Beverages, Combos, and Desserts).
- Deep dynamic product customization (sizes, cheese burst, extra patties, gourmet sauces, add-ons) with real-time price updates.
- Server-enforced order business rules:
  - **Cash on Delivery (COD)** available strictly between **₹699 and ₹4,999**.
  - **Order Cancellation** permitted strictly within the first **5 minutes** (300 seconds) of placement.
- Real-time order tracking with animated driver location simulation, timeline milestones, and driver contact cards.
- Default **Dark Mode** (`#080808` / `#e50914`) with a smooth toggle to Light Mode.

---

## 2. Key Features

- **Cinematic Frontend:** Next.js 16 App Router, Tailwind CSS, Lucide icons, responsive mobile-friendly layouts, skeleton loaders, and micro-interactions.
- **Theme Engine:** Default Dark Mode (deep black surfaces, crimson red accents, crisp white text) with animated toggle to Light Mode.
- **Food Catalog & Search:** Instant fuzzy search, category filters, vegetarian/non-veg tags, best seller flags.
- **Product Customization:** Size modifiers, extra toppings, add-ons, and dynamic price recalculation.
- **Persistent Cart:** Client and server-synchronized cart with live breakdown of subtotal, discounts, delivery fee, and taxes.
- **Discount & Coupon Engine:** First-order discounts, promotional coupon validation, minimum spend rules.
- **Secure Authentication:** User registration, password hashing (`bcryptjs`), persistent sessions, and profile dashboard.
- **Address Book:** Multi-address management with default selector.
- **5-Step Checkout:** Seamless step-by-step ordering with real-time summary.
- **Payment Architecture:** Cash on Delivery (COD) rule validation + integration abstraction for digital wallets (Paytm & Google Pay).
- **Order Lifecycle & Tracking:** Unique order IDs (`BER-2026-XXXXX`), status history, and live driver tracking simulation with map visualizer.
- **5-Minute Cancellation:** Server-validated countdown timer preventing late cancellations.
- **Order History & Reorder:** Instant one-click reordering of previous meals.

---

## 3. Technology Stack

### Frontend (`frontend/`)
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **UI & State:** React 19, Context API
- **Styling:** Tailwind CSS 4 with custom Berlin tokens
- **Icons:** Lucide React
- **Animations:** CSS transitions, micro-animations

### Backend (`backend/`)
- **Runtime:** Node.js (v20+)
- **Framework:** Express / TypeScript REST API architecture
- **Security:** `bcryptjs` password hashing, CORS, input sanitization
- **Database Layer:** Relational architecture with models for Users, Addresses, Products, Sizes, Add-ons, Orders, Coupons, and Drivers.
- **Payment Layer:** Extensible gateway boundary for COD, Paytm, and Google Pay.

---

## 4. Repository Structure

This repository strictly enforces a clean, controlled root folder structure:

```
Berlin/
├── frontend/               # Complete Next.js TypeScript frontend application
│   ├── src/
│   │   ├── app/            # App Router pages and client layouts
│   │   ├── components/     # Reusable UI components (Navbar, Customizer, Cart, etc.)
│   │   ├── context/        # Theme, Cart, and Auth state providers
│   │   ├── lib/            # Frontend utilities and API clients
│   │   └── types/          # Shared TypeScript type definitions
│   ├── public/             # Static brand assets and food photography
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.ts
├── backend/                # Complete Node.js TypeScript backend application
│   ├── src/
│   │   ├── controllers/    # Route controllers (auth, products, orders, etc.)
│   │   ├── models/         # Relational data models and schemas
│   │   ├── routes/         # REST API routes
│   │   ├── services/       # Business logic (pricing, discounts, COD, GPS sim)
│   │   ├── middleware/     # Auth, validation, and error handlers
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── README.md               # Main project documentation
├── ROADMAP.md              # 21-phase development roadmap and tracking
├── BRAIN.md                # Persistent project memory and development rules
└── .gitignore              # Git ignore rules
```

*Note: No other files or folders are permitted in the root directory.*

---

## 5. Current Development Status

> 🟩 **Phases 1 through 10 are COMPLETED & FULLY VERIFIED.**  
> - 🟩 **Phase 1 — Project Foundation:** Strict root structure locked, Next.js 16 frontend + Node.js Express backend initialized.
> - 🟩 **Phase 2 — Design System & Brand:** Deep Black (`#080808`) + Crimson Red (`#e50914`) palette, animated Dark/Light theme toggle, responsive typography, and UI primitives.
> - 🟩 **Phase 3 — Global Layout:** Sticky Navbar with live bag badge, quick search trigger, mobile slide-over, and full legal/kitchen Footer.
> - 🟩 **Phase 4 — Homepage:** Cinematic Hero section, 8-category visual grid, best-sellers cards, special offers spotlight banner, feast combos, and verified reviews.
> - 🟩 **Phase 5 — Food & Category System:** Dedicated `/menu` page with category tabs, veg/non-veg dietary filter, price/rating sorting, and search engine.
> - 🟩 **Phase 6 — Product Details & Customization:** Interactive `ProductCustomizerModal` with product-specific sizes (Regular, Double, Monster / Small, Medium, Large), category-appropriate add-ons (Cheese Burst, Extra Patty, Truffle Dip), and dynamic price calculation.
> - 🟩 **Phase 7 — Cart System:** Persistent `CartContext` (localStorage), slide-out `CartDrawer`, dedicated `/cart` page with customization tags, quantity selectors, and transparent bill calculation.
> - 🟩 **Phase 8 — Authentication:** `AuthContext`, Sign In & Sign Up modal, 1-click Demo login (`demo@berlin.food` / `Berlin123!`), JWT token persistence, and profile sync.
> - 🟩 **Phase 9 — User Profile & Addresses:** Customer dashboard (`/profile`), Address CRUD (add, delete, default address toggle), and past order history with 1-click Reorder.
> - 🟩 **Phase 10 — Discounts & Offers:** Dedicated `/offers` page with promo coupons (`WELCOME100`, `BERLIN50`, `FEAST20`, `BURGERFEST`), 1-click copy & apply, and minimum spend validation.
>
> ⏳ **Next Phase:** **Phase 11 — Checkout** (Checkout refinements, address selection, order summary, server-validated COD rules, and digital wallet payment mocks).

---

## 6. Installation & Setup

### Prerequisites
- Node.js v20.x or higher
- npm v10.x or higher
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/lohithpahuja03/Berlin.git
cd Berlin
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start at `http://localhost:3000`.

### 3. Backend Setup
```bash
cd ../backend
npm install
npm run dev
```
The backend API will run at `http://localhost:5000`.

---

## 7. Environment Variables

Create `.env.local` inside `frontend/` and `.env` inside `backend/` using the templates below.

### Frontend (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=BERLIN
```

### Backend (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production
DATABASE_URL=postgresql://user:password@localhost:5432/berlin_db
```
*(Never commit actual secrets or credentials to Git.)*

---

## 8. Business Rules Reference

| Feature | Rule | Verification |
|---|---|---|
| **Default Theme** | Always opens in Dark Mode for new visitors | Client localStorage + default SSR class |
| **Cash on Delivery (COD)** | Valid only for orders between **₹699 and ₹4,999** | Server-side validation before order creation |
| **Order Cancellation** | Available only within **5 minutes (300 seconds)** | Server timestamp check |
| **Dynamic Pricing** | Base + Size + Addons = Total | Server validates item subtotals |
| **Order ID Format** | `BER-2026-XXXXX` | Generated sequentially on order creation |

---

## 9. Development Guidelines & Rules

- **Strict Root Structure:** Do not create loose files in the project root. All source code lives in `frontend/` or `backend/`.
- **Server Authority:** Never trust prices, totals, or payment flags coming from the browser. The backend always recalculates.
- **Maintain Memory:** Always check and update `BRAIN.md` and `ROADMAP.md` as development progresses.
