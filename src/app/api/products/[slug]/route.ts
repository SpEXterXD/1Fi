import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Product slug is required' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        variants: {
          include: {
            emiPlans: {
              orderBy: {
                tenureMonths: 'asc',
              },
            },
          },
          orderBy: {
            sellingPrice: 'asc',
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve product details' },
      { status: 500 }
    );
  }
}
