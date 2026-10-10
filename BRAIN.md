# BRAIN.md — ANTI GRAVITY PROJECT MEMORY & OPERATING MANUAL

This document serves as the persistent memory, architectural record, and operating manual for the **BERLIN** project.

---

## 1. PROJECT IDENTITY
- **Project Name:** BERLIN
- **Tagline / Purpose:** Fast-food ordering and delivery platform built for speed, style, and culinary cravings.
- **Brand Identity:** 
  - **Colors:** Deep Black (`#080808` / `#0f0f0f`), Dark Charcoal surfaces (`#141414`, `#1e1e1e`), Fiery Red accents (`#e50914`, `#dc2626`, `#ff2b36`), Crisp White/Light typography (`#f3f4f6`, `#ffffff`).
  - **Feel:** Bold, energetic, modern, premium, food-focused, sleek.
  - **Default Experience:** Opens in **DARK MODE** by default for all new visitors.
- **Target Audience:** Fast-food lovers ordering gourmet burgers, stone-baked pizzas, crispy chicken, fries, wraps, beverages, combos, and desserts.
- **Core Concept:** "Less friction, more ordering." Intuitive navigation, dynamic food customization, real-time cart pricing, multi-tier discount engine, strict server-validated checkout with COD rules, live driver tracking with animated GPS updates, and server-enforced 5-minute cancellation window.

---

## 2. CURRENT DEVELOPMENT STATE
- **Current Phase:** Phase 21 — Final Production Polish (COMPLETED 🟩)
- **Current Sub-phase:** All 21 Phases Fully Completed, Tested, and Production-Ready
- **Last Completed Phase:** Phase 21 — Final Production Polish
- **Next Phase:** None — Ready for production deployment and showcase
- **Current Task:** All 21 phases of BERLIN have been completely built, verified with zero build errors, tested end-to-end, and deployed on localhost.
- **Current Blockers:** None
- **Last Major Change:** Built and verified Phases 11–21 (Checkout wizard, Payment sandbox for Paytm & GPay, COD rule engine, Order creation with unique IDs, 5-minute strict cancellation window, Live visual tracking & driver route simulator, Error/Loading states, Mobile bottom nav, Security/Performance, and final QA). Production builds passing cleanly. Frontend and backend running on localhost:3000 and localhost:5000.

---

## 3. TECHNOLOGY STACK
- **Frontend Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5 (Strict Mode)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4 with custom Berlin Black/Red design tokens
- **Icons:** Lucide React (`lucide-react`)
- **Animation & Transitions:** CSS animations, smooth transitions, micro-interactions
- **Backend Architecture:** Next.js Route Handlers (`src/app/api/...`), Server Actions, modular service layer
- **Database / Storage:** Relational database abstraction with robust schema:
  - Supports SQLite/PostgreSQL/Supabase relational schema with entities for Users, Addresses, Categories, Products, Sizes, Addons, Carts, Orders, Payments, Coupons, Drivers, and Status History.
- **Authentication:** Salted & hashed passwords using `bcryptjs`, secure session cookies.
- **Payments:** Extensible payment gateway boundary supporting Cash on Delivery (COD) and development mocks for Paytm / GPay.
- **Mapping & Location:** Interactive Leaflet / dynamic canvas-based route tracking engine with live simulated GPS updates and ETA calculation.

---

## 4. ARCHITECTURE
The repository adheres to a strictly controlled root folder rule containing ONLY:
`frontend/`, `backend/`, `README.md`, `ROADMAP.md`, `BRAIN.md`, `.gitignore`

```
Berlin/
├── frontend/                 # Next.js 16 App Router application
│   ├── src/
│   │   ├── app/              # Next.js App Router pages (Home, Menu, Customizer, Cart, Checkout, Track, Profile, Auth)
│   │   ├── components/       # UI components (Navbar, Footer, ProductCard, Customizer, CartDrawer, etc.)
│   │   ├── context/          # ThemeProvider, CartProvider, AuthProvider, ToastProvider
│   │   ├── lib/              # Client API helpers and formatters
│   │   └── types/            # Shared TypeScript definitions
│   ├── public/               # Static assets & food photography
│   └── package.json
└── backend/                  # Node.js TypeScript REST API server
    ├── src/
    │   ├── controllers/      # Route controllers (auth, catalog, cart, orders, coupons, tracking)
    │   ├── models/           # Relational schemas & repository data models
    │   ├── routes/           # REST API endpoints
    │   ├── services/         # Server-side business logic (pricing, COD validation, GPS simulator, cancellation)
    │   ├── middleware/       # JWT auth, validation, and error boundaries
    │   └── index.ts          # Express server entry point
    └── package.json
```

---

## 5. IMPORTANT BUSINESS RULES
1. **Default Theme:** New visitors MUST always load in **Dark Mode** (`#080808` base). Theme toggles to Light Mode (`#ffffff` base with red accents) and persists across visits via `localStorage`.
2. **Cash on Delivery (COD) Rule:** 
   - **Eligible ONLY between ₹699 and ₹4,999 (inclusive).**
   - For order totals < ₹699 or > ₹4,999, COD is disabled.
   - **This rule is strictly verified on the backend.**
3. **Order Cancellation Window:**
   - Orders can be cancelled **strictly within 5 MINUTES (300 seconds)** of creation.
   - Server validates order creation timestamp against current server time.
   - Live countdown timer displays remaining cancellation window.
4. **Food Catalog Focus:** Strictly fast food (Gourmet Burgers, Pizzas, Sides & Fries, Wraps, Beverages, Combos, Desserts). Absolutely no generic Indian home cooking (dal, sabzi, roti).
5. **Dynamic Price Calculation:** Base Price + Size Differential + Add-ons + Extra Toppings = Item Unit Price × Quantity. Calculated and enforced server-side.
6. **Order ID Format:** Unique format `BER-2026-XXXXX` generated upon confirmed order creation.
7. **Security & Integrity:** Never trust client-submitted order totals, item prices, or payment success flags. The server computes the authoritative subtotal, discount, delivery fee, and tax.

---

## 6. DATABASE KNOWLEDGE & ENTITIES
- **Users:** `id`, `name`, `email`, `phone`, `passwordHash`, `role`, `createdAt`
- **Addresses:** `id`, `userId`, `name`, `phone`, `houseFlat`, `street`, `area`, `city`, `state`, `pincode`, `deliveryInstructions`, `isDefault`
- **Categories:** `id`, `name`, `slug`, `icon`, `image`, `sortOrder`
- **Products:** `id`, `categoryId`, `name`, `slug`, `description`, `basePrice`, `image`, `rating`, `reviewCount`, `isVeg`, `isBestSeller`, `isNew`, `isAvailable`
- **ProductSizes:** `id`, `productId`, `name`, `priceModifier`
- **ProductAddons:** `id`, `productId` (or category-wide), `name`, `price`, `type` ('cheese', 'patty', 'sauce', 'topping', 'beverage')
- **Coupons:** `id`, `code`, `discountType` ('percent' | 'fixed'), `discountValue`, `minOrderValue`, `maxDiscount`, `description`, `firstOrderOnly`
- **Orders:** `id`, `userId`, `orderNumber`, `items`, `subtotal`, `discountAmount`, `couponCode`, `deliveryFee`, `tax`, `totalAmount`, `paymentMethod`, `paymentStatus`, `orderStatus`, `deliveryAddress`, `createdAt`, `driverId`, `cancelExpiresAt`
- **Drivers:** `id`, `name`, `phone`, `avatar`, `vehicleNumber`, `vehicleType`, `currentLat`, `currentLng`, `rating`, `isAvailable`
- **OrderStatusHistory:** `id`, `orderId`, `status`, `note`, `timestamp`

---

## 7. IMPORTANT DESIGN DECISIONS
1. **Next.js 16 App Router:** Enables rapid SSR for food menus and SEO, with client components for interactive customization modals and live driver map animations.
2. **Tailwind CSS Design Tokens:** Deep black `#080808`, charcoal `#141414`, rich crimson red `#e50914`, vivid red `#ff2442`. Gives a premium, energetic vibe reminiscent of top global food chains.
3. **Decoupled Payment Boundary:** Mock and sandbox architectures for Paytm/GPay allow realistic checkout flows without requiring real merchant credentials.
4. **Development GPS Simulator:** Driver coordinates smoothly interpolate towards delivery address coordinates to simulate real-time tracking during testing.

---

## 8. COMPLETED WORK
- **Phase 1 — Project Foundation (🟩 COMPLETED):** Strictly enforced root structure (`frontend/`, `backend/`, `README.md`, `ROADMAP.md`, `BRAIN.md`, `.gitignore`), Git remote connected, TypeScript configurations set.
- **Phase 2 — Design System & Brand (🟩 COMPLETED):** Berlin Deep Black & Crimson Red design tokens, CSS variables, typography, button variants, badges, modal, toast provider, and dark/light mode toggle.
- **Phase 3 — Global Layout (🟩 COMPLETED):** Sticky responsive Navbar with live bag badge & search trigger, mobile navigation drawer, comprehensive Footer with kitchen hours & legal policies, global Search modal.
- **Phase 4 — Homepage (🟩 COMPLETED):** Cinematic Hero section, 8-category visual grid, best-sellers cards, special offers spotlight banner, Berlin feast combos, "Why Berlin" guarantee pillars, and customer reviews wall.
- **Phase 5 — Food & Category System (🟩 COMPLETED):** Dedicated `/menu` page with category filter pills, dietary filters (All, Veg, Non-Veg), sorting options, and zero-match empty state.
- **Phase 6 — Product Details & Customization (🟩 COMPLETED):** Interactive `ProductCustomizerModal` with product-specific sizes (Regular, Double, Monster / Small, Medium, Large), category-appropriate add-ons (Cheese Burst, Extra Patty, Dips), and real-time dynamic pricing breakdown.
- **Phase 7 — Cart (🟩 COMPLETED):** Persistent `CartContext` in localStorage, slide-out `CartDrawer`, dedicated `/cart` page with item breakdown, quantity adjuster, and transparent bill calculation.
- **Phase 8 — Authentication (🟩 COMPLETED):** `AuthContext`, modal with Sign In & Sign Up tabs, 1-click demo login (`demo@berlin.food` / `Berlin123!`), JWT token persistence, and profile sync.
- **Phase 9 — User Profile & Addresses (🟩 COMPLETED):** Customer Profile dashboard (`/profile`), Address CRUD (add, delete, default address toggle), and past order history with 1-click Reorder.
- **Phase 10 — Discounts & Offers (🟩 COMPLETED):** Dedicated `/offers` page with promo coupons (`WELCOME100`, `BERLIN50`, `FEAST20`, `BURGERFEST`), 1-click copy & apply, and minimum spend validation.

---

## 9. CURRENT PROBLEMS / BLOCKERS
- Real payment gateways (Paytm/GPay production credentials) and real GPS hardware require live merchant accounts. Handled via the development payment & GPS simulator abstraction layer.

---

## 10. DO NOT BREAK THESE RULES
1. **Never expose secrets or private keys.**
2. **Never trust frontend prices or payment status.** All calculations and status transitions are validated server-side.
3. **Never allow COD outside the ₹699 - ₹4,999 range.**
4. **Never allow order cancellation after 5 minutes.**
5. **Always default to Dark Mode for fresh sessions.**
6. **Always read `BRAIN.md` and `ROADMAP.md` before starting any phase.**
7. **Always update `ROADMAP.md` and `BRAIN.md` when completing a phase.**
8. **Keep the menu strictly fast food (burgers, pizzas, wraps, fries, combos, desserts, beverages).**
