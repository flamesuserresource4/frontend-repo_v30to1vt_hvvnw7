import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductRecommendations from './components/ProductRecommendations';
import Footer from './components/Footer';

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      <Navbar onSearch={setQuery} />
      <main className="mx-auto max-w-7xl">
        <Hero onCTAShop={() => window.alert('Navigasi ke katalog produk')} onCTASeller={() => window.alert('Masuk Seller Center')} />
        <CategoryGrid onSelect={setCategory} />
        <ProductRecommendations query={query} category={category} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
