import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: {
          select: {
            sellingPrice: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const response = products.map((product) => {
      const minPrice =
        product.variants.length > 0
          ? Math.min(...product.variants.map((v) => v.sellingPrice))
          : 0;

      return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        imageUrl: product.imageUrl,
        startingPrice: minPrice,
        variantCount: product.variants.length,
      };
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products from database' },
      { status: 500 }
    );
  }
}
