import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart } from 'lucide-react';

const mockProducts = [
  {
    id: 'p1',
    name: 'Oversized Tee Minimal',
    price: 129000,
    rating: 4.6,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1487099174927-da3cd6408862?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxPdmVyc2l6ZWQlMjBUZWUlMjBNaW5pbWFsfGVufDB8MHx8fDE3NjI0NDc4OTZ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    tag: 'Wanita',
    sale: 99000,
  },
  {
    id: 'p2',
    name: 'Cardigan Rajut Pastel',
    price: 199000,
    rating: 4.8,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1693592401248-c9544518318a?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDYXJkaWdhbiUyMFJhanV0JTIwUGFzdGVsfGVufDB8MHx8fDE3NjI0NDc4OTZ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    tag: 'Pria',
  },
  {
    id: 'p3',
    name: 'Sneakers Putih Clean',
    price: 359000,
    rating: 4.7,
    reviews: 521,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
    tag: 'Unisex',
  },
  {
    id: 'p4',
    name: 'Tote Bag Kanvas',
    price: 99000,
    rating: 4.5,
    reviews: 213,
    image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1200&auto=format&fit=crop',
    tag: 'Aksesoris',
  },
];

function formatCurrency(idr) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(idr);
}

export default function ProductRecommendations({ query, category }) {
  const items = useMemo(() => {
    let list = mockProducts;
    if (category) list = list.filter((p) => p.tag.toLowerCase().includes(category.toLowerCase()));
    if (query) list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    return list;
  }, [query, category]);

  return (
    <section className="px-6 md:px-10 lg:px-16 py-8">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100">Disarankan untuk Kamu</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Rekomendasi cerdas berdasar minatmu</p>
        </div>
        <button className="text-sm text-neutral-700 dark:text-neutral-300 hover:underline">Lihat Semua</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"/>
              <button className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full bg-white/90 backdrop-blur p-2 text-rose-500 shadow">
                <Heart size={18} />
              </button>
              {p.sale && (
                <span className="absolute left-2 top-2 rounded-full bg-rose-500 px-2 py-1 text-[10px] font-semibold text-white">Sale</span>
              )}
            </div>
            <div className="p-3">
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                <Star size={14} fill="currentColor" />
                <span className="font-medium">{p.rating}</span>
                <span className="text-neutral-400">({p.reviews})</span>
              </div>
              <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">{p.name}</h3>
              <div className="mt-1 flex items-baseline gap-2">
                {p.sale ? (
                  <>
                    <span className="text-sm font-bold text-emerald-600">{formatCurrency(p.sale)}</span>
                    <span className="text-xs text-neutral-400 line-through">{formatCurrency(p.price)}</span>
                  </>
                ) : (
                  <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{formatCurrency(p.price)}</span>
                )}
              </div>
              <div className="mt-3 flex justify-between">
                <button className="inline-flex items-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs font-medium">
                  <ShoppingBag size={14} /> Tambah
                </button>
                <button className="text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:underline">Detail</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
