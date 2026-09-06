import { prisma } from '@/lib/prisma';
import ProductDetailClient from '@/components/ProductDetailClient';
import ErrorState from '@/components/ErrorState';
import { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, description: true },
  });

  if (!product) {
    return {
      title: 'Product Not Found - 1Fi',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} - EMI Plans backed by Mutual Funds | 1Fi`,
    description:
      product.description ||
      `Buy ${product.name} on EMI plans backed by mutual funds with instant cashback and zero foreclosure fees.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

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
    return (
      <ErrorState
        statusCode={404}
        title="Product Not Found"
        message={`We could not find any product matching "${slug}". Please explore our other flagship devices.`}
      />
    );
  }

  return <ProductDetailClient product={product} />;
}
