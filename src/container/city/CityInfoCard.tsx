
export default function CityInfoCard({ label, value }: { label: string; value: string }) {

    /**
     * CityInfoCard component is used to display the information of the city.
     * 
     */

    return (
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <span className="text-xs uppercase text-zinc-400 font-bold">
                {label}
            </span>
            <p className="text-xl font-bold mt-1">{value}</p>
        </div>
    );
}