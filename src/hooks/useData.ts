import { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

export const useData = () => {
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
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

  return {
    version: dataVersion,
    founders: dataService.getFounders(),
    trainers: dataService.getTrainers(),
    services: dataService.getServices(),
    boxingPlans: dataService.getBoxingPlans(),
    membershipPlans: dataService.getMembershipPlans(),
    spaServices: dataService.getSpaServices(),
    products: dataService.getProducts(),
    transformations: dataService.getTransformations(),
    galleryItems: dataService.getGallery(),
    testimonials: dataService.getTestimonials(),
    faqs: dataService.getFaqs(),
    leads: dataService.getLeads(),
    bookings: dataService.getBookings(),
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
