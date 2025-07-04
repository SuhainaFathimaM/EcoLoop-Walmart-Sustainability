/* ---------- Product definitions ---------- */
export const productTypes = [
  { id: '1', name: 'Laundry Detergent', category: 'Household', icon: 'Droplets', available: true },
  { id: '2', name: 'Herbal Shampoo', category: 'Personal Care', icon: 'Sparkles', available: true },
  { id: '3', name: 'Dishwashing Liquid', category: 'Household', icon: 'Utensils', available: true },
  { id: '4', name: 'Moisturizing Body Wash', category: 'Personal Care', icon: 'Heart', available: true },
  { id: '5', name: 'Alcohol-based Hand Sanitizer', category: 'Health & Safety', icon: 'Shield', available: false },
  { id: '6', name: 'Fabric Conditioner', category: 'Household', icon: 'Shirt', available: true },
];

/* ---------- Sample stores ---------- */
export const mockStores = [
  {
    id: 'hy-267',
    name: 'Walmart EcoLoop — Shivarampally, HYD',
    address:
      'S.No 2, 3, 4 & 5, Pillar No 267, Shivarampally, Inner Ring Rd, Opp. Indian Oil Pump, Hyderabad 500052',
    lat: 17.3355243,
    lng: 78.4269262,
    distance: 3.2,
    rating: 4.4,
    products: productTypes.filter((p) => ['1', '2', '3', '4'].includes(p.id)),
    hours: '7 AM – 10 PM',
    image:
      'https://tech.walmart.com/content/walmart-global-tech/en_us/blog/post/how-is-walmart-amplifying-shop-tech-for-its-customers/jcr:content/par/columns_new_copy/column_2/columns_new/column_1/image_2_0_copy.img.jpg/1672650777166.jpg',
  },
  {
    id: 'b2',
    name: 'Walmart India — DLF City Phase 4, Gurugram',
    address: 'DLF City Phase 4, Gurugram, Haryana 122002, India',
    lat: 28.4551,
    lng: 77.102,
    distance: 0.8,
    rating: 4.6,
    products: productTypes.filter((p) => ['2', '3', '4', '6'].includes(p.id)),
    hours: '6 AM – 11 PM',
    image:
      'https://www.dispatch.com/gcdn/media/2020/08/26/ColumbusOH/ghows-OH-200719250-aa1a2d1e.jpg?width=1320&height=832&fit=crop&format=pjpg&auto=webp',
  },
  {
    id: 'c3',
    name: 'Walmart — Miami, FL',
    address: '3200 NW 79th Street, Miami, FL 33147, USA',
    lat: 25.844,
    lng: -80.251,
    distance: 1.25,
    rating: 4.4,
    products: productTypes.filter((p) => ['1', '3', '4', '5', '6'].includes(p.id)),
    hours: '6 AM – 11 PM',
    image:
      'https://www.joonsquareusa.com/usermanage/image/business/walmart-supercenter-miami-dade-fl-2427/walmart-supercenter-miami-dade-fl-walmart-supercenter-05.jpg',
  },
];

/* ---------- Mock user statistics ---------- */
export const mockUserStats = {
  totalRefills: 24,
  totalReturns: 17,
  plasticSaved: 30.2, // kg
  loopPoints: 1300,
  co2Saved: 12.8, // metric tons
};
