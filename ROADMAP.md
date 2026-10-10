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
