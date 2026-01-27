
import { Footer } from "@/components/footer";

// Import Image

import { HistoryHeroSection } from "@/container/history/heroSection";
import { HistoryKingdomSection } from "@/container/history/kingdomSection";
import { HistoryWarSection } from "@/container/history/warSection";
import { HistoryNzhdehSection } from "@/container/history/nzhdehSection";
import { HistoryCultoreSection } from "@/container/history/cultoreSection";

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


