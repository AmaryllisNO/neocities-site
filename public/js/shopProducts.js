export const shopConfig = {
  contactEmail: 'youremail@example.com',
  currencySymbol: '$',
  paymentMethods:
    'Bank transfer, PayPal invoice, or local payment methods by agreement.',
  shippingEstimates: [
    { region: 'Norway', minKg: 0, maxKg: 1, estimateNOK: 100 },
    { region: 'EU', minKg: 0, maxKg: 1, estimateNOK: 250 },
    { region: 'US', minKg: 0, maxKg: 1, estimateNOK: 420 },
    { region: 'Asia', minKg: 0, maxKg: 1, estimateNOK: 500 },
    { region: 'Rest of World', minKg: 0, maxKg: 1, estimateNOK: 450 },
  ],
};

// Set status to "sold" for paintings that are no longer available.
export const shopProducts = [
  {
    id: 'oil-001',
    title: 'Nocturne Over Fjord',
    price: 420,
    size: '40 x 50 cm',
    medium: 'Oil on canvas',
    image: '/assets/images/03052022.jpg',
    description:
      'A deep blue nightscape with layered mist and glacial shoreline.',
    status: 'available',
  },
  {
    id: 'oil-002',
    title: 'Ashen Garden',
    price: 360,
    size: '30 x 40 cm',
    medium: 'Oil on linen panel',
    image: '/assets/images/03052022.jpg',
    description: 'Muted floral forms in charcoal and ember tones.',
    status: 'available',
  },
  {
    id: 'oil-003',
    title: 'Cathedral Rain',
    price: 560,
    size: '50 x 70 cm',
    medium: 'Oil on canvas',
    image: '/assets/images/03052022.jpg',
    description: 'Gothic verticals, rainfall haze, and warm reflected light.',
    status: 'sold',
  },
];
