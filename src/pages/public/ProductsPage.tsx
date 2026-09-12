import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { ProductItem } from '../../types';
import { notificationService } from '../../services/notificationService';
import { TiltCard } from '../../components/3d/TiltCard';
import { sanitizeNameInput, sanitizePhoneInput, isValidName, isValidPhone } from '../../utils/validation';
import { SEO } from '../../components/SEO';
import { getBreadcrumbSchema, getProductSchema } from '../../utils/schemaHelper';
import { ImageLightboxModal } from '../../components/ImageLightboxModal';

export const ProductsPage: React.FC = () => {
  const { products, settings } = useData();
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [lightboxProduct, setLightboxProduct] = useState<ProductItem | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const activeProducts = products.filter((p) => p.isActive);

  const siteUrl = settings.siteUrl || 'https://beastfactorynepal.com';
  const breadcrumbSchema = getBreadcrumbSchema(siteUrl, [
    { name: 'Home', url: '/' },
    { name: 'Official Store & Gear', url: '/products' }
  ]);
  const productSchemas = activeProducts.map((p) => getProductSchema(siteUrl, p));

  const handleOrderInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedProduct) return;

    if (!isValidName(name)) {
      setErrorMsg('Please enter a valid name (letters only).');
      return;
    }

    if (!isValidPhone(phone)) {
      setErrorMsg('Please enter a valid phone number (7 to 15 digits).');
      return;
    }

    const lead = dataService.addLead({
      fullName: name.trim(),
      phone: phone.trim(),
      inquiryType: 'product',
      message: `Product Order Request: ${selectedProduct.name} (Qty: ${quantity}) - Total: NPR ${(selectedProduct.priceNpr * quantity).toLocaleString()}`,
    });

    try {
      await notificationService.createNotification({
        type: 'new_product_inquiry',
        priority: 'NORMAL',
        title: 'NEW PRODUCT INQUIRY',
        message: `${name} requested ${quantity}x ${selectedProduct.name} (${phone}).`,
        relatedId: lead.id,
        relatedType: 'inquiry',
        actionUrl: '/admin/inquiries',
      });
    } catch (err) {
      console.warn('Notification trigger handled gracefully:', err);
    }

    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      <SEO
        title="Official Gym Gear & Merchandise Store | Beast Factory Damak"
        description="Shop official Beast Factory gym apparel, insulated shakers, heavy lifting belts & authentic supplements in Damak-1, Jhapa. Direct local pickup & inquiry."
        canonicalPath="/products"
        structuredData={[breadcrumbSchema, ...productSchemas]}
      />
      {/* HERO */}
      <section className="relative py-20 px-4 text-center border-b border-neutral-900 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" /> OFFICIAL GEAR & MERCHANDISE
          </span>
          <h1 className="font-heading text-6xl sm:text-8xl text-white">
            BEAST FACTORY <span className="text-[#e8272a]">STORE</span>
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            High-performance gym apparel, insulated shakers, heavy lifting belts, and authentic supplements available directly at our Damak center. Click product images to view full resolution.
          </p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeProducts.map((item) => (
            <TiltCard key={item.id} maxDegree={5} depth={20}>
              <div className="glass-panel-3d rounded-3xl overflow-hidden border border-neutral-800 hover:border-[#e8272a]/60 transition-all flex flex-col justify-between group h-full">
                <div
                  onClick={() => setLightboxProduct(item)}
                  className="relative h-64 overflow-hidden bg-neutral-900 cursor-pointer"
                >
                  <img src={item.imageUrls[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-700 text-white text-[10px] font-bold uppercase backdrop-blur-md">
                    {item.category}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-neutral-800 group-hover:border-[#e8272a]">
                    VIEW PHOTO 🔍
                  </span>
                  {item.inStock ? (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/40 backdrop-blur-md">
                      AVAILABLE AT BEAST FACTORY
                    </span>
                  ) : (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold uppercase border border-red-500/40 backdrop-blur-md">
                      OUT OF STOCK
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-2xl text-white group-hover:text-[#ff1e1e] transition-colors cursor-pointer" onClick={() => setLightboxProduct(item)}>{item.name}</h3>
                    <p className="text-neutral-400 text-xs mt-2 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 font-semibold block">PRICE</span>
                      <span className="font-heading text-3xl text-white">NPR {item.priceNpr.toLocaleString()}</span>
                    </div>
                    <button onClick={() => { setSelectedProduct(item); setSubmitted(false); setQuantity(1); }} className="px-6 py-2.5 rounded-full bg-[#e8272a] text-white font-heading text-base hover:bg-[#ff1e1e] shadow-lg shadow-red-500/20 transition-all">
                      ENQUIRE / BUY
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* PRODUCT LIGHTBOX MODAL */}
        <ImageLightboxModal
          isOpen={!!lightboxProduct}
          onClose={() => setLightboxProduct(null)}
          imageUrl={lightboxProduct?.imageUrls[0] || ''}
          title={lightboxProduct?.name || ''}
          subtitle={`NPR ${lightboxProduct?.priceNpr?.toLocaleString() || 0}`}
          details={lightboxProduct?.description}
          category={lightboxProduct?.category}
        />

        {/* ORDER INQUIRY MODAL */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-[#e8272a]/40 relative">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-neutral-400 hover:text-white font-bold text-xl">✕</button>

              {submitted ? (
                <div className="text-center space-y-4 py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
                  <h3 className="font-heading text-3xl text-white">ORDER INQUIRY RECEIVED!</h3>
                  <p className="text-xs text-neutral-300">
                    Thank you, <strong>{name}</strong>. We have received your order inquiry for <strong>{quantity}x {selectedProduct.name}</strong>. Our front desk team will contact you at <strong>{phone}</strong> for pick-up / delivery instructions.
                  </p>
                  <button onClick={() => setSelectedProduct(null)} className="px-6 py-2.5 rounded-full bg-[#e8272a] text-white font-heading text-sm">
                    BACK TO STORE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOrderInquiry} className="space-y-4">
                  <span className="text-[10px] text-[#e8272a] font-bold uppercase tracking-widest">PRODUCT INQUIRY</span>
                  <h3 className="font-heading text-2xl text-white">{selectedProduct.name}</h3>
                  <p className="text-xs text-neutral-400">{selectedProduct.description}</p>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-semibold text-center">
                      {errorMsg}
                    </div>
                  )}

                  <div className="bg-neutral-900 p-3.5 rounded-2xl border border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
                    <span>Unit Price:</span>
                    <span className="font-heading text-xl text-white">NPR {selectedProduct.priceNpr.toLocaleString()}</span>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 font-semibold mb-1">QUANTITY</label>
                    <input type="number" min={1} max={10} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e8272a]" />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 font-semibold mb-1">YOUR NAME *</label>
                    <input type="text" required value={name} onChange={(e) => setName(sanitizeNameInput(e.target.value))} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8272a]" />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 font-semibold mb-1">PHONE / WHATSAPP *</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8272a]" />
                  </div>

                  <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 font-semibold block">TOTAL AMOUNT</span>
                      <span className="font-heading text-2xl text-[#e8272a]">NPR {(selectedProduct.priceNpr * quantity).toLocaleString()}</span>
                    </div>
                    <button type="submit" className="px-6 py-3 rounded-xl bg-[#e8272a] text-white font-heading text-base font-bold hover:bg-[#ff1e1e]">
                      SUBMIT ORDER
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

