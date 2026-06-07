export const shopConfig = {
  contactEmail: 'inquiries@amaryllis.no',
  emailerEndpoint: 'https://emailer-withered-snow-9611.fly.dev/send-email',
  currencySymbol: '$',
  paymentMethods:
    'Bank transfer, PayPal invoice, or local payment methods by agreement.',
  shippingEstimates: [
    { region: 'Norway', minKg: 0, maxKg: 1, estimateUSD: 10 },
    { region: 'EU', minKg: 0, maxKg: 1, estimateUSD: 25 },
    { region: 'US', minKg: 0, maxKg: 1, estimateUSD: 42 },
    { region: 'Asia', minKg: 0, maxKg: 1, estimateUSD: 50 },
    { region: 'Rest of World', minKg: 0, maxKg: 1, estimateUSD: 45 },
  ],
  statuses: {
    available: 'available',
    sold: 'sold',
    onSale: 'on sale',
  },
};

// Set status to "sold" for paintings that are no longer available.
export const shopProducts = [
  {
    id: 'art-001',
    title: '"Untitled"',
    year: 2026,
    price: 280,
    reducedPrice: 200,
    status: shopConfig.statuses.onSale,
    size: '29,7 x 21,0 cm (A4)',
    medium: 'Oil on canvas paper',
    image: '/assets/images/art/sale/oil1.webp',
    images: ['/assets/images/art/sale/oil1.webp'],
    description:
      'My second oil painting. A somewhat dreary scene of a forest entrance, covered by fog and clouds.',
  },
  {
    id: 'oil-005',
    title: '"Vie"',
    year: 2026,
    price: 350,
    reducedPrice: 300,
    status: shopConfig.statuses.onSale,
    size: '21,0 x 29,7 cm (A4)',
    medium: 'Oil on canvas paper',
    image: '/assets/images/art/sale/vie-oil.jpg',
    images: ['/assets/images/art/sale/vie-oil.jpg'],
    description:
      'First oil painting of Vie, inspired by the "Secrets are Secrets For a Reason" album. Might be cursed - buy at your own risk.',
  },
  {
    id: 'art-002',
    title: '"Vie"',
    year: 2022,
    price: 240,
    size: '21,0 x 29,7 cm (A4)',
    medium: 'Acrylics on paper',
    image: '/assets/images/art/sale/vie1.jpg',
    images: ['/assets/images/art/sale/vie1.jpg'],
    description:
      'First physical manifestation of Vie. Might be cursed - buy at your own risk.',
    status: 'sold',
  },

  {
    id: 'oil-003',
    title: '"Untitled"',
    year: 2026,
    price: 200,
    reducedPrice: 150,
    status: shopConfig.statuses.onSale,
    size: '21,0 x 29,7 cm (A4)',
    medium: 'Oils on paper',
    image: '/assets/images/art/sale/oil2.webp',
    images: ['/assets/images/art/sale/oil2.webp'],
    description: 'One of my first experimentations with oils.',
  },

  {
    id: 'oil-004',
    title: '"Hyponopompia"',
    year: 2026,
    price: 220,
    reducedPrice: 180,
    status: shopConfig.statuses.onSale,
    size: ' 29,7 x 21,0 cm (A4)',
    medium: 'Oil on canvas paper',
    image: '/assets/images/art/sale/oil4.webp',
    images: ['/assets/images/art/sale/oil4.webp'],
    description:
      'Frantic expressionistic oil painting inspired by a hypnopompic hallucination I had. Might be cursed - buy at your own risk.',
  },
];
