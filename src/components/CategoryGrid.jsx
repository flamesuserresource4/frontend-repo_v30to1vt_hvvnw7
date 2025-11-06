import { motion } from 'framer-motion';

const categories = [
  { id: 'men', name: 'Fashion Pria', color: 'from-blue-400 to-cyan-300' },
  { id: 'women', name: 'Fashion Wanita', color: 'from-pink-400 to-rose-300' },
  { id: 'accessories', name: 'Aksesoris', color: 'from-amber-300 to-orange-300' },
  { id: 'sport', name: 'Sportwear', color: 'from-emerald-300 to-teal-300' },
  { id: 'kids', name: 'Anak-anak', color: 'from-violet-300 to-fuchsia-300' },
  { id: 'shoes', name: 'Sepatu', color: 'from-slate-300 to-zinc-300' },
];

export default function CategoryGrid({ onSelect }) {
  return (
    <section className="px-6 md:px-10 lg:px-16 py-8">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100">Kategori Populer</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Temukan gaya sesuai kebutuhanmu</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {categories.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => onSelect?.(c.id)}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`group relative flex h-24 items-end overflow-hidden rounded-2xl bg-gradient-to-br ${c.color} p-3 text-left shadow-sm`}
          >
            <span className="z-10 text-sm font-semibold text-neutral-900">{c.name}</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/30" />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
