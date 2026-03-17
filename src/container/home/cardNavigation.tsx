// Card Navigation Section for Home Page

import { FC } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
);

const TripsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
    </svg>
);

const CitiesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
    </svg>
);

const ProductIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

const ContactIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
);

const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);


type CardData = {
    href: string;
    titleKey: string;
    descKey: string;
    badgeKey: string;
    icon: React.ReactNode;
    gradient: string;
    iconBg: string;
    badgeColor: string;
    accent: string;
};

const cards: CardData[] = [
    {
        href: "/history",
        titleKey: "history_title",
        descKey: "history_desc",
        badgeKey: "history_badge",
        icon: <HistoryIcon />,
        gradient: "from-amber-950/80 via-amber-900/60 to-stone-900/80",
        iconBg: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        badgeColor: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
        accent: "group-hover:bg-amber-500",
    },
    {
        href: "/trips",
        titleKey: "trips_title",
        descKey: "trips_desc",
        badgeKey: "trips_badge",
        icon: <TripsIcon />,
        gradient: "from-emerald-950/80 via-emerald-900/60 to-stone-900/80",
        iconBg: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        accent: "group-hover:bg-emerald-500",
    },
    {
        href: "/city",
        titleKey: "cities_title",
        descKey: "cities_desc",
        badgeKey: "cities_badge",
        icon: <CitiesIcon />,
        gradient: "from-sky-950/80 via-sky-900/60 to-stone-900/80",
        iconBg: "bg-sky-500/20 text-sky-400 border border-sky-500/30",
        badgeColor: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
        accent: "group-hover:bg-sky-500",
    },
    {
        href: "/product",
        titleKey: "product_title",
        descKey: "product_desc",
        badgeKey: "product_badge",
        icon: <ProductIcon />,
        gradient: "from-violet-950/80 via-violet-900/60 to-stone-900/80",
        iconBg: "bg-violet-500/20 text-violet-400 border border-violet-500/30",
        badgeColor: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
        accent: "group-hover:bg-violet-500",
    },
    {
        href: "/contact",
        titleKey: "contact_title",
        descKey: "contact_desc",
        badgeKey: "contact_badge",
        icon: <ContactIcon />,
        gradient: "from-rose-950/80 via-rose-900/60 to-stone-900/80",
        iconBg: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
        badgeColor: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
        accent: "group-hover:bg-rose-500",
    },
];

export const CardNavigation: FC = () => {

    const t = useTranslations("home_page.card_navigation");

    return (
        <section className="relative py-24 px-6 md:px-12 bg-zinc-950 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-orange-600/5 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-stone-800/20 blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-orange-400 border border-orange-500/30 bg-orange-500/10 mb-6">
                        {t("label")}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {t("title")}
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mb-5" />
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5 animate-fade-in-up delay-300">
                    {cards.slice(0, 3).map((card) => (
                        <NavigationCard key={card.href} card={card} t={t} />
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:w-2/3 lg:mx-auto animate-fade-in-up delay-500">
                    {cards.slice(3).map((card) => (
                        <NavigationCard key={card.href} card={card} t={t} />
                    ))}
                </div>
            </div>
        </section>
    );
};

type TFn = ReturnType<typeof useTranslations<"home_page.card_navigation">>;

function NavigationCard({ card, t }: { card: CardData; t: TFn }) {
    return (
        <Link
            href={card.href}
            className="group relative flex flex-col justify-between p-7 rounded-2xl border border-white/5 bg-zinc-900 hover:bg-zinc-800/80 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 hover:border-white/10"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className={`absolute top-0 left-0 h-0.5 w-0 ${card.accent} transition-all duration-500 group-hover:w-full rounded-t-2xl`} />

            <div className="relative z-10">

                <div className="flex items-start justify-between mb-5">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${card.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                        {card.icon}
                    </div>
                    <span className={`text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${card.badgeColor}`}>
                        {t(card.badgeKey as Parameters<TFn>[0])}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-white/95 transition-colors">
                    {t(card.titleKey as Parameters<TFn>[0])}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {t(card.descKey as Parameters<TFn>[0])}
                </p>
            </div>

            <div className="relative z-10 flex items-center gap-2 mt-6 text-sm font-semibold text-zinc-500 group-hover:text-white transition-colors duration-300">
                <span>{t("explore")}</span>
                <ArrowIcon />
            </div>
        </Link>
    );
}