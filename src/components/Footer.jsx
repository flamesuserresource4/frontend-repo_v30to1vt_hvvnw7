export default function Footer() {
  return (
    <footer className="mt-10 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-8 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">VibeFashion</h4>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">E-commerce fashion modern dengan rekomendasi AI dan pengalaman belanja yang mulus.</p>
        </div>
        <div>
          <h5 className="font-medium text-neutral-800 dark:text-neutral-200">Bantuan</h5>
          <ul className="mt-2 space-y-1 text-neutral-600 dark:text-neutral-400">
            <li><a href="#" className="hover:underline">Pusat Bantuan</a></li>
            <li><a href="#" className="hover:underline">Kebijakan Privasi</a></li>
            <li><a href="#" className="hover:underline">Syarat & Ketentuan</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium text-neutral-800 dark:text-neutral-200">Kontak</h5>
          <ul className="mt-2 space-y-1 text-neutral-600 dark:text-neutral-400">
            <li>Email: support@vibefashion.app</li>
            <li>Instagram: @vibefashion</li>
          </ul>
        </div>
      </div>
      <div className="text-center py-4 text-xs text-neutral-500">© {new Date().getFullYear()} VibeFashion. All rights reserved.</div>
    </footer>
  );
}
