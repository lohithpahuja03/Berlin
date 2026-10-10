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

## ⬜ Phase 2 — Design System & Brand
- [ ] Establish Berlin brand identity (Deep Black `#080808`, Dark Charcoal, Crimson Red `#e50914`, Crisp White)
- [ ] Configure Tailwind theme tokens, typography, and glass/border accents
- [ ] Build reusable UI primitives: Button, Card, Badge, Modal, Input, Toast, Skeleton
- [ ] Implement smooth animated Dark/Light theme system (Default: Dark Mode)
- [ ] Establish animation and micro-interaction foundations

*Completion criteria:* A consistent, high-impact Berlin design system exists and powers all UI elements.

---

## ⬜ Phase 3 — Global Layout
- [ ] Desktop Navbar (Logo, Menu, Categories, Search bar, Offers, Cart counter, Profile, Theme Toggle)
- [ ] Mobile responsive layout with bottom-friendly navigation and slide-out menu
- [ ] Premium Footer with brand story, quick links, store info, social icons, and legal policies
- [ ] Global search dialog and quick-navigation system
- [ ] Global Toast and Notification Provider

*Completion criteria:* All global UI components are responsive, accessible, and active.

---

## ⬜ Phase 4 — Homepage
- [ ] Cinematic fast-food Hero section with dynamic headline, food photography, and CTA
- [ ] Popular Categories carousel/grid (Burgers, Pizzas, Sides, Wraps, Desserts, Beverages)
- [ ] Best Sellers section with interactive product cards
- [ ] Special Offers & Coupon spotlight banner
- [ ] Berlin Combos & Deals section
- [ ] "Why Berlin?" feature grid (Superfast Delivery, Fresh Ingredients, Custom Creations, Live GPS)
- [ ] Customer reviews & ratings wall
- [ ] Final ordering CTA

*Completion criteria:* Homepage looks visually stunning, fast, and fully responsive.

---

## ⬜ Phase 5 — Food & Category System
- [ ] Fast-food catalog database models & seed data (strictly fast food)
- [ ] Category navigation & filterable menu view
- [ ] Search engine with fuzzy match, category filtering, and instant suggestions
- [ ] Product cards with dietary tags (Veg/Non-Veg), ratings, badges, and quick customization triggers
- [ ] Empty state for zero search results with recommended fast-food picks

*Completion criteria:* Users can intuitively browse, search, and filter the food menu.

---

## ⬜ Phase 6 — Product Details & Customization
- [ ] Interactive Product Customizer modal & dedicated product page
- [ ] Product-specific size selection (Regular, Medium, Large)
- [ ] Category-appropriate add-ons (Cheese Burst, Extra Patty, Jalapeños, Sauces, Dips)
- [ ] Quantity selector
- [ ] Real-time dynamic price calculator breakdown
- [ ] Customization validation rules (no cheese burst on drinks)

*Completion criteria:* Complete dynamic customization with instant price updates and validation.

---

## ⬜ Phase 7 — Cart
- [ ] Slide-out Cart Drawer and dedicated `/cart` page
- [ ] Customization breakdown per item (e.g., Large + Cheese Burst)
- [ ] Real-time quantity adjustment, item removal, and empty state
- [ ] Price breakdown: Food Subtotal, Applied Discount, Delivery Fee, Taxes, Total
- [ ] Persistent cart storage across user sessions

*Completion criteria:* Cart functions smoothly with persistent state and transparent pricing.

---

## ⬜ Phase 8 — Authentication
- [ ] Sign Up with Name, Email, Phone, Password validation
- [ ] Secure Login with bcrypt-hashed credentials
- [ ] Session management (secure HTTP-only cookie or JWT)
- [ ] Password reset / Forgot password flow
- [ ] Protected customer routes & middleware

*Completion criteria:* Secure authentication flow with error handling and persistent session.

---

## ⬜ Phase 9 — User Profile & Addresses
- [ ] Customer dashboard with profile overview and avatar
- [ ] Address Book CRUD: Add, edit, delete, and set default delivery address
- [ ] Order history summary & favorite food bookmarks
- [ ] Account preferences and security settings

*Completion criteria:* Customers can manage saved delivery addresses and view profile details.

---

## ⬜ Phase 10 — Discounts & Offers
- [ ] Discount validation engine
- [ ] First-order discount (`WELCOME100` - ₹100 OFF)
- [ ] Promotional coupon codes (`BERLIN50`, `FEAST20`)
- [ ] Minimum order value rules & maximum discount ceilings
- [ ] Transparent breakdown explaining applied savings

*Completion criteria:* Discounts are strictly validated server-side without client tampering.

---

## ⬜ Phase 11 — Checkout
- [ ] Step-by-step checkout wizard: Address -> Summary -> Coupon -> Payment -> Place Order
- [ ] Address selection with quick-add modal
- [ ] Order summary review with live pricing breakdown
- [ ] Delivery instructions input

*Completion criteria:* User can seamlessly progress through checkout steps with zero friction.

---

## ⬜ Phase 12 — Payment System
- [ ] Multi-method payment selector: Cash on Delivery, Paytm, Google Pay
- [ ] **COD Rule Engine: Eligible strictly between ₹699 and ₹4,999 inclusive**
- [ ] Backend validation of COD limits with helpful UI explanations
- [ ] Development payment gateway boundary for Paytm / GPay
- [ ] Secure payment verification flow

*Completion criteria:* Payments operate securely with strict COD range enforcement.

---

## ⬜ Phase 13 — Order System
- [ ] Unique order number generator (`BER-2026-XXXXX`)
- [ ] Server-side order creation & database transaction
- [ ] Order confirmation page with summary, ETA, and immediate tracking link
- [ ] Order history list with date, items, amount, and reorder capability

*Completion criteria:* Complete order lifecycle with unique identifiers and historical logging.

---

## ⬜ Phase 14 — Order Cancellation
- [ ] **Strict 5-minute (300 seconds) cancellation window**
- [ ] Live countdown timer on active order page
- [ ] Server-side timestamp validation (rejects cancellations > 5 min)
- [ ] Order status transition to `Cancelled` with immediate UI feedback

*Completion criteria:* Order cancellation is strictly enforced by server timestamp logic.

---

## ⬜ Phase 15 — Order Tracking
- [ ] Dedicated order tracking page (`/order/[id]`)
- [ ] Visual multi-stage status timeline (Placed -> Confirmed -> Preparing -> Driver Assigned -> Out for Delivery -> Delivered)
- [ ] Real-time estimated delivery countdown (ETA)
- [ ] Driver profile card (Driver Name, Phone, Vehicle Number, Vehicle Type, Rating)

*Completion criteria:* Live tracking visually communicates every order stage clearly.

---

## ⬜ Phase 16 — Driver & Location System
- [ ] Driver database model and automated assignment logic
- [ ] Interactive live map showing store location, driver GPS coordinates, and delivery destination
- [ ] Real-time location simulation engine with smooth animated driver movement
- [ ] Extensible driver tracking architecture ready for real GPS hardware

*Completion criteria:* Driver assignment and animated map tracking work smoothly in dev simulation.

---

## ⬜ Phase 17 — Error, Loading & Empty States
- [ ] Polished skeleton loaders for products, menus, profile, and tracking
- [ ] Friendly empty states for Cart ("Your cart is feeling lonely"), Orders, and Search
- [ ] User-friendly error banners for failed coupons, network errors, and invalid inputs
- [ ] 404 Not Found and 500 error boundary pages

*Completion criteria:* Zero blank screens; all edge cases have descriptive feedback.

---

## ⬜ Phase 18 — Responsive & Mobile Optimization
- [ ] Tailored mobile viewport experience with touch-optimized targets
- [ ] Bottom sheet / drawer for mobile food customization
- [ ] Mobile-optimized checkout and tracking views
- [ ] Verified performance on Desktop, Tablet, and Mobile screens

*Completion criteria:* Seamless usability across phone, tablet, and widescreen desktop.

---

## ⬜ Phase 19 — Security & Performance
- [ ] Password hashing with bcrypt
- [ ] Server-side total recalculation (no client price trust)
- [ ] Input validation on all API endpoints
- [ ] Image optimization and lazy loading
- [ ] Sensitive secrets protected behind environment variables

*Completion criteria:* Production-grade security practices and high responsiveness.

---

## ⬜ Phase 20 — Testing & Final QA
- [ ] End-to-end journey test: Browse -> Customize -> Cart -> Auth -> Address -> COD/Paytm -> Order -> Cancel (within 5m)
- [ ] Reorder journey test
- [ ] COD boundary testing (< ₹699 disallowed, ₹699-₹4,999 allowed, > ₹4,999 disallowed)
- [ ] Dark/Light theme persistence test across sessions

*Completion criteria:* All core user journeys and edge cases pass verification.

---

## ⬜ Phase 21 — Final Production Polish
- [ ] Final UI micro-animations and typography fine-tuning
- [ ] SEO metadata, Open Graph tags, and structured data
- [ ] Centralized business configuration (contact, hours, addresses)
- [ ] Documentation update and clean Git commit

*Completion criteria:* Production-ready showcase platform ready for deployment.
