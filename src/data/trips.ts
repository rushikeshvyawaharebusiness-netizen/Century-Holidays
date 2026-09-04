import cardVietnam from '../assets/images/card-vietnam.jpg';
import cardBhutan from '../assets/images/card-bhutan.jpg';
import cardParis from '../assets/images/card-paris.jpg';
import cardThailandHd from '../assets/images/card-thailand-hd.jpg';
import cardSriLanka from '../assets/images/card-srilanka.jpg';
import cardDubai from '../assets/images/card-dubai.jpg';
import cardBali from '../assets/images/card-bali.jpg';
import cardAlmaty from '../assets/images/poster-almaty.jpg';
import cardPune from '../assets/images/card-pune.jpg';
import cardMumbai from '../assets/images/card-mumbai.jpg';
import himachal from '../assets/images/himachal.png';
import spiti from '../assets/images/spiti.png';
import meghalaya from '../assets/images/meghalaya.png';
import dodham from '../assets/images/dodham.png';
import chardham from '../assets/images/chardham.png';
import hampta from '../assets/images/banner-hampta-hd.png';

export interface Trip {
  /** Stable id used in ?destination= links and the booking form's select. */
  slug: string;
  image: ImageMetadata;
  alt: string;
  name: string;
  /** Compact uppercase label for cards, e.g. "VIETNAM". */
  shortName: string;
  /** Subtitle or secondary line, e.g. "ADVENTURE" or "Getaways From". */
  subtitle?: string;
  /** True for "Getaways From" cards where the subtitle sits ABOVE the destination name */
  isGetaway?: boolean;
  category: string;
  /** 'domestic' | 'international' — drives the hero quick-picks and departures grouping. */
  scope: 'domestic' | 'international';
  duration: string;
  location: string;
  dateText: string;
  moreDates: string;
  price: string;
  highlight: string;
}

/** 
 * Primary showcase cards matching Image 2's authentic, non-AI aesthetic
 * Exactly 8 International and 8 Domestic trips for perfectly matched 4-column rows.
 */
export const destinations: Trip[] = [
  // ── International Escapes (8 Cards: Exactly 2 rows of 4) ──
  {
    image: cardVietnam,
    alt: 'Century Holidays - Vietnam Adventure Tour',
    slug: 'vietnam',
    shortName: 'VIETNAM',
    subtitle: 'ADVENTURE',
    name: 'Vietnam Adventure',
    scope: 'international',
    category: 'International Adventure',
    duration: '6 Nights / 7 Days',
    location: 'Hanoi & Ha Long Bay',
    dateText: '12 Sep, 28 Sep',
    moreDates: '+4',
    price: '34,900',
    highlight: 'Ancient pagodas, emerald waters of Ha Long Bay, lantern-lit alleys of Hoi An, and authentic Vietnamese culture.',
  },
  {
    image: cardParis,
    alt: 'Century Holidays - Paris France Romance & Culture Tour',
    slug: 'paris',
    shortName: 'PARIS',
    subtitle: 'FRANCE',
    name: 'Paris Romance & Culture',
    scope: 'international',
    category: 'European Getaway',
    duration: '6 Nights / 7 Days',
    location: 'Paris, France',
    dateText: '10 Oct, 24 Oct',
    moreDates: '+4',
    price: '74,900',
    highlight: 'Iconic Eiffel Tower golden hour, Louvre museum masterpieces, charming Montmartre cafes, and scenic Seine River cruise.',
  },
  {
    image: cardThailandHd,
    alt: 'Century Holidays - Thailand Island & City Adventure Tour',
    slug: 'thailand',
    shortName: 'THAILAND',
    subtitle: 'ADVENTURE',
    name: 'Thailand Island & City Adventure',
    scope: 'international',
    category: 'Island & City Adventure',
    duration: '5 Nights / 6 Days',
    location: 'Phuket & Krabi',
    dateText: '20 Sep, 15 Oct',
    moreDates: '+5',
    price: '32,500',
    highlight: 'Emerald waters of Phi Phi islands, limestone karsts in Phang Nga Bay, vibrant street night markets, and golden Buddhist temples.',
  },
  {
    image: cardBhutan,
    alt: 'Century Holidays - Bhutan Himalayan Kingdom Tour',
    slug: 'bhutan',
    shortName: 'BHUTAN',
    subtitle: 'KINGDOM',
    name: 'Bhutan Expedition',
    scope: 'international',
    category: 'Himalayan Kingdom',
    duration: '5 Nights / 6 Days',
    location: 'Paro & Thimphu',
    dateText: '18 Oct, 5 Nov',
    moreDates: '+3',
    price: '29,500',
    highlight: 'Hike to the iconic Tiger’s Nest monastery, explore ancient dzongs, fluttering prayer flags, and peaceful valleys.',
  },
  {
    image: cardSriLanka,
    alt: 'Century Holidays - Sri Lanka Adventure Tour',
    slug: 'sri-lanka',
    shortName: 'SRI LANKA',
    subtitle: 'TROPICAL',
    name: 'Sri Lanka Adventure',
    scope: 'international',
    category: 'Tropical & Cultural Tour',
    duration: '6 Nights / 7 Days',
    location: 'Colombo & Kandy',
    dateText: '5 Oct, 22 Oct',
    moreDates: '+3',
    price: '28,000',
    highlight: 'Polonnaruwa ancient stone temples, Sigiriya lion rock fortress, lush tea plantations, and scenic southern beaches.',
  },
  {
    image: cardDubai,
    alt: 'Century Holidays - Dubai Luxury Adventure Tour',
    slug: 'dubai',
    shortName: 'DUBAI',
    subtitle: 'SAFARI',
    name: 'Dubai Adventure',
    scope: 'international',
    category: 'Luxury & Desert Safari',
    duration: '4 Nights / 5 Days',
    location: 'Dubai, UAE',
    dateText: '15 Oct, 2 Nov',
    moreDates: '+6',
    price: '45,900',
    highlight: 'Desert dune bashing, Atlantis The Palm luxury stays, Dubai Marina yacht cruises, and glittering skyline views.',
  },
  {
    image: cardBali,
    alt: 'Century Holidays - Bali Tropical Adventure Tour',
    slug: 'bali',
    shortName: 'BALI',
    subtitle: 'PARADISE',
    name: 'Bali Adventure',
    scope: 'international',
    category: 'Tropical Paradise',
    duration: '6 Nights / 7 Days',
    location: 'Denpasar & Ubud',
    dateText: '12 Aug, 5 Sep',
    moreDates: '+4',
    price: '39,900',
    highlight: 'Lempuyang Gates of Heaven framing Mount Agung, lush rice terraces in Ubud, private villa pools, and sunset beaches.',
  },
  {
    image: cardAlmaty,
    alt: 'Century Holidays - Kazakhstan Almaty Tour',
    slug: 'almaty',
    shortName: 'ALMATY',
    subtitle: 'KAZAKHSTAN',
    name: 'Almaty Mountain Tour',
    scope: 'international',
    category: 'Central Asia Adventure',
    duration: '5 Nights / 6 Days',
    location: 'Almaty, Kazakhstan',
    dateText: '15 Oct, 5 Nov',
    moreDates: '+4',
    price: '49,900',
    highlight: 'Shymbulak ski resort, turquoise Big Almaty Lake, Kok Tobe hill panorama, and vibrant pedestrian Arbat street.',
  },

  // ── Domestic Destinations (8 Cards: Exactly 2 rows of 4, perfectly matching Mumbai) ──
  {
    image: himachal,
    alt: 'Century Holidays - Himachal Premium Mountain Tour',
    slug: 'himachal',
    shortName: 'HIMACHAL',
    subtitle: 'ADVENTURE',
    name: 'Himachal Adventure',
    scope: 'domestic',
    category: 'Mountain Getaway',
    duration: '6 Nights / 7 Days',
    location: 'Manali & Kasol',
    dateText: '25 Sep, 10 Oct',
    moreDates: '+6',
    price: '14,500',
    highlight: 'Snowy Solang valley vistas, riverside pine camps in Kasol, Atal Tunnel, and serene Himalayan mountain trails.',
  },
  {
    image: spiti,
    alt: 'Century Holidays - Spiti Valley Cold Desert Expedition',
    slug: 'spiti',
    shortName: 'SPITI VALLEY',
    subtitle: 'EXPEDITION',
    name: 'Spiti Valley Expedition',
    scope: 'domestic',
    category: 'Cold Desert Safari',
    duration: '7 Nights / 8 Days',
    location: 'Kaza & Chandra Taal',
    dateText: '15 Sep, 29 Sep',
    moreDates: '+4',
    price: '18,900',
    highlight: 'Centuries-old Key Monastery, world’s highest post office at Hikkim, and camping under billion-star skies at Chandra Taal.',
  },
  {
    image: meghalaya,
    alt: 'Century Holidays - Meghalaya Nature Expedition',
    slug: 'meghalaya',
    shortName: 'MEGHALAYA',
    subtitle: 'NATURE RETREAT',
    name: 'Meghalaya Nature Expedition',
    scope: 'domestic',
    category: 'North East Explorer',
    duration: '5 Nights / 6 Days',
    location: 'Shillong & Cherrapunji',
    dateText: '18 Sep, 5 Oct',
    moreDates: '+4',
    price: '21,500',
    highlight: 'Living root bridges, glass-clear waters of Dawki Umngot river, and roaring waterfalls in Cherrapunji.',
  },
  {
    image: dodham,
    alt: 'Century Holidays - Kedarnath Yatra Pilgrimage',
    slug: 'do-dham',
    shortName: 'KEDARNATH',
    subtitle: 'SPIRITUAL YATRA',
    name: 'Do Dham Yatra (Kedarnath)',
    scope: 'domestic',
    category: 'Spiritual Yatra',
    duration: '4 Nights / 5 Days',
    location: 'Kedarnath & Haridwar',
    dateText: 'Weekly Departures',
    moreDates: '+8',
    price: '11,900',
    highlight: 'Sacred Himalayan darshan, helicopter shuttle coordination, mountain trek assistance, and peaceful Aarti ceremonies.',
  },
  {
    image: chardham,
    alt: 'Century Holidays - Complete Char Dham Yatra Pilgrimage',
    slug: 'char-dham',
    shortName: 'CHAR DHAM',
    subtitle: 'PILGRIMAGE',
    name: 'Complete Char Dham Yatra',
    scope: 'domestic',
    category: 'Spiritual Yatra',
    duration: '11 Nights / 12 Days',
    location: 'Haridwar & Yamunotri',
    dateText: '10 May, 22 May',
    moreDates: '+4',
    price: '28,500',
    highlight: 'The full sacred circuit — Yamunotri, Gangotri, Kedarnath, and Badrinath — with comfortable transport and VIP darshan coordination.',
  },
  {
    image: hampta,
    alt: 'Century Holidays - Hampta Pass Himalayan Trek',
    slug: 'hampta-pass',
    shortName: 'HAMPTA PASS',
    subtitle: 'HIMALAYAN TREK',
    name: 'Hampta Pass Trek',
    scope: 'domestic',
    category: 'Himalayan Trek',
    duration: '4 Nights / 5 Days',
    location: 'Manali & Hampta',
    dateText: 'Weekly Batches',
    moreDates: '+6',
    price: '10,999',
    highlight: 'Dramatic crossover trek from lush green Kullu valley to the stark cold desert of Lahaul with camping at Chandratal.',
  },
  {
    image: cardPune,
    alt: 'Century Holidays - Getaways From Pune',
    slug: 'getaways-pune',
    shortName: 'PUNE',
    subtitle: 'Getaways From',
    isGetaway: true,
    name: 'Getaways From Pune',
    scope: 'domestic',
    category: 'Weekend Getaway',
    duration: '2 Nights / 3 Days',
    location: 'Western Ghats',
    dateText: 'Every Weekend',
    moreDates: '+12',
    price: '4,999',
    highlight: 'Misty fort trails, mountain archway viewpoints, cloud-kissed Sahyadri valleys, and refreshing weekend monsoon treks.',
  },
  {
    image: cardMumbai,
    alt: 'Century Holidays - Getaways From Mumbai',
    slug: 'getaways-mumbai',
    shortName: 'MUMBAI',
    subtitle: 'Getaways From',
    isGetaway: true,
    name: 'Getaways From Mumbai',
    scope: 'domestic',
    category: 'Weekend Getaway',
    duration: '2 Nights / 3 Days',
    location: 'Lonavala & Igatpuri',
    dateText: 'Every Weekend',
    moreDates: '+12',
    price: '5,499',
    highlight: 'Cliff-edge valley panoramas, cascading waterfalls, cool mountain breezes, and instant escapes from city life.',
  },
];

/** Additional iconic domestic & Himalayan treks */
export const trending: Trip[] = [
  {
    image: himachal,
    alt: 'Century Holidays - Himachal Premium Getaway Group Tour',
    slug: 'himachal',
    shortName: 'HIMACHAL',
    subtitle: 'Getaways',
    isGetaway: true,
    name: 'Himachal Premium Getaway',
    scope: 'domestic',
    category: 'Group Tour',
    duration: '9 Nights / 10 Days',
    location: 'Chandigarh',
    dateText: '25 Apr, 9 May',
    moreDates: '+3',
    price: '14,500',
    highlight: 'Snow-capped passes, pine valleys and cozy hillside stays across Shimla, Manali and Kasol.',
  },
  {
    image: spiti,
    alt: 'Century Holidays - Spiti Valley Expedition Adventure Tour',
    slug: 'spiti',
    shortName: 'SPITI VALLEY',
    subtitle: 'EXPEDITION',
    name: 'Spiti Valley Expedition',
    scope: 'domestic',
    category: 'Adventure Tour',
    duration: '7 Nights / 8 Days',
    location: 'Shimla',
    dateText: '10 May, 12 Jun',
    moreDates: '+2',
    price: '18,900',
    highlight: 'High-altitude monasteries, moon-like terrain and campsites under some of the clearest skies in India.',
  },
  {
    image: meghalaya,
    alt: 'Century Holidays - Meghalaya Monsoon Magic Nature Retreat',
    slug: 'meghalaya',
    shortName: 'MEGHALAYA',
    subtitle: 'NATURE RETREAT',
    name: 'Meghalaya Monsoon Magic',
    scope: 'domestic',
    category: 'Nature Retreat',
    duration: '5 Nights / 6 Days',
    location: 'Guwahati',
    dateText: '15 Jul, 20 Aug',
    moreDates: '+1',
    price: '21,500',
    highlight: 'Living root bridges, waterfalls at full flow and the cleanest villages in Asia during peak monsoon.',
  },
  {
    image: dodham,
    alt: 'Century Holidays - Do Dham Yatra Kedarnath Spiritual Tour',
    slug: 'do-dham',
    shortName: 'KEDARNATH',
    subtitle: 'SPIRITUAL YATRA',
    name: 'Do Dham Yatra (Kedarnath)',
    scope: 'domestic',
    category: 'Spiritual Tour',
    duration: '4 Nights / 5 Days',
    location: 'Haridwar',
    dateText: 'Every Weekend',
    moreDates: '+8',
    price: '11,900',
    highlight: 'A guided pilgrimage to Kedarnath and Badrinath with darshan timings and travel planned around you.',
  },
  {
    image: chardham,
    alt: 'Century Holidays - Complete Char Dham Yatra Pilgrimage',
    slug: 'char-dham',
    shortName: 'CHAR DHAM',
    subtitle: 'PILGRIMAGE',
    name: 'Complete Char Dham Yatra',
    scope: 'domestic',
    category: 'Pilgrimage',
    duration: '11 Nights / 12 Days',
    location: 'Haridwar',
    dateText: '10 May, 22 May',
    moreDates: '+4',
    price: '28,500',
    highlight: 'The full circuit — Yamunotri, Gangotri, Kedarnath and Badrinath — in one comfortably paced yatra.',
  },
];

/** Every package we sell, in one list — used by the booking form and the departures board. */
export function allTrips(): Trip[] {
  return [...destinations, ...trending];
}
