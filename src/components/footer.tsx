import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";


export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative bg-black text-white pt-20 pb-10 px-6 border-t border-zinc-900 overflow-hidden">
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand Identity Section */}
          <div className="flex flex-col items-center md:items-start space-y-6 lg:col-span-1">
            <Link href="/" className="group flex flex-col items-center md:items-start">
              <span className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 group-hover:from-orange-400 group-hover:to-orange-600 transition-all duration-500">
                ՍՅՈՒՆԻՔ
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold mt-1 group-hover:text-zinc-400 transition-colors">
                Dreams • Explore • Legend
              </span>
            </Link>
            {/* <p className="text-zinc-500 text-sm leading-relaxed text-center md:text-left max-w-xs">
              {t('rights')}
            </p> */}
          </div>

          <div className="">

          </div>

          {/* Quick Links Group 1 */}
          <div className="flex flex-col items-center md:items-start space-y-5 lg:pl-10">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500/80 mb-2">{t('explore')}</h4>
            <nav className="flex flex-col space-y-4 items-center md:items-start">
              <Link href="/history" className="text-zinc-400 hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block">
                {t('history')}
              </Link>
              <Link href="/trips" className="text-zinc-400 hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block">
                {t('tourism')}
              </Link>
              <Link href="/city" className="text-zinc-400 hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block">
                {t('cities')}
              </Link>
            </nav>
          </div>

          {/* Quick Links Group 2 */}
          <div className="flex flex-col items-center md:items-start space-y-5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500/80 mb-2">{t('support')}</h4>
            <nav className="flex flex-col space-y-4 items-center md:items-start">
              <Link href="/product" className="text-zinc-400 hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block">
                {t('product')}
              </Link>
              <Link href="/contact" className="text-zinc-400 hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block">
                {t('contact')}
              </Link>
              <Link href="/privacy-policy" className="text-zinc-400 hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block">
                {t('privacy_policy')}
              </Link>
            </nav>
          </div>

          {/* Social & Contact Section */}
          {/* <div className="flex flex-col items-center md:items-start lg:items-end space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500/80 mb-2 lg:text-right w-full">{t('stay_connected')}</h4>
            <div className="flex gap-4">
              {["FB", "IG", "TW"].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 group">
                  <span className="text-[10px] font-bold">{social}</span>
                </a>
              ))}
            </div>
            <div className="pt-4 lg:text-right">
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">Syunik Dreams HQ</p>
              <p className="text-zinc-500 text-xs mt-1 italic">syunikdreams@gmail.com</p>
            </div>
          </div> */}
        </div>

        {/* Bottom Bar */}
        {/* <div className="pt-10 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-700">
            &copy; 2026 Syunik Dreams • Legendary Trails
          </div>
          <div className="flex items-center gap-6">
            <div className="h-[1px] w-12 bg-zinc-900 hidden sm:block" />
            <span className="text-zinc-800 text-[9px] font-black uppercase tracking-[0.5em]">
              Designed for the Brave
            </span>
          </div>
        </div> */}
      </div>
    </footer>
  );
}

