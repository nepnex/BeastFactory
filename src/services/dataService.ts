import {
  Founder,
  Trainer,
  ServiceItem,
  BoxingPlan,
  MembershipPlan,
  SpaService,
  ProductItem,
  TransformationStory,
  Lead,
  Booking,
  BusinessSettings,
  GalleryItem,
  Testimonial,
  FAQItem
} from '../types';
import {
  INITIAL_FOUNDERS,
  INITIAL_TRAINERS,
  INITIAL_SERVICES,
  INITIAL_BOXING_PLANS,
  INITIAL_MEMBERSHIP_PLANS,
  INITIAL_SPA_SERVICES,
  INITIAL_PRODUCTS,
  INITIAL_TRANSFORMATIONS,
  INITIAL_LEADS,
  INITIAL_BOOKINGS,
  INITIAL_GYM_INFO,
  INITIAL_GALLERY,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS
} from '../data/gymData';

const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(`beast_factory_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(`beast_factory_${key}`, JSON.stringify(value));
    window.dispatchEvent(new Event('beast_factory_storage_update'));
  } catch (err) {
    console.error('Storage update failed', err);
  }
};

export const dataService = {
  // FOUNDERS
  getFounders: (): Founder[] => getStorageItem('founders', INITIAL_FOUNDERS),
  saveFounders: (founders: Founder[]) => setStorageItem('founders', founders),
  addFounder: (founder: Omit<Founder, 'id'>) => {
    const founders = dataService.getFounders();
    const newFounder: Founder = { ...founder, id: `f_${Date.now()}` };
    dataService.saveFounders([newFounder, ...founders]);
    return newFounder;
  },
  updateFounder: (id: string, updated: Partial<Founder>) => {
    const founders = dataService.getFounders().map(f => f.id === id ? { ...f, ...updated } : f);
    dataService.saveFounders(founders);
  },
  deleteFounder: (id: string) => {
    const founders = dataService.getFounders().filter(f => f.id !== id);
    dataService.saveFounders(founders);
  },

  // TRAINERS
  getTrainers: (): Trainer[] => getStorageItem('trainers', INITIAL_TRAINERS),
  saveTrainers: (trainers: Trainer[]) => setStorageItem('trainers', trainers),
  addTrainer: (trainer: Omit<Trainer, 'id'>) => {
    const trainers = dataService.getTrainers();
    const newTrainer: Trainer = { ...trainer, id: `t_${Date.now()}` };
    dataService.saveTrainers([newTrainer, ...trainers]);
    return newTrainer;
  },
  updateTrainer: (id: string, updated: Partial<Trainer>) => {
    const trainers = dataService.getTrainers().map(t => t.id === id ? { ...t, ...updated } : t);
    dataService.saveTrainers(trainers);
  },
  deleteTrainer: (id: string) => {
    const trainers = dataService.getTrainers().filter(t => t.id !== id);
    dataService.saveTrainers(trainers);
  },

  // SERVICES
  getServices: (): ServiceItem[] => getStorageItem('services', INITIAL_SERVICES),
  saveServices: (services: ServiceItem[]) => setStorageItem('services', services),
  addService: (service: Omit<ServiceItem, 'id'>) => {
    const services = dataService.getServices();
    const newService: ServiceItem = { ...service, id: `s_${Date.now()}` };
    dataService.saveServices([newService, ...services]);
    return newService;
  },
  updateService: (id: string, updated: Partial<ServiceItem>) => {
    const services = dataService.getServices().map(s => s.id === id ? { ...s, ...updated } : s);
    dataService.saveServices(services);
  },
  deleteService: (id: string) => {
    const services = dataService.getServices().filter(s => s.id !== id);
    dataService.saveServices(services);
  },

  // BOXING PLANS
  getBoxingPlans: (): BoxingPlan[] => getStorageItem('boxing_plans', INITIAL_BOXING_PLANS),
  saveBoxingPlans: (plans: BoxingPlan[]) => setStorageItem('boxing_plans', plans),
  addBoxingPlan: (plan: Omit<BoxingPlan, 'id'>) => {
    const plans = dataService.getBoxingPlans();
    const newPlan: BoxingPlan = { ...plan, id: `b_${Date.now()}` };
    dataService.saveBoxingPlans([...plans, newPlan]);
    return newPlan;
  },
  updateBoxingPlan: (id: string, updated: Partial<BoxingPlan>) => {
    const plans = dataService.getBoxingPlans().map(p => p.id === id ? { ...p, ...updated } : p);
    dataService.saveBoxingPlans(plans);
  },
  deleteBoxingPlan: (id: string) => {
    const plans = dataService.getBoxingPlans().filter(p => p.id !== id);
    dataService.saveBoxingPlans(plans);
  },

  // MEMBERSHIP PLANS
  getMembershipPlans: (): MembershipPlan[] => getStorageItem('membership_plans', INITIAL_MEMBERSHIP_PLANS),
  saveMembershipPlans: (plans: MembershipPlan[]) => setStorageItem('membership_plans', plans),
  addMembershipPlan: (plan: Omit<MembershipPlan, 'id'>) => {
    const plans = dataService.getMembershipPlans();
    const newPlan: MembershipPlan = { ...plan, id: `m_${Date.now()}` };
    dataService.saveMembershipPlans([...plans, newPlan]);
    return newPlan;
  },
  updateMembershipPlan: (id: string, updated: Partial<MembershipPlan>) => {
    const plans = dataService.getMembershipPlans().map(p => p.id === id ? { ...p, ...updated } : p);
    dataService.saveMembershipPlans(plans);
  },
  deleteMembershipPlan: (id: string) => {
    const plans = dataService.getMembershipPlans().filter(p => p.id !== id);
    dataService.saveMembershipPlans(plans);
  },

  // SPA SERVICES
  getSpaServices: (): SpaService[] => getStorageItem('spa_services', INITIAL_SPA_SERVICES),
  saveSpaServices: (services: SpaService[]) => setStorageItem('spa_services', services),
  addSpaService: (spa: Omit<SpaService, 'id'>) => {
    const services = dataService.getSpaServices();
    const newSpa: SpaService = { ...spa, id: `spa_${Date.now()}` };
    dataService.saveSpaServices([...services, newSpa]);
    return newSpa;
  },
  updateSpaService: (id: string, updated: Partial<SpaService>) => {
    const services = dataService.getSpaServices().map(s => s.id === id ? { ...s, ...updated } : s);
    dataService.saveSpaServices(services);
  },
  deleteSpaService: (id: string) => {
    const services = dataService.getSpaServices().filter(s => s.id !== id);
    dataService.saveSpaServices(services);
  },

  // PRODUCTS
  getProducts: (): ProductItem[] => getStorageItem('products', INITIAL_PRODUCTS),
  saveProducts: (products: ProductItem[]) => setStorageItem('products', products),
  addProduct: (product: Omit<ProductItem, 'id'>) => {
    const products = dataService.getProducts();
    const newProduct: ProductItem = { ...product, id: `p_${Date.now()}` };
    dataService.saveProducts([newProduct, ...products]);
    return newProduct;
  },
  updateProduct: (id: string, updated: Partial<ProductItem>) => {
    const products = dataService.getProducts().map(p => p.id === id ? { ...p, ...updated } : p);
    dataService.saveProducts(products);
  },
  deleteProduct: (id: string) => {
    const products = dataService.getProducts().filter(p => p.id !== id);
    dataService.saveProducts(products);
  },

  // TRANSFORMATIONS
  getTransformations: (): TransformationStory[] => getStorageItem('transformations', INITIAL_TRANSFORMATIONS),
  saveTransformations: (items: TransformationStory[]) => setStorageItem('transformations', items),
  addTransformation: (story: Omit<TransformationStory, 'id'>) => {
    const items = dataService.getTransformations();
    const newStory: TransformationStory = { ...story, id: `tr_${Date.now()}` };
    dataService.saveTransformations([newStory, ...items]);
    return newStory;
  },
  updateTransformation: (id: string, updated: Partial<TransformationStory>) => {
    const items = dataService.getTransformations().map(t => t.id === id ? { ...t, ...updated } : t);
    dataService.saveTransformations(items);
  },
  deleteTransformation: (id: string) => {
    const items = dataService.getTransformations().filter(t => t.id !== id);
    dataService.saveTransformations(items);
  },

  // LEADS
  getLeads: (): Lead[] => getStorageItem('leads', INITIAL_LEADS),
  saveLeads: (leads: Lead[]) => setStorageItem('leads', leads),
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const leads = dataService.getLeads();
    const newLead: Lead = {
      ...lead,
      id: `lead_${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    dataService.saveLeads([newLead, ...leads]);
    return newLead;
  },
  updateLeadStatus: (id: string, status: Lead['status'], adminNotes?: string) => {
    const leads = dataService.getLeads().map(l => l.id === id ? { ...l, status, ...(adminNotes !== undefined ? { adminNotes } : {}) } : l);
    dataService.saveLeads(leads);
  },
  deleteLead: (id: string) => {
    const leads = dataService.getLeads().filter(l => l.id !== id);
    dataService.saveLeads(leads);
  },

  // BOOKINGS
  getBookings: (): Booking[] => getStorageItem('bookings', INITIAL_BOOKINGS),
  saveBookings: (bookings: Booking[]) => setStorageItem('bookings', bookings),
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const bookings = dataService.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: `bk_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    dataService.saveBookings([newBooking, ...bookings]);
    return newBooking;
  },
  updateBookingStatus: (id: string, status: Booking['status'], adminNotes?: string) => {
    const bookings = dataService.getBookings().map(b => b.id === id ? { ...b, status, ...(adminNotes !== undefined ? { adminNotes } : {}) } : b);
    dataService.saveBookings(bookings);
  },
  deleteBooking: (id: string) => {
    const bookings = dataService.getBookings().filter(b => b.id !== id);
    dataService.saveBookings(bookings);
  },

  // SETTINGS
  getSettings: (): BusinessSettings => getStorageItem('settings', INITIAL_GYM_INFO),
  saveSettings: (settings: BusinessSettings) => setStorageItem('settings', settings),

  // GALLERY
  getGallery: (): GalleryItem[] => getStorageItem('gallery', INITIAL_GALLERY),
  saveGallery: (gallery: GalleryItem[]) => setStorageItem('gallery', gallery),

  // TESTIMONIALS
  getTestimonials: (): Testimonial[] => getStorageItem('testimonials', INITIAL_TESTIMONIALS),
  saveTestimonials: (items: Testimonial[]) => setStorageItem('testimonials', items),

  // FAQS
  getFaqs: (): FAQItem[] => getStorageItem('faqs', INITIAL_FAQS),
  saveFaqs: (faqs: FAQItem[]) => setStorageItem('faqs', faqs),
};
