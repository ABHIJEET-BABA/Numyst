
import { Product, BlogPost } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'ce-lest',
    tagline: 'Infinite Starlight',
    description: 'An ethereal fragrance that captures the crisp, thin air of the Ladakhi mountains. A blend of ozone and rare mountain botanicals that feels like a cold, starlit night.',
    price: 4800,
    category: 'Unisex',
    notes: ['White Musk', 'Juniper', 'Ozone', 'Iris'],
    pyramid: {
      top: ['Juniper Berry', 'Cold Air Accord'],
      heart: ['Iris Root', 'White Pepper'],
      base: ['White Musk', 'Ambroxan', 'Silver Fir']
    },
    image: 'https://images.unsplash.com/photo-1615484477778-ca3b77942c23?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    heritage: 'Inspired by the celestial observations from the Hanle observatory, using botanicals that only bloom in the high-altitude deserts of the Himalayas.'
  },
  {
    id: 'p2',
    name: 'miRge',
    tagline: 'Desert Illusion',
    description: 'A shifting, warm scent that mimics the heat haze of the Thar Desert. It opens with shimmering citrus and settles into a deep, resinous golden glow.',
    price: 3900,
    category: 'Unisex',
    notes: ['Saffron', 'Sand', 'Amber', 'Mandarin'],
    pyramid: {
      top: ['Blood Mandarin', 'Pink Pepper'],
      heart: ['Saffron', 'Hot Sand Accord', 'Frankincense'],
      base: ['Golden Amber', 'Vanilla Bean', 'Styrax']
    },
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    heritage: 'Crafted with Saffron from Pampore, this fragrance evokes the mysterious beauty of shifting dunes under a punishing Jaisalmer sun.'
  },
  {
    id: 'p3',
    name: 'shadOw',
    tagline: 'The Unseen Trail',
    description: 'A deep, mysterious journey into the heart of the Western Ghats. Earthy, damp, and intensely green, it represents the quiet secrets of the forest floor.',
    price: 4200,
    category: 'Men',
    notes: ['Oakmoss', 'Patchouli', 'Vetiver', 'Bergamot'],
    pyramid: {
      top: ['Bergamot', 'Galbanum'],
      heart: ['Patchouli Heart', 'Violet Leaf'],
      base: ['Oakmoss', 'Indonesian Vetiver', 'Blackwood']
    },
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    heritage: 'Distilled using the roots of wild Vetiver (Khus) harvested after the first monsoon rains in the Sahyadri ranges.'
  },
  {
    id: 'p4',
    name: 'cRush',
    tagline: 'Petal Symphony',
    description: 'A vibrant, intoxicating explosion of fresh flowers. It captures the frantic energy and divine beauty of a spring morning in a blooming valley.',
    price: 3500,
    category: 'Women',
    notes: ['Tuberose', 'Jasmine', 'Green Apple', 'Cardamom'],
    pyramid: {
      top: ['Green Apple', 'Cardamom'],
      heart: ['Tuberose Absolute', 'Sambac Jasmine'],
      base: ['Soft Suede', 'Sandalwood']
    },
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    heritage: 'A blend of thousands of hand-crushed petals from the flower markets of South India, layered with the spice of Malabar cardamom.'
  },
  {
    id: 'p5',
    name: 'El3ment',
    tagline: 'Primal Earth',
    description: 'The scent of dry earth meeting the first drop of rain. A raw, grounding fragrance that returns you to the basic elements of existence.',
    price: 5200,
    category: 'Unisex',
    notes: ['Mitti', 'Petrichor', 'Cedarwood', 'Clay'],
    pyramid: {
      top: ['Ozone', 'Rainwater'],
      heart: ['Baked Earth (Mitti)', 'Geosmin'],
      base: ['Himalayan Cedar', 'Benzoin', 'Ambrette Seed']
    },
    image: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    heritage: 'Features the legendary Mitti Attar from Kannauj—the scent of rain-soaked parched earth, distilled over weeks in traditional clay pots.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Alchemy of Mitti: Capturing Petrichor',
    description: 'Exploring the 400-year-old tradition of distilling the scent of parched earth in Kannauj.',
    content: 'Long before modern perfumery reached Indian shores, the artisans of Kannauj were capturing the elusive scent of rain. Known as Mitti Attar, this fragrance is made by distilling baked river clay into sandalwood oil. The result is a scent that doesn’t just smell like earth; it smells like life returning to the parched soil after a grueling summer.',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop',
    tags: ['Heritage', 'Mitti', 'Process'],
    date: '2024-05-12',
    author: 'Ora'
  },
  {
    id: 'b2',
    title: 'Why Vibe Matters More than Notes',
    description: 'How to choose a fragrance based on your emotional frequency rather than simple ingredients.',
    content: 'In the world of high-end perfumery, notes like Bergamot or Patchouli are just the letters. The vibe is the poem. When you choose a scent, you aren’t just choosing a smell; you are selecting an aura. This is why at Numyst, we focus on the emotional residue our fragrances leave behind.',
    image: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=800&auto=format&fit=crop',
    tags: ['Vibe', 'Philosophy', 'Style'],
    date: '2024-06-01',
    author: 'Ora'
  }
];

export const APP_NAME = "Numyst";
export const CURRENCY_SYMBOL = "₹";
