import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function calculateEmi(principal: number, annualRatePercent: number, tenureMonths: number): number {
  if (annualRatePercent === 0) {
    return Math.round(principal / tenureMonths);
  }
  const monthlyRate = annualRatePercent / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

const tenureConfigs = [
  { tenureMonths: 3, interestRate: 0, cashback: 7500 },
  { tenureMonths: 6, interestRate: 0, cashback: 5000 },
  { tenureMonths: 12, interestRate: 10.5, cashback: 3000 },
  { tenureMonths: 24, interestRate: 12.0, cashback: 2000 },
  { tenureMonths: 36, interestRate: 13.5, cashback: null },
  { tenureMonths: 48, interestRate: 14.0, cashback: null },
  { tenureMonths: 60, interestRate: 15.0, cashback: null },
];

async function main() {
  console.log('Clearing existing database records...');
  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  console.log('Seeding products, variants, and EMI plans...');

  const productsData = [
    {
      slug: 'iphone-17-pro',
      name: 'Apple iPhone 17 Pro',
      brand: 'Apple',
      description:
        'The cutting-edge iPhone 17 Pro featuring an aerospace-grade titanium design, A19 Pro Bionic chip, and next-generation pro camera system.',
      imageUrl: '/images/iphone-17-pro-desert.svg',
      variants: [
        {
          variantType: 'storage',
          variantValue: '256GB',
          mrp: 134900,
          sellingPrice: 127400,
          imageUrl: '/images/iphone-17-pro-desert.svg',
        },
        {
          variantType: 'storage',
          variantValue: '512GB',
          mrp: 154900,
          sellingPrice: 147400,
          imageUrl: '/images/iphone-17-pro-titanium.svg',
        },
      ],
    },
    {
      slug: 'samsung-galaxy-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra 5G',
      brand: 'Samsung',
      description:
        'Galaxy AI is here. Titanium exterior, 200MP camera with Quad Telephoto, built-in S Pen, and Snapdragon 8 Gen 3 for Galaxy.',
      imageUrl: '/images/samsung-s24-ultra-gray.svg',
      variants: [
        {
          variantType: 'storage',
          variantValue: '256GB',
          mrp: 134999,
          sellingPrice: 121999,
          imageUrl: '/images/samsung-s24-ultra-gray.svg',
        },
        {
          variantType: 'storage',
          variantValue: '512GB',
          mrp: 144999,
          sellingPrice: 131999,
          imageUrl: '/images/samsung-s24-ultra-black.svg',
        },
      ],
    },
    {
      slug: 'oneplus-12',
      name: 'OnePlus 12 5G',
      brand: 'OnePlus',
      description:
        'Smooth beyond belief. Snapdragon 8 Gen 3, 2K 120Hz ProXDR display, 4th Gen Hasselblad Camera System, and 100W SUPERVOOC charging.',
      imageUrl: '/images/oneplus-12-green.svg',
      variants: [
        {
          variantType: 'storage',
          variantValue: '256GB',
          mrp: 69999,
          sellingPrice: 64999,
          imageUrl: '/images/oneplus-12-green.svg',
        },
        {
          variantType: 'storage',
          variantValue: '512GB',
          mrp: 74999,
          sellingPrice: 69999,
          imageUrl: '/images/oneplus-12-black.svg',
        },
      ],
    },
  ];

  for (const productData of productsData) {
    const { variants, ...prod } = productData;
    const createdProduct = await prisma.product.create({
      data: {
        ...prod,
      },
    });

    console.log(`Created product: ${createdProduct.name} (${createdProduct.slug})`);

    for (const variantData of variants) {
      const createdVariant = await prisma.variant.create({
        data: {
          productId: createdProduct.id,
          variantType: variantData.variantType,
          variantValue: variantData.variantValue,
          mrp: variantData.mrp,
          sellingPrice: variantData.sellingPrice,
          imageUrl: variantData.imageUrl,
        },
      });

      console.log(`  Created variant: ${createdVariant.variantValue} - ₹${createdVariant.sellingPrice}`);

      // Seed 7 EMI plans for this variant
      for (const config of tenureConfigs) {
        const monthlyAmount = calculateEmi(createdVariant.sellingPrice, config.interestRate, config.tenureMonths);

        await prisma.emiPlan.create({
          data: {
            variantId: createdVariant.id,
            monthlyAmount,
            tenureMonths: config.tenureMonths,
            interestRate: config.interestRate,
            cashback: config.cashback,
          },
        });
      }
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
