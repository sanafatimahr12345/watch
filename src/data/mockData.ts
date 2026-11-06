import { Product, EditorialArticle, CategoryNav } from '../types';
import { IMAGES } from '../assets/images';

export const CATEGORIES: CategoryNav[] = [
  { id: 'headphones', label: 'Headphones', iconName: 'Headphones' },
  { id: 'earbuds', label: 'Earbuds', iconName: 'Disc' },
  { id: 'speakers', label: 'Speakers', iconName: 'Volume2' },
  { id: 'microphones', label: 'Microphones', iconName: 'Mic' },
  { id: 'amplifiers', label: 'Amplifiers', iconName: 'Sliders' },
  { id: 'accessories', label: 'Accessories', iconName: 'Layers' },
  { id: 'new-arrivals', label: 'New Arrivals', iconName: 'Sparkles' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'audiome-a1000',
    name: 'Audiomé A1000',
    category: 'headphones',
    categoryLabel: 'Over-Ear Headphones',
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviewCount: 320,
    image: IMAGES.cardHeadphones,
    secondaryImage: IMAGES.hero,
    description: 'Reference-grade wireless active noise-canceling headphones engineered with 40mm custom beryllium diaphragms and luxury lambskin cushions.',
    specs: {
      driver: '40mm Custom Beryllium Dynamic',
      frequency: '10Hz – 45,000Hz',
      battery: '42 Hours (ANC On)',
      connectivity: 'Bluetooth 5.3 with LDAC / aptX HD',
      weight: '278g',
      impedance: '32 Ohms'
    },
    features: [
      'Hybrid active noise cancellation with 4-mic acoustic array',
      'Lossless 24-bit/96kHz high-resolution audio streaming',
      'Ultra-plush lambskin memory foam ear pads for all-day comfort',
      'Brushed champagne gold aluminum pivot yokes'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0D0D0F' },
      { name: 'Champagne Gold', hex: '#D6AD65' },
      { name: 'Graphite Slate', hex: '#2A2D34' }
    ],
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true
  },
  {
    id: 'audiome-e500',
    name: 'Audiomé E500',
    category: 'earbuds',
    categoryLabel: 'True Wireless Earbuds',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviewCount: 512,
    image: IMAGES.cardEarbuds,
    secondaryImage: IMAGES.cardEarbuds,
    description: 'Precision in-ear acoustic architecture featuring 11mm graphene drivers, dual environmental noise filters, and a magnetic gold-hinge charging case.',
    specs: {
      driver: '11mm Graphene Dual-Chamber',
      frequency: '20Hz – 40,000Hz',
      battery: '8 Hours (36h with case)',
      connectivity: 'Bluetooth 5.3 BLE / AAC / LDAC',
      weight: '4.8g per earbud',
      impedance: '16 Ohms'
    },
    features: [
      'Natural transparency mode for effortless ambient conversations',
      'Ergonomic contouring with medical-grade silicone ear tips',
      'Fast charge: 10 minutes gives 2.5 hours of playback',
      'IPX5 sweat and splash resistance'
    ],
    colors: [
      { name: 'Midnight Onyx', hex: '#0A0A0A' },
      { name: 'Gold Rim Edition', hex: '#D6AD65' }
    ],
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true
  },
  {
    id: 'audiome-s300',
    name: 'Audiomé S300',
    category: 'speakers',
    categoryLabel: 'Wireless Speaker',
    price: 159.99,
    originalPrice: 189.99,
    rating: 4.6,
    reviewCount: 210,
    image: IMAGES.cardSpeaker,
    secondaryImage: IMAGES.cardSpeaker,
    description: '360-degree omnidirectional acoustic cylinder with brushed gold rotary volume interface, dual opposing bass radiators, and room-filling presence.',
    specs: {
      driver: 'Dual 2.5” Full-Range + 2 Passive Radiators',
      frequency: '45Hz – 24,000Hz',
      battery: '20 Hours Continuous',
      connectivity: 'Bluetooth 5.2 / AUX 3.5mm / USB-C Audio',
      weight: '820g',
      impedance: '4 Ohms'
    },
    features: [
      'Acoustic wool fabric grille with brushed aluminum chassis',
      'Tactile rotary gold volume dial with stepped haptic feedback',
      'True Wireless Stereo pairing with a second S300',
      'Built-in directional microphone for conference clarity'
    ],
    colors: [
      { name: 'Charcoal Weave', hex: '#1C1C1E' },
      { name: 'Gold Accent Edition', hex: '#D6AD65' }
    ],
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: false
  },
  {
    id: 'audiome-m900',
    name: 'Audiomé M900',
    category: 'microphones',
    categoryLabel: 'USB Microphone',
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.9,
    reviewCount: 188,
    image: IMAGES.microphone,
    secondaryImage: IMAGES.microphone,
    description: 'Broadcast-grade 24-bit/192kHz USB condenser studio microphone equipped with gold-sputtered capsule and anti-vibration desktop isolation shockmount.',
    specs: {
      driver: '25mm Gold-Sputtered Condenser',
      frequency: '20Hz – 20,000Hz',
      battery: 'USB-C Bus Powered',
      connectivity: 'USB-C / 3.5mm Zero-Latency Out',
      weight: '640g with heavy base',
      impedance: '16 Ohms (Headphone Amp)'
    },
    features: [
      'Selectable cardioid, omni, and figure-8 polar patterns',
      'Solid zinc-alloy weighted base with vibration dampening',
      'Smooth analog gain dial with integrated mute tap sensor',
      'Plug-and-play compatibility with macOS, Windows, iOS, and Android'
    ],
    colors: [
      { name: 'Studio Black & Gold', hex: '#0D0D0E' },
      { name: 'Matte Gunmetal', hex: '#373A40' }
    ],
    isBestSeller: true,
    isNewArrival: false,
    isOnSale: true
  },
  {
    id: 'audiome-tube-v1',
    name: 'Audiomé Tube Amp V1',
    category: 'amplifiers',
    categoryLabel: 'Vacuum Tube Amplifier',
    price: 489.99,
    originalPrice: 549.99,
    rating: 4.9,
    reviewCount: 94,
    image: IMAGES.amplifier,
    description: 'Pure Class-A vacuum tube headphone and pre-amplifier crafted with hand-matched 12AX7 triodes for lush, holographic analog warmth.',
    specs: {
      driver: 'Dual 12AX7 + Dual 6SN7 Tubes',
      frequency: '5Hz – 60,000Hz (-1dB)',
      battery: 'AC 110V/220V Toroidal Power',
      connectivity: 'Balanced XLR / RCA / 6.35mm / 4.4mm Pentaconn',
      weight: '4.2kg',
      impedance: 'Supports 16 to 600 Ohms'
    },
    features: [
      'Discrete linear power supply with custom wound toroidal transformer',
      'Heavy brushed gold front faceplate with ALPS potentiometer',
      'Warm harmonic tube saturation tuned for planar & dynamic headphones',
      'Gold-plated RCA inputs and precision balanced outputs'
    ],
    colors: [
      { name: 'Brushed Gold & Walnut', hex: '#D6AD65' }
    ],
    isBestSeller: false,
    isNewArrival: true,
    isOnSale: false
  },
  {
    id: 'audiome-a1000-pro',
    name: 'Audiomé A1000 Pro Reference',
    category: 'headphones',
    categoryLabel: 'Open-Back Reference',
    price: 399.99,
    originalPrice: 449.99,
    rating: 4.9,
    reviewCount: 420,
    image: IMAGES.hero,
    description: 'Open-back planar magnetic flagship tuned for studio mastering and critical audiophile sessions, delivering an expansive concert-hall soundstage.',
    specs: {
      driver: '88mm Ultra-Thin Planar Diaphragm',
      frequency: '5Hz – 52,000Hz',
      battery: 'Passive Wired Precision',
      connectivity: 'Dual 3.5mm with 6.35mm gold adapter',
      weight: '340g',
      impedance: '48 Ohms'
    },
    features: [
      'Patented open-grill design preventing acoustic back-wave distortion',
      'Breathable perforated leather headband and velour ear pads',
      'Silver-plated OFC high-purity detachable braided cable',
      'Handcrafted and individually frequency-matched in small batches'
    ],
    colors: [
      { name: 'Onyx Gold Flagship', hex: '#0D0D0E' }
    ],
    isBestSeller: false,
    isNewArrival: true,
    isOnSale: false
  },
  {
    id: 'audiome-cable-occ',
    name: 'Audiomé Pure Gold Cable',
    category: 'accessories',
    categoryLabel: 'Audiophile Interconnect',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewCount: 114,
    image: IMAGES.saleBanner,
    description: 'Single-crystal oxygen-free copper (OCC) interconnect coated in 24K gold plating, wrapped in custom anti-microphonic braided insulation.',
    specs: {
      driver: '8-Core Braided OCC Copper',
      frequency: 'Zero signal degradation',
      battery: 'Passive',
      connectivity: '3.5mm to Dual 3.5mm / 4.4mm balanced',
      weight: '62g',
      impedance: '0.04 Ohms/m'
    },
    features: [
      '24K gold-plated custom alloy connectors',
      'Shielded against electromagnetic and radio frequency interference',
      'Tangle-free tactile silk braiding'
    ],
    colors: [
      { name: 'Gold & Braided Black', hex: '#D6AD65' }
    ],
    isBestSeller: false,
    isNewArrival: false,
    isOnSale: true
  }
];

export const FEATURED_PROMO_CARDS = [
  {
    id: 'card-1',
    category: 'headphones',
    title: 'Premium Headphones',
    tagline: 'Noise canceled.',
    subtagline: 'Limitless focus.',
    cta: 'EXPLORE',
    image: IMAGES.cardHeadphones,
  },
  {
    id: 'card-2',
    category: 'earbuds',
    title: 'True Wireless Earbuds',
    tagline: 'Pure freedom.',
    subtagline: 'Powerful sound.',
    cta: 'DISCOVER',
    image: IMAGES.cardEarbuds,
  },
  {
    id: 'card-3',
    category: 'speakers',
    title: 'Portable Speakers',
    tagline: 'Big sound.',
    subtagline: 'Anywhere you go.',
    cta: 'SHOP NOW',
    image: IMAGES.cardSpeaker,
  },
];

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'article-1',
    category: 'GUIDE',
    title: 'How to Choose the Right Headphones',
    date: 'March 2025',
    readTime: '5 min read',
    image: IMAGES.hero,
    excerpt: 'Open-back vs closed-back, planar magnetic vs dynamic drivers. Navigate the acoustic choices that best match your personal sonic palate.',
    author: 'Julian Vance, Chief Acoustic Engineer',
    content: [
      'Selecting the ideal headphones begins with understanding acoustic enclosure architecture. Closed-back headphones seal your auditory canal from the exterior world, providing deep sub-bass resonance and isolating background distraction. They are the gold standard for daily commutes and studio vocal tracking.',
      'Open-back designs, on the other hand, allow sound waves to disperse naturally through breathable rear acoustic grilles. The outcome is an astonishingly wide, holographic soundstage that mirrors sitting in front of high-end floorstanding speakers.',
      'Next, examine driver transducer physics. Dynamic drivers produce visceral, punchy low-end impact with minimal power requirements. Planar magnetic diaphragms deliver lightning-fast transient response, pinpoint instrumental separation, and virtually zero harmonic distortion.'
    ]
  },
  {
    id: 'article-2',
    category: 'RECOMMENDED',
    title: 'Top 5 Wireless Earbuds of 2025',
    date: 'February 2025',
    readTime: '4 min read',
    image: IMAGES.cardEarbuds,
    excerpt: 'We stress-tested over 30 flagship true-wireless earbuds across frequency accuracy, ambient noise suppression, and long-session ergonomic comfort.',
    author: 'Elena Rostova, Senior Audio Editor',
    content: [
      'True wireless earphone technology has matured to match audiophile wired standards. With low-power Bluetooth 5.3 and lossless codecs like LDAC and aptX Lossless transmitting 24-bit streams over the air, listeners no longer compromise audio fidelity for pocket portability.',
      'Our rigorous bench tests evaluated noise cancellation across sub-bass subway hum, cafe vocal chatter, and aircraft cabin roar. The Audiomé E500 achieved class-leading natural transparency while preserving vocal warmth and instrumental timbre.'
    ]
  },
  {
    id: 'article-3',
    category: 'INSIGHT',
    title: 'The Future of High-Fidelity Audio',
    date: 'January 2025',
    readTime: '6 min read',
    image: IMAGES.amplifier,
    excerpt: 'Analog warmth meets digital precision. Why vacuum tube harmonics and spatial neural rendering are defining the modern audiophile renaissance.',
    author: 'Marcus Sterling, Sound Architect',
    content: [
      'Even in an era dominated by microchips and streaming algorithms, the appeal of warm analog harmonic distortion has never been stronger. Vacuum tubes introduce gentle second-order even harmonics that the human ear interprets as organic musicality and three-dimensional depth.',
      'When paired with high-resolution digital-to-analog converters running 32-bit floating point processing, listeners receive the best of both worlds: infinite clarity without clinical harshness.'
    ]
  }
];

export const TRUST_BENEFITS = [
  {
    title: 'Premium Quality',
    description: 'Crafted to perfection.',
    iconName: 'Award',
  },
  {
    title: 'Secure Payments',
    description: '100% safe & secure.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Expert Support',
    description: 'Here to help anytime.',
    iconName: 'Headphones',
  },
  {
    title: 'Trusted by Audiophiles',
    description: 'Loved worldwide.',
    iconName: 'HeartHandshake',
  },
];
