# 1Fi SDE Intern Assignment — 1Fi Marketplace

A production-grade implementation of the **1Fi Marketplace** section within the **Shop page** of the 1Fi application, built for the **1Fi SDE Intern Assignment**.

---

## 📌 Objective & Context

The objective of this assignment is to understand the existing 1Fi product experience, work within its design language and front-end stack, and build the **1Fi Marketplace** section within the existing **Shop** experience.

> **Note on Architecture & Scope:**  
> The 1Fi mobile/web experience operates on a clean, modern stack centered on **Mutual Fund backed EMIs** (where customers purchase devices on no-cost or low-cost EMIs while their mutual fund portfolio continues to generate returns). This project reproduces the 1Fi Shop experience as a full-stack Next.js web application adhering to 1Fi's exact design language (Geist typography, brand purple `#712CDC`, subtle neutral surfaces, and mobile-first responsiveness).

---

## 🚀 Features & Assignment Requirements

### 1. Shop Page Navigation

The Shop page (`/`) provides seamless navigation across the three required sections via tabbed routing (`/?tab=...`):

- **A. Top Brands** — Reachable placeholder view; intentionally kept blank per assignment specifications (_"no implementation is required; the page can remain blank"_).
- **B. Nearby Stores** — Reachable placeholder view; intentionally kept blank per assignment specifications.
- **C. 1Fi Marketplace** — Fully designed and implemented end-to-end shopping experience.

---

### 2. 1Fi Marketplace Implementation

The Marketplace allows users to browse flagship devices, inspect specifications, configure storage variants, and evaluate tailored EMI plans:

- **Product Listing Grid**:
  - Displays product images, product names, brand tags, and descriptions.
  - Variant chips previewing available storage configurations (e.g. 256GB, 512GB).
  - Dynamic pricing indicator displaying starting selling price, original MRP (with strikethrough), and starting monthly EMI (`₹X,XXX/mo`).
  - Direct navigation to individual product detail pages (`/products/[slug]`).

- **Product Detail View (`/products/[slug]`)**:
  - **Dynamic Image Gallery**: Responsive image preview with variant-specific switching and automatic fallback to placeholder SVG on error.
  - **Product Specifications**: Brand badge, product title, detailed description, and pricing breakdown.
  - **Pricing & Savings Block**: Displays current selling price, MRP, percentage discount badge, and total savings amount.
  - **Storage Variant Selector**: Interactive selection between hardware variants (e.g., 256GB vs. 512GB). Changing the variant immediately updates device pricing, swaps device imagery, and recalibrates the associated EMI plans.
  - **Mutual Fund Backed EMI Plans**:
    - Comprehensive tenure options (3, 6, 12, 24, 36, 48, and 60 months).
    - Monthly installment calculation based on the standard compound reducing-balance EMI formula.
    - Prominent **0% interest / No-Cost EMI** badges on qualifying short-term tenures.
    - **1Fi Cashback Badges**: Highlights instant cashback credited to the 1Fi wallet for select tenures.
  - **Single-Select Radio Interface**: Accessible radio group with visual radio indicators, accent border highlight, and keyboard navigation support (`Enter` / `Space`).
  - **Proceed CTA & Confirmation Flow**:
    - Sticky CTA bar on mobile (`sticky bottom-0`) with blur backdrop; disabled until an EMI plan is selected.
    - Launches a **Plan Confirmation Modal** detailing device price, tenure, monthly installment, interest rate, cashback reward, and total payable amount.

- **Resilience & State Handling**:
  - **Loading Skeletons**: Tailored shimmer skeleton states for both the Shop catalog and product detail screens ([loading.tsx](src/app/loading.tsx), [LoadingState.tsx](src/components/LoadingState.tsx)).
  - **Error Boundaries**: Root and page-level error boundaries with a recovery retry button ([error.tsx](src/app/error.tsx)).
  - **404 Handling**: Dedicated not-found view when requesting non-existent product slugs ([ErrorState.tsx](src/components/ErrorState.tsx)).
  - **Empty States**: Graceful fallback UI when no products or EMI plans are present.

---

## 🛠️ Technology Stack

| Layer                  | Technology                           | Rationale                                                             |
| :--------------------- | :----------------------------------- | :-------------------------------------------------------------------- |
| **Framework**          | **Next.js 16 (App Router)**          | High-performance server components and API route handlers.            |
| **Language**           | **TypeScript 5 (Strict)**            | End-to-end type safety across API responses and UI props.             |
| **Library**            | **React 19**                         | Modern concurrent rendering and state primitives.                     |
| **Styling**            | **Tailwind CSS 4 + CSS Variables**   | Native design tokens, dark mode compatibility, responsive layout.     |
| **ORM & Database**     | **Prisma ORM 6 + PostgreSQL**        | Relational data modeling, cascading relations, and migration support. |
| **Typography & Icons** | **Geist Sans / Mono + Lucide React** | Clean, minimalist fintech aesthetic consistent with 1Fi.              |

---

## 🗄️ Data Architecture & APIs

Per the assignment guidelines, **no product or EMI data is hardcoded into UI components**. All data is modeled relationally, stored in PostgreSQL, and fetched dynamically.

### Database Schema (`prisma/schema.prisma`)

```prisma
model Product {
  id          String    @id @default(cuid())
  slug        String    @unique
  name        String
  brand       String?
  description String?
  imageUrl    String
  createdAt   DateTime  @default(now())
  variants    Variant[]
}

model Variant {
  id           String    @id @default(cuid())
  productId    String
  product      Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  variantType  String    // e.g., "storage"
  variantValue String    // e.g., "256GB", "512GB"
  mrp          Int
  sellingPrice Int
  imageUrl     String?
  emiPlans     EmiPlan[]

  @@index([productId])
}

model EmiPlan {
  id            String   @id @default(cuid())
  variantId     String
  variant       Variant  @relation(fields: [variantId], references: [id], onDelete: Cascade)
  monthlyAmount Int
  tenureMonths  Int      // 3, 6, 12, 24, 36, 48, 60
  interestRate  Float    // 0 = No-cost EMI
  cashback      Int?     // 1Fi wallet cashback
  createdAt     DateTime @default(now())

  @@index([variantId])
}
```

### Financial EMI Formula (`prisma/seed.ts`)

EMI calculations adhere to standard financial math:
$$\text{EMI} = \frac{P \times r \times (1 + r)^n}{(1 + r)^n - 1}$$
_(where $P$ is principal selling price, $r$ is monthly interest rate, and $n$ is tenure in months; for $r = 0$, $\text{EMI} = P / n$)_.

### Dynamic REST Endpoints

- `GET /api/products`: Returns an array of available products with dynamically computed `startingPrice` and variant counts.
- `GET /api/products/[slug]`: Returns complete product details including sorted storage variants and nested EMI plans.

---

## 📂 Project Structure

```
1Fi/
├── prisma/
│   ├── schema.prisma             # Relational schema (Product -> Variant -> EmiPlan)
│   └── seed.ts                   # Seed script generating products, variants, and EMI plans
├── public/
│   └── images/                   # Vector device mockups (iPhone, Samsung, OnePlus)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── products/
│   │   │       ├── route.ts             # GET /api/products
│   │   │       └── [slug]/route.ts      # GET /api/products/[slug]
│   │   ├── products/[slug]/
│   │   │   ├── loading.tsx              # Product detail loading skeleton
│   │   │   └── page.tsx                 # Product detail server component + SEO metadata
│   │   ├── error.tsx                    # Global error boundary with retry CTA
│   │   ├── globals.css                  # Design tokens, color system, and shimmer animations
│   │   ├── layout.tsx                   # Root layout with Navbar and typography
│   │   ├── loading.tsx                  # Shop catalog loading skeleton
│   │   └── page.tsx                     # Shop page (Tabs: Top Brands, Nearby, Marketplace)
│   ├── components/
│   │   ├── EmiPlanCard.tsx              # Accessible radio card for individual EMI option
│   │   ├── EmiPlanList.tsx              # Container and header for variant EMI plans
│   │   ├── ErrorState.tsx               # 404 / error view with navigation back to Shop
│   │   ├── LoadingState.tsx             # Shimmer skeleton loader for product detail view
│   │   ├── Navbar.tsx                   # 1Fi branding header
│   │   ├── PriceBlock.tsx               # Selling price, MRP, discount badge, and savings text
│   │   ├── ProceedButton.tsx            # Sticky proceed button & confirmation modal
│   │   ├── ProductDetailClient.tsx      # Client orchestrator managing variant & EMI selection
│   │   ├── ProductImageGallery.tsx      # Device image display with variant sync & fallback
│   │   ├── ProductInfo.tsx              # Product title, brand tag, and overview description
│   │   ├── ShopPlaceholder.tsx          # Clean placeholder for Top Brands & Nearby Stores
│   │   ├── ShopTabs.tsx                 # Navigation tabs for Shop page sections
│   │   └── VariantSelector.tsx          # Interactive storage variant selector chips
│   └── lib/
│       ├── prisma.ts                    # Global Prisma client singleton
│       └── types.ts                     # TypeScript interfaces and contracts
├── .env.example                         # Environment configuration template
├── package.json                         # Project dependencies and npm scripts
├── tsconfig.json                        # TypeScript configuration
└── README.md                            # Project documentation
```

---

## ⚡ Getting Started Locally

### Prerequisites

- **Node.js** 18.18+ or 20+
- **npm** or **pnpm**
- A **PostgreSQL database** (local instance or free cloud database from [Neon](https://neon.tech), Supabase, etc.)

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd 1Fi
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update `DATABASE_URL` in `.env` with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/onefi?schema=public"
```

### 3. Initialize Database & Seed Data

Push the Prisma schema to your database and execute the seed script:

```bash
npx prisma db push
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the app.

---

## 🧪 Verification & Code Quality

The codebase passes all linting and type-checking audits without errors:

```bash
# Run TypeScript compilation check
npx tsc --noEmit

# Run ESLint validation
npm run lint
```

---

## 📱 Evaluation Criteria Alignment

1. **Product Understanding**: Captures 1Fi's distinctive value proposition ("Mutual Fund backed EMIs") across UI copy, pricing formulas, and checkout summaries.
2. **UI/UX Consistency**: Adheres to the 1Fi brand identity (`#712CDC` purple, Geist font, clean spacing, restrained accents).
3. **Engineering Quality**: Clean Next.js App Router architecture, modular React components, explicit TypeScript typing, and accessibility semantics (`role="radiogroup"`, `aria-checked`).
4. **Functionality**: Complete e-commerce flow from catalog browsing to variant switching, dynamic EMI calculation, and plan confirmation.
5. **Data & API Handling**: Fully dynamic data layer with normalized database relations and REST endpoints.
6. **Attention to Detail**: Polished loading skeletons, mobile-responsive sticky CTA bar, empty states, and comprehensive error handling.
