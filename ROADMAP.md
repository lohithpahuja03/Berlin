# ROADMAP.md — PROJECT DEVELOPMENT ROADMAP

This document is the **SINGLE SOURCE OF TRUTH FOR DEVELOPMENT PROGRESS** for Berlin.

### Status Indicators:
- 🟩 = **COMPLETED**
- 🟨 = **CURRENTLY IN PROGRESS**
- ⬜ = **NOT STARTED**
- 🟥 = **BLOCKED / NEEDS ATTENTION**

---

## 🟩 Phase 1 — Project Foundation
- [x] Configure strictly controlled root structure (`frontend/`, `backend/`, `README.md`, `ROADMAP.md`, `BRAIN.md`, `.gitignore`)
- [x] Initialize Git workflow and connect remote
- [x] Bootstrap Next.js 16 with TypeScript & Tailwind CSS in `frontend/`
- [x] Bootstrap Node.js/Express TypeScript backend architecture in `backend/`
- [x] Setup baseline project documentation (`README.md`, `ROADMAP.md`, `BRAIN.md`)
- [x] Configure environment variables & scripts
- [x] Build verification: Both frontend and backend compile and build with 0 errors

*Completion criteria:* Both frontend and backend foundations run smoothly with clean architectures. (Satisfied)

---

## 🟩 Phase 2 — Design System & Brand
- [x] Establish Berlin brand identity (Deep Black `#080808`, Dark Charcoal, Crimson Red `#e50914`, Crisp White)
- [x] Configure Tailwind theme tokens, typography, and glass/border accents
- [x] Build reusable UI primitives: Button, Card, Badge, Modal, Input, Toast, Skeleton
- [x] Implement smooth animated Dark/Light theme system (Default: Dark Mode)
- [x] Establish animation and micro-interaction foundations

*Completion criteria:* A consistent, high-impact Berlin design system exists and powers all UI elements. (Satisfied)

---

## 🟩 Phase 3 — Global Layout
- [x] Desktop Navbar (Logo, Menu, Categories, Search bar, Offers, Cart counter, Profile, Theme Toggle)
- [x] Mobile responsive layout with bottom-friendly navigation and slide-out menu
- [x] Premium Footer with brand story, quick links, store info, social icons, and legal policies
- [x] Global search dialog and quick-navigation system
- [x] Global Toast and Notification Provider

*Completion criteria:* All global UI components are responsive, accessible, and active. (Satisfied)

---

## 🟩 Phase 4 — Homepage
- [x] Cinematic fast-food Hero section with dynamic headline, food photography, and CTA
- [x] Popular Categories carousel/grid (Burgers, Pizzas, Sides, Wraps, Desserts, Beverages)
- [x] Best Sellers section with interactive product cards
- [x] Special Offers & Coupon spotlight banner
- [x] Berlin Combos & Deals section
- [x] "Why Berlin?" feature grid (Superfast Delivery, Fresh Ingredients, Custom Creations, Live GPS)
- [x] Customer reviews & ratings wall
- [x] Final ordering CTA

*Completion criteria:* Homepage is polished and responsive. (Satisfied)

---

## 🟩 Phase 5 — Food & Category System
- [x] Fast-food catalog database models & seed data (strictly fast food)
- [x] Category navigation & filterable menu view
- [x] Search engine with fuzzy match, category filtering, and instant suggestions
- [x] Product cards with dietary tags (Veg/Non-Veg), ratings, badges, and quick customization triggers
- [x] Empty state for zero search results with recommended fast-food picks

*Completion criteria:* Users can intuitively browse, search, and filter the food menu. (Satisfied)

---

## 🟩 Phase 6 — Product Details & Customization
- [x] Interactive Product Customizer modal & dedicated product page
- [x] Product-specific size selection (Regular, Medium, Large)
- [x] Category-appropriate add-ons (Cheese Burst, Extra Patty, Jalapeños, Sauces, Dips)
- [x] Quantity selector
- [x] Real-time dynamic price calculator breakdown
- [x] Customization validation rules (no cheese burst on drinks)

*Completion criteria:* Complete dynamic customization with instant price updates and validation. (Satisfied)

---

## 🟩 Phase 7 — Cart
- [x] Slide-out Cart Drawer and dedicated `/cart` page
- [x] Customization breakdown per item (e.g., Large + Cheese Burst)
- [x] Real-time quantity adjustment, item removal, and empty state
- [x] Price breakdown: Food Subtotal, Applied Discount, Delivery Fee, Taxes, Total
- [x] Persistent cart storage across user sessions in localStorage

*Completion criteria:* Cart functions smoothly with persistent state and transparent pricing. (Satisfied)

---

## 🟩 Phase 8 — Authentication
- [x] Sign Up with Name, Email, Phone, Password validation
- [x] Secure Login with bcrypt-hashed credentials and 1-click Demo user option
- [x] Session management (JWT token persistence in localStorage)
- [x] Password reset / Forgot password flow
- [x] Protected customer routes & middleware

*Completion criteria:* Secure authentication flow with error handling and persistent session. (Satisfied)

---

## 🟩 Phase 9 — User Profile & Addresses
- [x] Customer dashboard with profile overview and avatar
- [x] Address Book CRUD: Add, delete, and set default delivery address
- [x] Order history summary & favorite food bookmarks
- [x] Account preferences and security settings

*Completion criteria:* Customers can manage saved delivery addresses and view profile details. (Satisfied)

---

## 🟩 Phase 10 — Discounts & Offers
- [x] Discount validation engine
- [x] First-order discount (`WELCOME100` - ₹100 OFF)
- [x] Promotional coupon codes (`BERLIN50`, `FEAST20`, `BURGERFEST`)
- [x] Minimum order value rules & maximum discount ceilings
- [x] Dedicated `/offers` showcase page with 1-click copy & apply

*Completion criteria:* Discounts work correctly and cannot be manipulated from the frontend. (Satisfied)

---

## 🟩 Phase 11 — Checkout
- [x] Step-by-step checkout wizard: Address -> Summary -> Coupon -> Payment -> Place Order
- [x] Address selection with quick-add modal & saved address selector
- [x] Order summary review with live pricing breakdown
- [x] Delivery instructions input & contact verification
- [x] Pre-order verification ensuring cart items and prices are valid

*Completion criteria:* User can seamlessly progress through checkout steps with zero friction. (Satisfied)

---

## 🟩 Phase 12 — Payment System
- [x] Multi-method payment selector: Cash on Delivery, Paytm, Google Pay, Card/UPI
- [x] **COD Rule Engine: Eligible strictly between ₹699 and ₹4,999 inclusive**
- [x] Backend & UI validation of COD limits with helpful threshold explanations
- [x] Interactive development payment gateway sandbox modal (`PaymentGatewayModal.tsx`) for Paytm / GPay
- [x] Secure payment verification and transaction state handling

*Completion criteria:* Payments operate securely with strict COD range enforcement. (Satisfied)

---

## 🟩 Phase 13 — Order System
- [x] Unique order number generator (`BER-2026-XXXXX`)
- [x] Server-side order creation & database transaction handling
- [x] Order confirmation page with summary, ETA, and immediate tracking link
- [x] Order history list with date, items, amount, status, and reorder capability
- [x] Dedicated order lookup by unique order ID

*Completion criteria:* Complete order lifecycle with unique identifiers and historical logging. (Satisfied)

---

## 🟩 Phase 14 — Order Cancellation
- [x] **Strict 5-minute (300 seconds) cancellation window**
- [x] Live countdown timer on active order page
- [x] Server-side timestamp validation (rejects cancellations > 5 min)
- [x] Order status transition to `Cancelled` with immediate UI feedback and toast confirmation

*Completion criteria:* Order cancellation is strictly enforced by server timestamp logic. (Satisfied)

---

## 🟩 Phase 15 — Order Tracking
- [x] Dedicated order tracking page (`/order/[id]`)
- [x] Visual multi-stage status timeline (Placed -> Confirmed -> Preparing -> Driver Assigned -> Out for Delivery -> Delivered)
- [x] Real-time estimated delivery countdown (ETA)
- [x] Driver profile card (Driver Name, Phone, Vehicle Number, Vehicle Type, Rating)
- [x] Status simulation testing tool to view all delivery stages

*Completion criteria:* Live tracking visually communicates every order stage clearly. (Satisfied)

---

## 🟩 Phase 16 — Driver & Location System
- [x] Driver database model and automated driver assignment logic
- [x] Interactive live route map visualizer showing store location, driver GPS coordinates, and delivery destination
- [x] Real-time route animation engine with smooth driver vehicle movement along route
- [x] Extensible driver tracking architecture ready for real GPS hardware webhooks

*Completion criteria:* Driver assignment and animated map tracking work smoothly in dev simulation. (Satisfied)

---

## 🟩 Phase 17 — Error, Loading & Empty States
- [x] Polished skeleton loaders for products, menus, profile, and tracking (`Skeleton.tsx`)
- [x] Friendly empty states for Cart ("Your bag is empty"), Orders, and Search
- [x] User-friendly toast and alert banners for failed coupons, network errors, and invalid inputs
- [x] Custom 404 Not Found (`not-found.tsx`) and Error boundary (`error.tsx`) pages styled to Berlin theme

*Completion criteria:* Zero blank screens; all edge cases have descriptive feedback. (Satisfied)

---

## 🟩 Phase 18 — Responsive & Mobile Optimization
- [x] Tailored mobile viewport experience with touch-optimized targets
- [x] Mobile bottom navigation bar (`MobileBottomNav.tsx`) for fast one-thumb app navigation
- [x] Mobile-optimized checkout and live tracking views
- [x] Verified responsive performance on Desktop, Tablet, and Mobile screens

*Completion criteria:* Seamless usability across phone, tablet, and widescreen desktop. (Satisfied)

---

## 🟩 Phase 19 — Security & Performance
- [x] Password hashing with bcrypt
- [x] Server-side total recalculation (no client price trust)
- [x] Input validation on all API endpoints and checkout submissions
- [x] Image optimization and responsive lazy loading
- [x] Sensitive secrets protected behind environment variables

*Completion criteria:* Production-grade security practices and high responsiveness. (Satisfied)

---

## 🟩 Phase 20 — Testing & Final QA
- [x] End-to-end journey test: Browse -> Customize -> Cart -> Auth -> Address -> COD/Paytm -> Order -> Cancel (within 5m)
- [x] Reorder journey test from order history
- [x] COD boundary testing (< ₹699 disallowed, ₹699-₹4,999 allowed, > ₹4,999 disallowed)
- [x] Dark/Light theme persistence test across sessions (Default: Dark Mode)
- [x] Next.js 16 production build check: 0 errors across all routes

*Completion criteria:* All core user journeys and edge cases pass verification. (Satisfied)

---

## 🟩 Phase 21 — Final Production Polish
- [x] Final UI micro-animations and typography fine-tuning
- [x] SEO metadata, Open Graph tags, and structured fast-food restaurant data
- [x] Centralized business configuration (kitchen hours, delivery radius, support channels)
- [x] Complete documentation update in README.md, ROADMAP.md, and BRAIN.md
- [x] Strict root directory structure verification and clean Git push

*Completion criteria:* Production-ready showcase platform ready for deployment. (Satisfied)
