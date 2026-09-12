import { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import { trainerService, serviceService, inquiryService, bookingService } from '../services/supabase';
import { Trainer, ServiceItem, Lead, Booking } from '../types';

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

      if (tList) setSupabaseTrainers(tList);
      if (sList) setSupabaseServices(sList);
      if (lList) setSupabaseLeads(lList);
      if (bList) setSupabaseBookings(bList);
    } catch (err) {
      console.warn('Supabase async sync fallback to local store');
    }
  };

  useEffect(() => {
    refreshAsyncData();

    const handleStorageUpdate = () => {
      setDataVersion((prev) => prev + 1);
      refreshAsyncData();
    };

    window.addEventListener('beast_factory_storage_update', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('beast_factory_storage_update', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, [dataVersion]);

  return {
    version: dataVersion,
    founders: dataService.getFounders(),
    trainers: supabaseTrainers || dataService.getTrainers(),
    services: supabaseServices || dataService.getServices(),
    boxingPlans: dataService.getBoxingPlans(),
    membershipPlans: dataService.getMembershipPlans(),
    spaServices: dataService.getSpaServices(),
    products: dataService.getProducts(),
    transformations: dataService.getTransformations(),
    galleryItems: dataService.getGallery(),
    testimonials: dataService.getTestimonials(),
    faqs: dataService.getFaqs(),
    leads: supabaseLeads || dataService.getLeads(),
    bookings: supabaseBookings || dataService.getBookings(),
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
