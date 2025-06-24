export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'subscription' | 'payment';
  price?: number;
  currency?: string;
  interval?: 'month' | 'year';
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_SXzxN1CxJ3RDip',
    priceId: 'price_1RctxSRtl07aE8XKVTIjMkyp',
    name: 'Skillarena',
    description: 'AI-powered gamified learning & game-testing platform',
    mode: 'subscription',
    price: 9.99,
    currency: 'usd',
    interval: 'month'
  }
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}

export function getProductById(id: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.id === id);
}