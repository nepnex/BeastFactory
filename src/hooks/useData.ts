import { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import { trainerService, serviceService, inquiryService, bookingService } from '../services/supabase';
import { Trainer, ServiceItem, Lead, Booking } from '../types';
import { INITIAL_SERVICES } from '../data/gymData';

export const useData = () => {
  const [dataVersion, setDataVersion] = useState(0);
  const [supabaseTrainers, setSupabaseTrainers] = useState<Trainer[] | null>(null);
  const [supabaseServices, setSupabaseServices] = useState<ServiceItem[] | null>(null);
  const [supabaseLeads, setSupabaseLeads] = useState<Lead[] | null>(null);
  const [supabaseBookings, setSupabaseBookings] = useState<Booking[] | null>(null);

  const refreshAsyncData = async () => {
    try {
      const [tList, sList, lList, bList] = await Promise.all([
        trainerService.getTrainers(),
        serviceService.getServices(),
        inquiryService.getLeads(),
        bookingService.getBookings()
      ]);

      if (tList && tList.length > 0) setSupabaseTrainers(tList);
      if (sList && sList.length > 0) setSupabaseServices(sList);
      if (lList && lList.length > 0) setSupabaseLeads(lList);
      if (bList && bList.length > 0) setSupabaseBookings(bList);
    } catch (err) {
      console.warn('Supabase async sync fallback to local store');
    }
  };

  useEffect(() => {
    refreshAsyncData();

    const handleStorageUpdate = () => {
      setDataVersion((prev) => prev + 1);
    };

    window.addEventListener('beast_factory_storage_update', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('beast_factory_storage_update', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  // Prefer stored localStorage data first so admin changes persist on reload & across mobile/desktop sessions
  const localServices = dataService.getServices();
  const rawServices = localServices.length > 0 ? localServices : (supabaseServices || INITIAL_SERVICES);

  const servicesWithImages = rawServices.map((svc) => {
    const init = INITIAL_SERVICES.find((s) => s.id === svc.id);
    return {
      ...svc,
      coverImageUrl: svc.coverImageUrl || (init ? init.coverImageUrl : ''),
    };
  });

  const localTrainers = dataService.getTrainers();
  const trainersData = localTrainers.length > 0 ? localTrainers : (supabaseTrainers || []);

  const localLeads = dataService.getLeads();
  const leadsData = localLeads.length > 0 ? localLeads : (supabaseLeads || []);

  const localBookings = dataService.getBookings();
  const bookingsData = localBookings.length > 0 ? localBookings : (supabaseBookings || []);

  return {
    version: dataVersion,
    founders: dataService.getFounders(),
    trainers: trainersData,
    services: servicesWithImages,
    boxingPlans: dataService.getBoxingPlans(),
    membershipPlans: dataService.getMembershipPlans(),
    spaServices: dataService.getSpaServices(),
    products: dataService.getProducts(),
    transformations: dataService.getTransformations(),
    galleryItems: dataService.getGallery(),
    testimonials: dataService.getTestimonials(),
    faqs: dataService.getFaqs(),
    leads: leadsData,
    bookings: bookingsData,
    settings: dataService.getSettings(),

    setFounders: dataService.saveFounders,
    setTrainers: dataService.saveTrainers,
    setServices: dataService.saveServices,
    setBoxingPlans: dataService.saveBoxingPlans,
    setMembershipPlans: dataService.saveMembershipPlans,
    setSpaServices: dataService.saveSpaServices,
    setProducts: dataService.saveProducts,
    setTransformations: dataService.saveTransformations,
    setGalleryItems: dataService.saveGallery,
    setTestimonials: dataService.saveTestimonials,
    setFaqs: dataService.saveFaqs,
    setLeads: dataService.saveLeads,
    setBookings: dataService.saveBookings,
    setSettings: dataService.saveSettings,
  };
};
