# 1Fi SDE Intern Assignment — 1Fi Marketplace

A production-grade implementation of the **1Fi Marketplace** section within the **Shop page** of the 1Fi application, built for the **1Fi SDE Intern Assignment**.

---

## Objective and Context

The objective of this assignment is to evaluate the ability to understand the existing 1Fi product experience, work within its design system and front-end stack, and build the **1Fi Marketplace** section within the existing **Shop** experience.

> **Architecture and Scope:**  
> The 1Fi mobile and web experience operates on a stack centered on **Mutual Fund backed EMIs** (enabling users to purchase devices on no-cost or low-cost EMIs while their mutual fund investments continue to earn compounding returns). This project reproduces the 1Fi Shop experience as a full-stack Next.js web application adhering to 1Fi's design language (Geist typography, brand purple `#712CDC`, neutral surfaces, and mobile-first responsiveness).

---

## Features and Requirements

### 1. Shop Page Navigation

The Shop experience provides navigation across the three required sections via dedicated routes (`/top-brands`, `/nearby-stores`, Marketplace at `/`):

- **A. Top Brands**: Reachable placeholder view; left blank per assignment specifications (*"no implementation is required; the page can remain blank"*).
- **B. Nearby Stores**: Reachable placeholder view; left blank per assignment specifications.
- **C. 1Fi Marketplace**: Fully designed and implemented end-to-end shopping experience.

---

### 2. 1Fi Marketplace Implementation

The Marketplace allows users to browse flagship devices, inspect specifications, configure hardware variants, and evaluate tailored EMI options:

- **Product Listing Grid**:
  - Displays device images, product names, brand tags, and overview descriptions.
  - Variant tags previewing available hardware configurations (e.g., 256GB, 512GB).
  - Dynamic pricing indicator showing lowest selling price, original MRP (with strikethrough), and starting monthly installment (`₹X,XXX/mo`).
  - Direct navigation to individual product detail pages (`/products/[slug]`).

- **Product Detail View (`/products/[slug]`)**:
  - **Dynamic Image Gallery**: Responsive image display with variant-specific switching and fallback to placeholder SVG on image failure.
  - **Product Specifications**: Brand badge, product title, detailed description, and pricing breakdown.
  - **Pricing and Savings Block**: Displays selling price, MRP, percentage discount badge, and total savings amount.
  - **Storage Variant Selector**: Interactive selection between hardware storage options. Switching variants immediately updates device pricing, swaps device imagery, and recalibrates associated EMI plans.
  - **Mutual Fund Backed EMI Plans**:
    - Comprehensive tenure options (3, 6, 12, 24, 36, 48, and 60 months).
    - Monthly installment calculation based on the standard compound reducing-balance EMI formula.
    - Prominent **0% interest / No-Cost EMI** badges on qualifying short-term tenures.
    - **1Fi Cashback Badges**: Highlights instant cashback credited to the 1Fi wallet for select tenures.
  - **Single-Select Radio Interface**: Accessible radio group with visual indicators, accent highlights, and full keyboard navigation support (`Enter` / `Space`).
  - **Proceed CTA and Confirmation Flow**:
    - Sticky CTA bar on mobile (`sticky bottom-0`) with backdrop blur; disabled until an EMI plan is selected.
    - Launches a modal summarizing device price, tenure, monthly installment, interest rate, cashback reward, and total payable amount.

- **Resilience and State Handling**:
  - **Loading Skeletons**: Shimmer skeleton states matching layout dimensions for both catalog and detail pages ([loading.tsx](src/app/loading.tsx), [LoadingState.tsx](src/components/LoadingState.tsx)).
  - **Error Boundaries**: Root and page-level error boundaries with a recovery retry action ([error.tsx](src/app/error.tsx)).
  - **404 Handling**: Dedicated not-found view when requesting invalid product slugs ([ErrorState.tsx](src/components/ErrorState.tsx)).
  - **Empty States**: Fallback UI when no products or EMI plans are available.

---

## Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | High-performance server components and API route handlers. |
| **Language** | **TypeScript 5 (Strict)** | End-to-end type safety across API responses and UI props. |
| **Library** | **React 19** | Modern concurrent rendering and state primitives. |
| **Styling** | **Tailwind CSS 4 + CSS Variables** | Native design tokens, dark mode compatibility, responsive layout. |
| **ORM and Database** | **Prisma ORM 6 + PostgreSQL** | Relational data modeling, cascading relations, and migration support. |
| **Typography and Icons** | **Geist Sans / Mono + Lucide React** | Clean, minimalist fintech aesthetic consistent with 1Fi. |

---

## Data Architecture and APIs

Per the assignment guidelines, product and EMI information is not hardcoded into UI components. All data is structured relationally, stored in PostgreSQL, and fetched dynamically.

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

EMI calculations adhere to the standard reducing-balance formula:

$$\text{EMI} = \frac{P \times r \times (1 + r)^n}{(1 + r)^n - 1}$$

*(where $P$ is principal selling price, $r$ is monthly interest rate, and $n$ is tenure in months; for $r = 0$, $\text{EMI} = P / n$)*.

### REST Endpoints

- `GET /api/products`: Returns an array of available products with dynamically computed `startingPrice` and variant counts.
- `GET /api/products/[slug]`: Returns full product details including sorted storage variants and nested EMI plans.

---

## Project Structure

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
│   │   ├── nearby-stores/page.tsx       # Nearby Stores section (intentionally blank placeholder)
│   │   ├── products/[slug]/
│   │   │   ├── loading.tsx              # Product detail loading skeleton
│   │   │   └── page.tsx                 # Product detail server component + SEO metadata
│   │   ├── top-brands/page.tsx          # Top Brands section (intentionally blank placeholder)
│   │   ├── error.tsx                    # Global error boundary with retry CTA
│   │   ├── globals.css                  # Design tokens, color system, and shimmer animations
│   │   ├── layout.tsx                   # Root layout with Navbar and typography
│   │   ├── loading.tsx                  # Shop catalog loading skeleton
│   │   ├── middleware.ts                # Redirects legacy ?tab= links to real section routes
│   │   └── page.tsx                     # 1Fi Marketplace section (product catalog)
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
│   │   ├── ShopShell.tsx                # Shared Shop chrome (section tabs + footer)
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

## Getting Started

### Prerequisites

- **Node.js** 18.18+ or 20+
- **npm** or **pnpm**
- A **PostgreSQL database** (local instance or cloud database such as Neon or Supabase)

### 1. Clone and Install Dependencies

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

### 3. Initialize Database and Seed Data

Push the Prisma schema to your database and execute the seed script:

```bash
npx prisma db push
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Verification and Code Quality

The codebase passes all linting and type-checking audits:

```bash
# Run TypeScript compilation check
npx tsc --noEmit

# Run ESLint validation
npm run lint
```
