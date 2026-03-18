import { Footer } from "@/components/footer";
import { HistoryHeroSection } from "@/container/history/heroSection";
import { HistoryKingdomSection } from "@/container/history/kingdomSection";
import { HistoryWarSection } from "@/container/history/warSection";
import { HistoryNzhdehSection } from "@/container/history/nzhdehSection";
import { HistoryCultoreSection } from "@/container/history/cultoreSection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CardNavigation } from "@/container/home/cardNavigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {

    /**
     * 
     * generateMetadata function is used to generate the metadata for the history page.
     * 
     */

    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'header' });

    return {
        title: t('history'),
        openGraph: {
            title: `${t('history')} | Syunik Dreams`,
            type: "article",
        }
    };
}

export default function HistoryPage() {

    /**
     * 
     * History Page Component
     * 
     * @returns {JSX.Element}
     */

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-orange-500 selection:text-white">

            {/* Hero Section */}
            <HistoryHeroSection />

            {/* Card Navigation */}
            <CardNavigation />

            {/* Kingdom Section */}
            <HistoryKingdomSection />

            {/* War Section */}
            <HistoryWarSection />

            {/* Garegin Nzhdeh Section */}
            <HistoryNzhdehSection />

            {/* Culture Section */}
            <HistoryCultoreSection />

            {/* Footer */}
            <Footer />
        </main>
    );
}


