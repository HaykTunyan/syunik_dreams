"use client";

import { useState } from 'react';
import DateRangePicker from '@/components/DateRangePicker';
import KapanHotels from '@/components/KapanHotels';
import GorisHotels from '@/components/GorisHotels';
import SisianHotels from '@/components/SisianHotels';
import AgarakHotels from '@/components/AgarakHotels';
import MeghriHotels from '@/components/MeghriHotels';
import QajaranHotels from '@/components/QajaranHotels';
import { useTranslations } from 'next-intl';

interface CityBookingFlowProps {
    city: string;
    cityLabel: string;
    onClose: () => void;
}

export default function CityBookingFlow({ city, cityLabel, onClose }: CityBookingFlowProps) {
    const [step, setStep] = useState(1);
    
    // Step 2 state
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
    const isComplete = startDate !== null && endDate !== null;

    // Step 3 state
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: ''
    });

    const isFormComplete = formData.name && formData.surname && formData.phone && formData.email;

    const fmtDate = (d: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    };

    function renderHotels() {
        switch (city) {
            case 'kapan': return <KapanHotels />;
            case 'goris': return <GorisHotels />;
            case 'sisian': return <SisianHotels />;
            case 'agarak': return <AgarakHotels />;
            case 'meghri': return <MeghriHotels />;
            case 'kajaran': return <QajaranHotels />;
            default: return <p className="text-zinc-500 p-8 text-center">No hotels found for this city.</p>;
        }
    }

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-5xl h-[90vh] flex flex-col bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-white/10 shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Trip to {cityLabel}</h2>
                        <div className="flex items-center gap-2 mt-2 text-sm font-medium">
                            <span className={step >= 1 ? 'text-orange-500' : 'text-zinc-400'}>1. Explore</span>
                            <span className="text-zinc-300 dark:text-zinc-700">→</span>
                            <span className={step >= 2 ? 'text-orange-500' : 'text-zinc-400'}>2. Dates</span>
                            <span className="text-zinc-300 dark:text-zinc-700">→</span>
                            <span className={step >= 3 ? 'text-orange-500' : 'text-zinc-400'}>3. Details</span>
                            <span className="text-zinc-300 dark:text-zinc-700">→</span>
                            <span className={step >= 4 ? 'text-orange-500' : 'text-zinc-400'}>4. Confirm</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors bg-zinc-100 dark:bg-white/5 rounded-full">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar">
                    {step === 1 && (
                        <div className="animate-fade-in-up space-y-12">
                            <div>
                                <h3 className="text-3xl font-black mb-6 text-zinc-900 dark:text-white">Where to Stay in {cityLabel}</h3>
                                <div className="border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-zinc-900">
                                    {renderHotels()}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in-up max-w-xl mx-auto py-10">
                            <h3 className="text-3xl font-black mb-2 text-zinc-900 dark:text-white">When are you going?</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8">Select your check-in and check-out dates for {cityLabel}.</p>
                            
                            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 shadow-xl">
                                <DateRangePicker
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={setDateRange}
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in-up max-w-xl mx-auto py-10">
                            <h3 className="text-3xl font-black mb-2 text-zinc-900 dark:text-white">Guest Details</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8">Please enter your information to secure the booking.</p>
                            
                            <div className="space-y-4 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-xl">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">First Name</label>
                                        <input 
                                            type="text" 
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Last Name</label>
                                        <input 
                                            type="text" 
                                            value={formData.surname}
                                            onChange={e => setFormData({...formData, surname: e.target.value})}
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                        placeholder="+374 XX XXX XXX"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto animate-fade-in-up py-20">
                            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-4xl font-black mb-4 text-zinc-900 dark:text-white">Booking Confirmed!</h3>
                            <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
                                Thank you, <span className="font-bold text-zinc-900 dark:text-white">{formData.name}</span>. Your trip to <span className="font-bold text-orange-500">{cityLabel}</span> from <span className="font-bold text-zinc-900 dark:text-white">{fmtDate(startDate!)}</span> to <span className="font-bold text-zinc-900 dark:text-white">{fmtDate(endDate!)}</span> has been securely booked.
                            </p>
                            <button onClick={onClose} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-lg shadow-orange-500/30">
                                Back to Trips
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                {step < 4 && (
                    <div className="p-6 border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shrink-0 flex items-center justify-between shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
                        {step > 1 ? (
                            <button 
                                onClick={() => setStep(step - 1)}
                                className="px-6 py-3 font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                                Back
                            </button>
                        ) : <div></div>}

                        {step === 1 && (
                            <button 
                                onClick={() => setStep(2)}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md shadow-orange-500/20 hover:-translate-y-0.5"
                            >
                                Continue to Dates
                            </button>
                        )}
                        {step === 2 && (
                            <button 
                                onClick={() => setStep(3)}
                                disabled={!isComplete}
                                className={`px-8 py-3 rounded-xl font-bold transition-all ${isComplete ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'}`}
                            >
                                Continue to Details
                            </button>
                        )}
                        {step === 3 && (
                            <button 
                                onClick={() => setStep(4)}
                                disabled={!isFormComplete}
                                className={`px-8 py-3 rounded-xl font-bold transition-all ${isFormComplete ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'}`}
                            >
                                Confirm Booking
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
