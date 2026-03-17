


export default function CityStatsCard({ label, value, icon }: { label: string; value: string; icon: string }) {

    /**
     * 
     * CityStatsCard component is used to display the statistics of the city.
     * 
     */

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[2rem] shadow-xl border border-zinc-100 dark:border-zinc-800 group hover:border-orange-500 transition-all duration-300">
            <span className="text-3xl mb-4 block">{icon}</span>
            <span className="text-xs uppercase text-zinc-400 font-black tracking-widest">
                {label}
            </span>
            <p className="text-xl md:text-2xl font-black mt-2 text-zinc-900 dark:text-white">{value}</p>
        </div>
    );
}