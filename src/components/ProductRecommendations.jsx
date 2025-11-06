import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
const USER_ID = 'demo-user';

function formatCurrency(idr) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(idr);
}

export default function ProductRecommendations({ query, category, onCartChange, onWishlistChange }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (category) params.set('category', category);
      const res = await fetch(`${API_BASE}/api/products?${params.toString()}`);
      if (!res.ok) throw new Error('Gagal memuat produk');
      const data = await res.json();
      if (Array.isArray(data.items) && data.items.length > 0) {
        setItems(data.items);
      } else {
        // seed if empty
        await fetch(`${API_BASE}/api/seed-products`, { method: 'POST' });
        const res2 = await fetch(`${API_BASE}/api/products`);
        const data2 = await res2.json();
        setItems(data2.items || []);
      }
    } catch (e) {
      setError(e.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category]);

  const filtered = useMemo(() => items, [items]);

  const addToCart = async (productId) => {
    try {
      await fetch(`${API_BASE}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: USER_ID, product_id: productId, qty: 1 }),
      });
      onCartChange?.();
    } catch (_) {
      // noop
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await fetch(`${API_BASE}/api/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: USER_ID, product_id: productId }),
      });
      onWishlistChange?.();
    } catch (_) {
      // noop
    }
  };

  return (
    <section className="px-6 md:px-10 lg:px-16 py-8">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100">Disarankan untuk Kamu</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Rekomendasi cerdas berdasar minatmu</p>
        </div>
        <button onClick={fetchProducts} className="text-sm text-neutral-700 dark:text-neutral-300 hover:underline">Muat Ulang</button>
      </div>

      {loading && (
        <div className="py-10 text-center text-neutral-500">Memuat produk…</div>
      )}
      {error && (
        <div className="py-4 text-center text-rose-600">{error}</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id || p._id || i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={(p.images && p.images[0]) || p.image || 'https://images.unsplash.com/photo-1520975964732-35dd22d3d648?q=80&w=1200&auto=format&fit=crop'} alt={p.title || p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"/>
              <button onClick={() => addToWishlist(p.id)} className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full bg-white/90 backdrop-blur p-2 text-rose-500 shadow">
                <Heart size={18} />
              </button>
              {p.sale_price && (
                <span className="absolute left-2 top-2 rounded-full bg-rose-500 px-2 py-1 text-[10px] font-semibold text-white">Sale</span>
              )}
            </div>
            <div className="p-3">
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                <Star size={14} fill="currentColor" />
                <span className="font-medium">{p.rating ?? 4.6}</span>
                <span className="text-neutral-400">({p.reviews ?? 120})</span>
              </div>
              <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">{p.title || p.name}</h3>
              <div className="mt-1 flex items-baseline gap-2">
                {p.sale_price ? (
                  <>
                    <span className="text-sm font-bold text-emerald-600">{formatCurrency(p.sale_price)}</span>
                    <span className="text-xs text-neutral-400 line-through">{formatCurrency(p.price)}</span>
                  </>
                ) : (
                  <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{formatCurrency(p.price)}</span>
                )}
              </div>
              <div className="mt-3 flex justify-between">
                <button onClick={() => addToCart(p.id)} className="inline-flex items-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs font-medium">
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
