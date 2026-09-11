import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';
import { useData } from '../../hooks/useData';

export const GalleryPage: React.FC = () => {
  const { galleryItems } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const activeGallery = galleryItems
    .filter((item) => item.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const categories = ['All', ...Array.from(new Set(activeGallery.map((item) => item.category)))];

  const filteredItems = selectedCategory === 'All'
    ? activeGallery
    : activeGallery.filter((item) => item.category === selectedCategory);

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      {/* HERO */}
      <section className="relative py-20 px-4 text-center border-b border-neutral-900 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold flex items-center justify-center gap-2">
            <ImageIcon className="w-4 h-4" /> FACILITY & ATMOSPHERE
          </span>
          <h1 className="font-heading text-6xl sm:text-8xl text-white">
            BEAST FACTORY <span className="text-[#e8272a]">GALLERY</span>
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Take a visual tour of our international heavy equipment, combat boxing ring, Finnish wood sauna, and high-energy training zones.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[#e8272a] text-white font-bold shadow-md shadow-red-500/20'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            <p className="text-sm">No photos available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="glass-panel rounded-2xl overflow-hidden border border-neutral-800 group hover:border-[#e8272a]/40 transition-all">
                <div className="relative h-64 overflow-hidden bg-neutral-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-heading text-xl text-white group-hover:text-[#ff1e1e] transition-colors">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
