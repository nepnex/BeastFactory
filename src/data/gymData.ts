import saunaImg from '../assets/images/services/sauna.webp';
import nutritionImg from '../assets/images/services/nutrition.webp';
import cardioImg from '../assets/images/services/cardio.webp';
const groupfitnessImg = cardioImg;
import trainer1Img from '../assets/images/trainers/trainer1.webp';
import trainer2Img from '../assets/images/trainers/trainer2.webp';
import {
  Founder,
  Trainer,
  ServiceItem,
  BoxingPlan,
  MembershipPlan,
  SpaService,
  ProductItem,
  TransformationStory,
  BusinessSettings,
  Lead,
  Booking,
  GalleryItem,
  Testimonial,
  FAQItem
} from '../types';

export const INITIAL_GYM_INFO: BusinessSettings = {
  gymName: 'Beast Factory',
  tagline: 'The Fitness Paradise',
  phone: '+977 23577880',
  email: 'info@beastfactory.com.np',
  locationAddress: 'Damak-1, Falgunanda Chowk, Jhapa, Nepal',
  operatingHours: '3:30 AM - 11:00 PM',
  daysOpen: '365 Days Open',
  facebookUrl: 'https://www.facebook.com/BeastFactoryGymCenter/',
  instagramUrl: 'https://www.instagram.com/beastfactory21/',
  tiktokUrl: 'https://www.tiktok.com/@beastfactory_official',
};

// Aliases for compatibility
export const GYM_INFO = {
  established: 'Est. 2021',
  daysOpen: INITIAL_GYM_INFO.daysOpen,
  hours: INITIAL_GYM_INFO.operatingHours,
  tagline: INITIAL_GYM_INFO.tagline,
  phone: INITIAL_GYM_INFO.phone,
  email: INITIAL_GYM_INFO.email,
  address: INITIAL_GYM_INFO.locationAddress,
  facebook: INITIAL_GYM_INFO.facebookUrl,
  instagram: INITIAL_GYM_INFO.instagramUrl,
  tiktok: INITIAL_GYM_INFO.tiktokUrl,
};

export const INITIAL_FOUNDERS: Founder[] = [
  {
    id: 'f1',
    name: 'Bikram Gurung',
    position: 'Co-Founder & Executive Director',
    photoUrl: trainer1Img,
    shortBio: 'Visionary fitness entrepreneur committed to bringing elite athletic training standards to Eastern Nepal.',
    roleDescription: 'Directs strategic expansion, facility innovations, and community leadership initiatives.',
    expertise: ['Gym Operations', 'Strategic Management', 'Community Building'],
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'f2',
    name: 'Suman Rai',
    position: 'Co-Founder & Head of Operations',
    photoUrl: trainer2Img,
    shortBio: 'Former competitive strength athlete and operations expert with over a decade of gym management experience.',
    roleDescription: 'Oversees equipment procurement, trainer standardizations, and facility safety.',
    expertise: ['Athletic Performance', 'Equipment Engineering', 'Staff Mentorship'],
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'f3',
    name: 'Anupama Shrestha',
    position: 'Co-Founder & Wellness Director',
    photoUrl: saunaImg,
    shortBio: 'Certified holistic health consultant specializing in recovery, spa hydrotherapy, and female fitness empowerment.',
    roleDescription: 'Leads the Beast Factory Spa, Sauna Steam Jacuzzi, and female coaching division.',
    expertise: ['Spa Hydrotherapy', 'Female Conditioning', 'Holistic Nutrition'],
    socials: {
      instagram: 'https://instagram.com',
    },
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 'f4',
    name: 'Rohan Sharma',
    position: 'Co-Founder & Combat Sports Lead',
    photoUrl: groupfitnessImg,
    shortBio: 'National kickboxing champion dedicated to introducing disciplined martial arts and functional agility training.',
    roleDescription: 'Head coach and program designer for Beast Factory Boxing & Combat Zone.',
    expertise: ['Boxing & Kickboxing', 'Combat Conditioning', 'HIIT Circuit Training'],
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
    displayOrder: 4,
    isActive: true,
  },
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 't1',
    fullName: 'Rohan Sharma',
    photoUrl: trainer1Img,
    title: 'Head Strength & Combat Coach',
    shortBio: 'National Kickboxing champion with 8+ years coaching experience in powerlifting & hypertrophy.',
    fullBio: 'Rohan has trained hundreds of athletes across Jhapa district. His coaching methodology combines science-backed progressive overload with combat conditioning.',
    yearsExperience: 8,
    specializations: ['Powerlifting', 'Kickboxing & Boxing', 'Hypertrophy'],
    certifications: ['Certified Strength & Conditioning Specialist (CSCS)', 'REPs Level 3 Coach'],
    languages: ['Nepali', 'English', 'Hindi'],
    sessionPriceNpr: 1500,
    socials: {
      facebook: 'https://www.facebook.com/BeastFactoryGymCenter/',
      instagram: 'https://www.instagram.com/beastfactory21/',
      tiktok: 'https://www.tiktok.com/@beastfactory_official',
    },
    isAvailable: true,
    isFeatured: true,
    displayOrder: 1,
  },
  {
    id: 't2',
    fullName: 'Pooja Thapa',
    photoUrl: trainer2Img,
    title: 'Transformation & Female Fitness Lead',
    shortBio: 'Specialist in body recomposition, female functional fitness, and natural fat shredding.',
    fullBio: 'Pooja focuses on sustainable transformations through customized nutrition and progressive weight training specifically tailored for women and beginner lifters.',
    yearsExperience: 6,
    specializations: ['Fat Loss', 'Female Conditioning', 'Nutrition Planning'],
    certifications: ['ACE Certified Personal Trainer', 'Precision Nutrition Level 1'],
    languages: ['Nepali', 'English'],
    sessionPriceNpr: 1200,
    socials: {
      instagram: 'https://www.instagram.com/beastfactory21/',
    },
    isAvailable: true,
    isFeatured: true,
    displayOrder: 2,
  },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    name: 'Weight Loss Program',
    slug: 'weight-loss',
    shortDescription: 'Targeted fat shredding with high-intensity cardio and dietary supervision.',
    longDescription: 'Our signature weight loss program combines cardiovascular interval training, metabolic conditioning, and structured meal guidelines designed to incinerate fat fast while preserving lean muscle mass.',
    iconName: 'Flame',
    coverImageUrl: cardioImg,
    features: ['Customized Calorie Deficit Plan', 'Stair Climbers & HIIT Workouts', 'Bi-weekly Body Composition Scans'],
    startingPriceNpr: 2500,
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 's2',
    name: 'Personal Training — Male & Female Coaches',
    slug: 'personal-training',
    shortDescription: '1-on-1 dedicated coaching tailored to your individual physical goals.',
    longDescription: 'Get dedicated attention from certified male or female personal trainers. Includes direct posture correction, customized workout routines, and direct phone/WhatsApp guidance.',
    iconName: 'Dumbbell',
    coverImageUrl: groupfitnessImg,
    features: ['Dedicated 1-on-1 Coach', 'Form Correction & Safety', 'Custom Workout & Diet Blueprint'],
    startingPriceNpr: 9000,
    isFeatured: true,
    isActive: true,
    displayOrder: 2,
  },
  {
    id: 's3',
    name: 'Muscle Growth & Body Building',
    slug: 'muscle-growth',
    shortDescription: 'Heavy Olympic lifting platforms and international grade hyper-trophy machines.',
    longDescription: 'Built for bodybuilders and strength enthusiasts. Features heavy dumbbells up to 60kg, Olympic bumper plates, power racks, cable crossovers, and specialized isolation machines.',
    iconName: 'Trophy',
    coverImageUrl: groupfitnessImg,
    features: ['Heavy Dumbbells & Olympic Racks', 'Hypertrophy Machines', '365 Days Open Access'],
    startingPriceNpr: 2500,
    isFeatured: true,
    isActive: true,
    displayOrder: 3,
  },
  {
    id: 's4',
    name: 'Sauna Steam & Jacuzzi',
    slug: 'sauna-steam-jacuzzi',
    shortDescription: 'Finnish hot sauna and steam hydrotherapy for muscle recovery.',
    longDescription: 'Accelerate post-workout recovery, eliminate toxins, and un-wind in our luxury Finnish hot sauna steam room and jacuzzi facility.',
    iconName: 'Waves',
    coverImageUrl: saunaImg,
    features: ['Finnish Hot Wood Sauna', 'Hydrotherapy Jacuzzi Jets', 'Locker & Towel Service'],
    startingPriceNpr: 1000,
    isFeatured: true,
    isActive: true,
    displayOrder: 4,
  },
  {
    id: 's5',
    name: 'Diet, Meal & In-House Café',
    slug: 'diet-cafe',
    shortDescription: 'Nutritious post-workout protein shakes, healthy meals, and supplement store.',
    longDescription: 'Fuel your beast-mode workouts with our in-house nutrition bar offering fresh protein smoothies, balanced macro meal bowls, and genuine international supplements.',
    iconName: 'Coffee',
    coverImageUrl: nutritionImg,
    features: ['Post-Workout Whey Protein Shakes', 'Macro Meal Bowls', 'Authentic Supplements'],
    isFeatured: true,
    isActive: true,
    displayOrder: 5,
  },
];

export const INITIAL_BOXING_PLANS: BoxingPlan[] = [
  {
    id: 'b1',
    programName: 'BOXING / KICKBOXING — REGULAR',
    description: 'Fundamental footwork, heavy bag striking, mitt work, and boxing conditioning.',
    durationText: '1 Month',
    priceNpr: 3500,
    scheduleDetails: 'Morning: 6:00 AM - 7:30 AM | Evening: 5:30 PM - 7:00 PM',
    features: [
      'Access to Boxing Ring & Heavy Bags',
      'Guided Mitt & Footwork Drills',
      'Cardio & Core Conditioning',
      'Open Gym Access Included'
    ],
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 'b2',
    programName: 'BOXING / KICKBOXING — PRO COMBAT PASS',
    description: 'Advanced sparring, tactical ring work, high-intensity pad sessions, and combat nutrition.',
    durationText: '3 Months (Save 15%)',
    priceNpr: 9000,
    scheduleDetails: 'Daily Mon-Sat | Flexible Batches',
    features: [
      'Everything in Regular Boxing',
      'Advanced Controlled Sparring',
      '1-on-1 Pad Work Sessions',
      'Free Beast Boxing Handwraps'
    ],
    isActive: true,
    displayOrder: 2,
  },
];

export const INITIAL_MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'regular',
    name: 'REGULAR GYM ACCESS',
    description: 'Full access to weightlifting, free weights, and cardio zones for consistent lifters.',
    priceMonthlyNpr: 2500,
    priceYearlyNpr: 24000,
    features: [
      'Full Weightlifting & Cardio Access',
      'Locker Room & Shower Access',
      'Standard Workout Orientation',
      '365 Days Open — 3:30 AM to 11:00 PM'
    ],
    badgeText: 'POPULAR CHOICE',
    isPopular: false,
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 'beast_pro',
    name: 'BEAST PRO TRANSFORM',
    description: 'Flagship plan including Group Classes, Sauna & Jacuzzi, and Diet Consultation.',
    priceMonthlyNpr: 4500,
    priceYearlyNpr: 42000,
    features: [
      'Everything in Regular Access',
      'Sauna Steam & Jacuzzi Access',
      'CrossFit, Kick-Boxing & Zumba Classes',
      'Custom Diet & Nutrition Audit',
      'Monthly Body Composition Scan'
    ],
    badgeText: 'BEST VALUE',
    isPopular: true,
    isActive: true,
    displayOrder: 2,
  },
  {
    id: 'vip_coaching',
    name: 'VIP PERSONAL COACHING',
    description: 'Exclusive 1-on-1 personal trainer (Male or Female coach), custom programs & daily accountability.',
    priceMonthlyNpr: 9000,
    priceYearlyNpr: 85000,
    features: [
      'Everything in Beast Pro',
      'Dedicated 1-on-1 Personal Trainer',
      'Customized Daily Workout Plan',
      'Physiotherapist Consultation',
      'Massage & Cupping Therapy Sessions'
    ],
    badgeText: 'ULTIMATE RESULTS',
    isPopular: false,
    isActive: true,
    displayOrder: 3,
  },
];

export const INITIAL_SPA_SERVICES: SpaService[] = [
  {
    id: 'spa1',
    title: 'Finnish Dry Sauna Session',
    description: 'Therapeutic heat therapy to boost blood flow, relax stiff muscles, and flush out metabolic toxins.',
    durationMinutes: 45,
    priceNpr: 1000,
    imageUrl: saunaImg,
    isAvailable: true,
    displayOrder: 1,
  },
  {
    id: 'spa2',
    title: 'Eucalyptus Steam Bath',
    description: 'Deep respiratory and skin cleansing eucalyptus steam session.',
    durationMinutes: 30,
    priceNpr: 800,
    imageUrl: saunaImg,
    isAvailable: true,
    displayOrder: 2,
  },
  {
    id: 'spa3',
    title: 'Hydrotherapy Jacuzzi & Cold Plunge',
    description: 'High-pressure water massage jets for total joint relief and muscle recovery.',
    durationMinutes: 45,
    priceNpr: 1200,
    imageUrl: saunaImg,
    isAvailable: true,
    displayOrder: 3,
  },
  {
    id: 'spa4',
    title: 'Sports Massage & Hijama Cupping Therapy',
    description: 'Targeted deep tissue massage and myofascial cupping for sports injuries and tension relief.',
    durationMinutes: 60,
    priceNpr: 2500,
    imageUrl: groupfitnessImg,
    isAvailable: true,
    displayOrder: 4,
  },
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    name: 'Beast Factory Stainless Steel Shaker Bottle (800ml)',
    description: 'Double-walled insulated matte black gym bottle with leak-proof lid and stainless wire mixer ball.',
    category: 'Merchandise',
    priceNpr: 1800,
    imageUrls: [cardioImg],
    sku: 'BF-BTL-01',
    inStock: true,
    isFeatured: true,
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'p2',
    name: 'Beast Factory Hardcore Lifting Belt',
    description: 'Heavy duty 10mm genuine leather powerlifting belt with quick-release steel lever buckle.',
    category: 'Gear',
    priceNpr: 4500,
    imageUrls: [groupfitnessImg],
    sku: 'BF-BLT-02',
    inStock: true,
    isFeatured: true,
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'p3',
    name: 'Beast Mode Oversized Gym Tee',
    description: 'Heavyweight 240 GSM breathable cotton pump cover tee with red Beast Factory typography.',
    category: 'Apparel',
    priceNpr: 1500,
    imageUrls: [trainer1Img],
    sku: 'BF-TEE-03',
    inStock: true,
    isFeatured: true,
    displayOrder: 3,
    isActive: true,
  },
];

export const INITIAL_TRANSFORMATIONS: TransformationStory[] = [
  {
    id: 'tr1',
    clientName: 'Aayush Karki',
    beforePhotoUrl: trainer1Img,
    afterPhotoUrl: trainer2Img,
    startingWeightKg: 94,
    finalWeightKg: 76,
    durationWeeks: 16,
    programName: 'Beast Pro Fat Shred',
    storyText: 'Aayush lost 18kg of fat while adding significant lean muscle strength through our structured weight loss & personal coaching program.',
    testimonialQuote: 'Beast Factory changed my entire mindset towards discipline and nutrition. The coaches never let me give up!',
    hasClientConsent: true,
    isFeatured: true,
    displayOrder: 1,
    isPublished: true,
  },
  {
    id: 'tr2',
    clientName: 'Suman Rai',
    beforePhotoUrl: trainer2Img,
    afterPhotoUrl: trainer1Img,
    startingWeightKg: 62,
    finalWeightKg: 75,
    durationWeeks: 24,
    programName: 'Muscle Growth & Body Building',
    storyText: 'Packed on 13kg of lean muscle mass in 6 months using progressive overload powerlifting routines.',
    testimonialQuote: 'The heavy equipment and hardcore atmosphere in Damak is unmatched. If you want real gains, this is the temple.',
    hasClientConsent: true,
    isFeatured: true,
    displayOrder: 2,
    isPublished: true,
  },
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    fullName: 'Rajesh Gurung',
    phone: '9801234567',
    email: 'rajesh@example.com',
    inquiryType: 'membership',
    message: 'Interested in annual Beast Pro plan membership.',
    status: 'new',
    adminNotes: 'Wants to start from next Monday.',
    createdAt: '2026-09-01T10:30:00Z',
  },
  {
    id: 'lead-102',
    fullName: 'Sita Dahal',
    phone: '9845678901',
    email: 'sita@example.com',
    inquiryType: 'free_trial',
    message: 'Requesting a free 1-day pass for morning Zumba class.',
    status: 'contacted',
    adminNotes: 'Called on WhatsApp, confirmed for tomorrow 7:00 AM.',
    createdAt: '2026-09-01T11:15:00Z',
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-201',
    bookingType: 'spa',
    serviceOrPlanId: 'spa1',
    customerName: 'Bikash Adhikari',
    customerPhone: '9812345678',
    customerEmail: 'bikash@example.com',
    preferredDate: '2026-09-02',
    preferredTimeSlot: '5:00 PM - 6:00 PM',
    status: 'pending',
    adminNotes: 'Requested Sauna Session.',
    createdAt: '2026-09-01T14:00:00Z',
  },
];

export const SERVICES = INITIAL_SERVICES.map(s => ({
  id: s.id,
  title: s.name,
  icon: '⚡',
  description: s.shortDescription,
  image: s.coverImageUrl,
  features: s.features,
}));

export const PROGRAMS = INITIAL_SERVICES.map(s => ({
  id: s.id,
  title: s.name,
  category: 'Training',
  description: s.shortDescription,
  image: s.coverImageUrl,
  features: s.features,
}));

export const TRAINERS = INITIAL_TRAINERS.map(t => ({
  id: t.id,
  name: t.fullName,
  role: t.title,
  specialty: t.specializations.join(', '),
  experience: `${t.yearsExperience}+ Years`,
  image: t.photoUrl,
  bio: t.shortBio,
}));

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'r1',
    name: 'Anish Pokhrel',
    comment: 'The best gym facility in Jhapa! Top-class equipment, clean sauna, and very helpful trainers.',
    rating: 5,
    isVerified: true,
    displayOrder: 1,
    isPublished: true,
  },
  {
    id: 'r2',
    name: 'Sarita Rai',
    comment: 'Personal training program helped me lose 12kg in just 3 months. Great environment for women!',
    rating: 5,
    isVerified: true,
    displayOrder: 2,
    isPublished: true,
  },
  {
    id: 'r3',
    name: 'Kiran Thapa',
    comment: 'Hardcore bodybuilding setup with heavy dumbbells and Olympic plates. 365 days open is super convenient.',
    rating: 5,
    isVerified: true,
    displayOrder: 3,
    isPublished: true,
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal1',
    title: 'Heavy Strength Training Zone',
    category: 'Strength Area',
    imageUrl: cardioImg,
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'gal2',
    title: 'Finnish Wood Sauna Hydrotherapy',
    category: 'Sauna',
    imageUrl: saunaImg,
    displayOrder: 2,
    isActive: true,
  },
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What are the operating hours of Beast Factory Gym?',
    answer: 'We are open 365 days a year from 3:30 AM in the early morning to 11:00 PM at night.',
    category: 'General',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'faq2',
    question: 'Do you offer separate personal training for female members?',
    answer: 'Yes! We have certified female transformation leads and dedicated spaces for privacy and comfort.',
    category: 'Coaching',
    displayOrder: 2,
    isActive: true,
  },
];

export const REVIEWS = INITIAL_TESTIMONIALS.map(t => ({
  id: t.id,
  name: t.name,
  comment: t.comment,
  rating: t.rating,
}));


