import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";


export function Footer() {
  const t = useTranslations('footer');


  /**
   * 
   * Footer Component
   * 
   * Features:
   */

  return (
    <footer className="bg-black text-white py-12 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <Link href="/" className="text-2xl font-bold mb-2">ՍՅՈՒՆԻՔ</Link>
          <p className="text-zinc-500 text-sm">{t('rights')}</p>
        </div>
        <div className="flex gap-6">
          <Link href="/history" className="text-zinc-400 hover:text-orange-500 transition-colors">{t('history')}</Link>

          <Link href="/trips" className="text-zinc-400 hover:text-orange-500 transition-colors">{t('tourism')}</Link>

          <Link href="/city" className="text-zinc-400 hover:text-orange-500 transition-colors">{t('cities')}</Link>

          <Link href="/product" className="text-zinc-400 hover:text-orange-500 transition-colors">{t('product')}</Link>
          <Link href="/privacy-policy" className="text-zinc-400 hover:text-orange-500 transition-colors">{t('privacy_policy')}</Link>
          <Link href="/contact" className="text-zinc-400 hover:text-orange-500 transition-colors">{t('contact')}</Link>
        </div>
      </div>
    </footer>
  );
}    