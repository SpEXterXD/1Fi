# 1Fi Store — EMI Plans Backed by Mutual Funds

A full-stack web application built for the **1Fi SDE Intern Assignment**. The platform showcases flagship smartphones paired with dynamic, tiered EMI plans backed by mutual fund investments. Customers can choose their preferred device and storage variant, review transparent EMI tenures with instant cashback benefits, and proceed with their chosen plan — all powered by a real PostgreSQL database without any hardcoded mock data.

**Live Demo:** [https://one-fi.vercel.app](https://one-fi.vercel.app)

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database & ORM:** [Prisma ORM](https://www.prisma.io/) with PostgreSQL (Neon hosted)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript
- **Deployment:** [Vercel](https://vercel.com/) + [Neon](https://neon.tech/) (managed PostgreSQL)

---

## Architecture & Data Flow

**Server Components (primary data path):** The product listing page (`app/page.tsx`) and the product detail page (`app/products/[slug]/page.tsx`) are Next.js Server Components. They query the PostgreSQL database directly via Prisma Client at request time — there is no client-side fetch involved for initial page renders. This means product data, variant information, and EMI plans are all server-rendered with no loading flash.

**Standalone REST API:** Two Route Handler endpoints are also available and can be called independently (e.g., from Postman or a mobile app). They are not used by the frontend pages themselves, but they expose the same data contract:
- `GET /api/products` — product summary list
- `GET /api/products/[slug]` — full product detail with nested variants and EMI plans

---

## Setup & Run Instructions

### 1. Clone & Install

```bash
git clone https://github.com/SpEXterXD/1Fi.git
cd 1Fi
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Inside `.env`, set your PostgreSQL connection string (Neon, Supabase, or local Postgres):

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

### 3. Initialize Database Schema & Seed Data

```bash
# Push schema tables to the database
npx prisma db push

# Seed products, variants, and EMI plans
npx prisma db seed
```

This creates 3 flagship smartphones, 2 storage variants each, and 7 EMI tenure plans per variant (42 EMI plans total).

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Schema

Three normalized relational entities: `Product` → `Variant` → `EmiPlan`.

EMI plans are attached to `Variant` (not `Product`) because pricing and monthly installments differ per storage size.

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
  id            String    @id @default(cuid())
  productId     String
  product       Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  variantType   String    // e.g. "storage"
  variantValue  String    // e.g. "256GB", "512GB"
  mrp           Int       // in INR (paise-free)
  sellingPrice  Int       // in INR
  imageUrl      String?
  emiPlans      EmiPlan[]

  @@index([productId])
}

model EmiPlan {
  id             String   @id @default(cuid())
  variantId      String
  variant        Variant  @relation(fields: [variantId], references: [id], onDelete: Cascade)
  monthlyAmount  Int      // in INR, calculated via standard EMI formula
  tenureMonths   Int      // 3, 6, 12, 24, 36, 48, or 60
  interestRate   Float    // annual rate; 0 = no-cost EMI
  cashback       Int?     // nullable; instant cashback in INR where applicable
  createdAt      DateTime @default(now())

  @@index([variantId])
}
```

---

## API Endpoints & Example Responses

### `GET /api/products`

Returns a summary list of all products.

**Example request:**
```bash
curl https://one-fi.vercel.app/api/products
```

**Example 200 response:**
```json
[
  {
    "id": "clx...",
    "slug": "iphone-17-pro",
    "name": "Apple iPhone 17 Pro",
    "brand": "Apple",
    "imageUrl": "/images/iphone-17-pro-desert.svg",
    "startingPrice": 127400,
    "variantCount": 2
  },
  {
    "id": "clx...",
    "slug": "samsung-galaxy-s24-ultra",
    "name": "Samsung Galaxy S24 Ultra 5G",
    "brand": "Samsung",
    "imageUrl": "/images/samsung-s24-ultra-gray.svg",
    "startingPrice": 121999,
    "variantCount": 2
  },
  {
    "id": "clx...",
    "slug": "oneplus-12",
    "name": "OnePlus 12 5G",
    "brand": "OnePlus",
    "imageUrl": "/images/oneplus-12-green.svg",
    "startingPrice": 64999,
    "variantCount": 2
  }
]
```

---

### `GET /api/products/[slug]`

Returns full product detail including all variants and their nested EMI plans.

**Example request:**
```bash
curl https://one-fi.vercel.app/api/products/iphone-17-pro
```

**Example 200 response:**
```json
{
  "id": "clx...",
  "slug": "iphone-17-pro",
  "name": "Apple iPhone 17 Pro",
  "brand": "Apple",
  "description": "The cutting-edge iPhone 17 Pro featuring an aerospace-grade titanium design, A19 Pro Bionic chip, and next-generation pro camera system.",
  "imageUrl": "/images/iphone-17-pro-desert.svg",
  "variants": [
    {
      "id": "clx...",
      "variantType": "storage",
      "variantValue": "256GB",
      "mrp": 134900,
      "sellingPrice": 127400,
      "imageUrl": "/images/iphone-17-pro-desert.svg",
      "emiPlans": [
        {
          "id": "clx...",
          "monthlyAmount": 42467,
          "tenureMonths": 3,
          "interestRate": 0,
          "cashback": 7500
        },
        {
          "id": "clx...",
          "monthlyAmount": 21233,
          "tenureMonths": 6,
          "interestRate": 0,
          "cashback": 5000
        },
        {
          "id": "clx...",
          "monthlyAmount": 11230,
          "tenureMonths": 12,
          "interestRate": 10.5,
          "cashback": 3000
        }
      ]
    }
  ]
}
```

**Example 404 response (invalid slug):**
```json
{ "error": "Product not found" }
```

---

## Deployment — Vercel + Neon PostgreSQL

### 1. Provision Neon PostgreSQL

Create a free database at [neon.tech](https://neon.tech). Copy the pooled connection string:

```
postgresql://<user>:<password>@<host>/neondb?sslmode=require
```

### 2. Run Schema + Seed Against Neon

```bash
DATABASE_URL="<neon-connection-string>" npx prisma db push
DATABASE_URL="<neon-connection-string>" npx prisma db seed
```

### 3. Import into Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → select this repository.
2. Vercel auto-detects Next.js — no build config changes needed.
3. Under **Project Settings → Environment Variables**, add:
   - `DATABASE_URL` = your Neon connection string (Production + Preview scopes)
4. The `postinstall` script (`prisma generate`) in `package.json` ensures Prisma Client is generated at build time automatically.

### 4. Deploy

Push to `main` — Vercel auto-deploys. Verify the live URL opens the product listing, each product detail page loads at its own slug URL, and `/api/products` returns JSON.

---

## Acceptance Criteria

- [x] Dynamic products served from real PostgreSQL database
- [x] No hardcoded arrays/objects in frontend components
- [x] 3 products (Apple iPhone 17 Pro, Samsung Galaxy S24 Ultra, OnePlus 12 5G)
- [x] 2 storage variants per product (256GB, 512GB)
- [x] Unique URL per product (`/products/[slug]`)
- [x] Product name, brand, description rendered
- [x] Variant selector — switches price, image, and EMI plans
- [x] MRP displayed with strikethrough styling
- [x] Selling price displayed
- [x] Product image displayed per variant
- [x] EMI plan list: monthly amount, tenure, interest rate, cashback (conditional)
- [x] Single-select EMI plan with visual radio feedback
- [x] Proceed button disabled until plan selected; shows plan summary modal on click
- [x] `GET /api/products` and `GET /api/products/[slug]` return correct data and status codes
- [x] 404 error state for invalid product slugs
- [x] Responsive at mobile, tablet, and desktop breakpoints
- [x] Loading state via Next.js `loading.tsx` (Suspense boundary)
- [x] App deployed at live public URL
