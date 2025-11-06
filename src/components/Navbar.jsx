import { useEffect, useState } from 'react';
import { ShoppingCart, Heart, MessageCircle, User, Search, Sun, Moon, Home } from 'lucide-react';

export default function Navbar({ cartCount = 2, wishlistCount = 5, onSearch }) {
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const submitSearch = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/70 bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-400 via-rose-400 to-orange-300" />
            <span className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">VibeFashion</span>
          </div>

          {/* Center: Search */}
          <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="flex w-full items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 shadow-sm">
              <Search size={18} className="text-neutral-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari fashion, brand, atau kategori..."
                className="w-full bg-transparent outline-none text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400"
              />
              <button type="submit" className="inline-flex items-center rounded-full bg-neutral-900 px-3 py-1.5 text-white text-sm dark:bg-neutral-100 dark:text-neutral-900">
                Cari
              </button>
            </div>
          </form>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button aria-label="Home" className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
              <Home size={20} />
            </button>
            <button aria-label="Wishlist" className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] rounded-full bg-rose-500 px-1.5 text-center text-[10px] font-medium text-white">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button aria-label="Chat" className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
              <MessageCircle size={20} />
            </button>
            <button aria-label="Cart" className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] rounded-full bg-emerald-500 px-1.5 text-center text-[10px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button aria-label="Profile" className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
              <User size={20} />
            </button>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="ml-1 p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={submitSearch} className="md:hidden pb-3">
          <div className="flex w-full items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 shadow-sm">
            <Search size={18} className="text-neutral-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari fashion, brand, atau kategori..."
              className="w-full bg-transparent outline-none text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400"
            />
            <button type="submit" className="inline-flex items-center rounded-full bg-neutral-900 px-3 py-1.5 text-white text-sm dark:bg-neutral-100 dark:text-neutral-900">
              Cari
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
