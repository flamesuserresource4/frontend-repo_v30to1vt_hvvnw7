import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero({ onCTAShop, onCTASeller }) {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-6 items-center min-h-[520px]">
        {/* Left copy */}
        <div className="order-2 lg:order-1 px-6 md:px-10 lg:px-16 py-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50"
          >
            Fashion Minimalis, Nyaman, dan Elegan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-neutral-600 dark:text-neutral-300 max-w-xl"
          >
            Jelajahi koleksi pilihan dengan rekomendasi AI. Mulai belanja atau masuk ke Seller Center untuk kelola toko Anda.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <button onClick={onCTAShop} className="inline-flex items-center rounded-full bg-neutral-900 text-white px-5 py-2.5 text-sm font-medium dark:bg-white dark:text-neutral-900">
              Mulai Belanja
            </button>
            <button onClick={onCTASeller} className="inline-flex items-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 dark:text-neutral-100 dark:border-neutral-700">
              Masuk Seller Center
            </button>
          </motion.div>
        </div>

        {/* Right 3D visual */}
        <div className="order-1 lg:order-2 h-[380px] lg:h-[520px]">
          <div className="w-full h-full">
            <Spline scene="https://prod.spline.design/3o02J0iUo2K07S3x/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50 dark:from-neutral-900 dark:via-transparent dark:to-neutral-900/60" />
        </div>
      </div>
    </section>
  );
}
