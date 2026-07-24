import saunaImg from '../assets/images/services/sauna.webp';
import nutritionImg from '../assets/images/services/nutrition.webp';
import groupfitnessImg from '../assets/images/services/groupfitness.webp';
import cardioImg from '../assets/images/services/cardio.webp';
import trainer1Img from '../assets/images/trainers/trainer1.webp';
import trainer2Img from '../assets/images/trainers/trainer2.webp';

export interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  schedule: string;
  intensity: 'High' | 'Extreme' | 'Moderate';
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  bio: string;
  image: string;
  socials: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  verified: boolean;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
}

// Full list of services from the Beast Factory brochure
export const SERVICES: Service[] = [
  { id: 's1', title: 'Weight Loss Program', icon: '🔥' },
  { id: 's2', title: 'Personal Training — Male Coach', icon: '💪' },
  { id: 's3', title: 'Personal Training — Female Coach', icon: '💪' },
  { id: 's4', title: 'Muscle Growth', icon: '🏋️' },
  { id: 's5', title: 'Body Building', icon: '🦾' },
  { id: 's6', title: 'Cross Fit', icon: '⚡' },
  { id: 's7', title: 'Kick-Boxing', icon: '🥊' },
  { id: 's8', title: 'Group Cycling', icon: '🚴' },
  { id: 's9', title: 'Zumba / Yoga', icon: '🧘' },
  { id: 's10', title: 'Sauna Steam & Jacuzzi', icon: '♨️' },
  { id: 's11', title: 'Nutritious Supplement', icon: '💊' },
  { id: 's12', title: 'Diet, Meal & Café', icon: '🍽️' },
  { id: 's13', title: 'Physiotherapist Consultation', icon: '🩺' },
  { id: 's14', title: 'Massage & Cupping Therapy', icon: '🙌' },
  { id: 's15', title: 'Beast Futsal', icon: '⚽' },
];

export const PROGRAMS: Program[] = [
  {
    id: 'strength',
    title: 'STRENGTH & BODY BUILDING',
    category: 'Heavy Lifting',
    description: 'Build raw power and maximum muscle mass with our world-class free weights, power racks, and Olympic lifting gear.',
    image: groupfitnessImg,
    features: ['Olympic Barbells & Bumper Plates', 'Heavy Dumbbells', 'Power Racks & Squat Platforms'],
    schedule: '365 Days Open | 3:30 AM - 11:00 PM',
    intensity: 'Extreme'
  },
  {
    id: 'coaching',
    title: 'PERSONAL COACHING',
    category: 'Custom Guidance',
    description: 'Custom tailored workout programs, form correction, meal planning, and accountability with certified elite trainers — both male and female coaches available.',
    image: cardioImg,
    features: ['Personalized Nutrition Plan', 'Body Composition Tracking', 'Weekly Progress Audits'],
    schedule: 'Flexible Appointment',
    intensity: 'High'
  },
  {
    id: 'fatloss',
    title: 'FAT SHRED & CARDIO ZONE',
    category: 'Conditioning',
    description: 'High-intensity interval training (HIIT), sprint treadmills, rowers, group cycling and assault bikes designed to incinerate fat fast.',
    image: cardioImg,
    features: ['Treadmills & Stair Climbers', 'Group Cycling & Rowing Machines', 'HIIT Circuit Training'],
    schedule: '365 Days Open',
    intensity: 'High'
  },
  {
    id: 'crossfit',
    title: 'CROSS FIT & KICK-BOXING',
    category: 'Athleticism',
    description: 'Master agility, functional strength, and combat-sport conditioning with our CrossFit and Kick-Boxing programs.',
    image: groupfitnessImg,
    features: ['Sled Turf & Battle Ropes', 'Kick-Boxing Ring & Gear', 'Group Functional Classes'],
    schedule: 'Morning & Evening Batches',
    intensity: 'Extreme'
  },
  {
    id: 'recovery',
    title: 'SAUNA, STEAM & JACUZZI',
    category: 'Wellness & Recovery',
    description: 'Accelerate muscle repair, boost circulation, and unwind after brutal workout sessions with our premium sauna steam & jacuzzi facility.',
    image: saunaImg,
    features: ['Finnish Hot Sauna Room', 'Steam & Jacuzzi Relaxation', 'Massage & Cupping Therapy'],
    schedule: '365 Days Open | 3:30 AM - 11:00 PM',
    intensity: 'Moderate'
  },
  {
    id: 'nutrition',
    title: 'DIET, MEAL & SUPPLEMENTS',
    category: 'Nutrition',
    description: 'Science-backed meal plans, premium supplements, and an in-house café to fuel your beast-mode transformation.',
    image: nutritionImg,
    features: ['Custom Diet Plans', 'Nutritious Supplements', 'In-House Café & Meals'],
    schedule: 'Available with all plans',
    intensity: 'Moderate'
  },
  {
    id: 'yoga',
    title: 'ZUMBA & YOGA',
    category: 'Mind & Body',
    description: 'Harmonize your body and mind with guided Zumba dance fitness and deep-stretch yoga sessions for flexibility and core stability.',
    image: groupfitnessImg,
    features: ['Zumba Dance Fitness', 'Yoga & Flexibility Training', 'Mindfulness Meditation'],
    schedule: 'Morning & Evening',
    intensity: 'Moderate'
  },
];

export const TRAINERS: Trainer[] = [
  {
    id: 't1',
    name: 'Coach — Trainer 1',
    role: 'Head Strength Coach',
    specialty: 'Powerlifting & Hypertrophy',
    experience: '8+ Years Coaching',
    bio: 'Pioneer of strength training in Jhapa. Expert in competitive bodybuilding and athletic performance coaching.',
    image: trainer1Img,
    socials: {
      facebook: 'https://www.facebook.com/BeastFactoryGymCenter/',
      instagram: 'https://www.instagram.com/beastfactory21/',
      tiktok: 'https://www.tiktok.com/@beastfactory_official'
    }
  },
  {
    id: 't2',
    name: 'Coach — Trainer 2',
    role: 'Transformation Specialist',
    specialty: 'Fat Loss & Athletic Conditioning',
    experience: '6+ Years Experience',
    bio: 'Specializes in body recomposition and high intensity functional training. Passionate about natural transformations.',
    image: trainer2Img,
    socials: {
      facebook: 'https://www.facebook.com/BeastFactoryGymCenter/',
      instagram: 'https://www.instagram.com/beastfactory21/'
    }
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Rohan Chaudhary',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Best gym in Damak without a doubt! The atmosphere here pushes you beyond your limits. The trainers actually guide you step by step.',
    avatar: '',
    verified: true
  },
  {
    id: 'r2',
    name: 'Saraswati Subedi',
    rating: 5,
    date: '1 month ago',
    comment: 'Super clean equipment, supportive female community, and top-tier sauna facility! Great transformation results.',
    avatar: '',
    verified: true
  },
  {
    id: 'r3',
    name: 'Anish Thapa',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The heavy dumbbells and power racks are top notch. Beast Factory is literally the iron temple of Jhapa district. 365 days open!',
    avatar: '',
    verified: true
  }
];

// Gym contact info
export const GYM_INFO = {
  name: 'Beast Factory',
  tagline: 'The Fitness Paradise',
  phone: '+977 23577880',
  location: 'Damak-1, Falgunanda Chowk, Jhapa, Nepal',
  hours: '3:30 AM - 11:00 PM',
  daysOpen: '365 Days Open',
  established: 'Est. 2018',
  facebook: 'https://www.facebook.com/BeastFactoryGymCenter/',
  instagram: 'https://www.instagram.com/beastfactory21/',
  tiktok: 'https://www.tiktok.com/@beastfactory_official',
};
