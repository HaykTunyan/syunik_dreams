"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Import images statically
import TshirtFront from "#/images/Khustup-front.jpg";
import TshirtBack from "#/images/Khustup_back.jpg";



const PRODUCT = {
    id: "syunik-tee-001",
    price: 12000,
    sizes: ["S", "M", "L", "XL"],
    // Use imported images
    images: [TshirtFront, TshirtBack]
};

export default function ProductPage() {

    /**
     * 
     * Product Page Component
     * 
     * @returns {JSX.Element}
     * 
     */

    const t = useTranslations('product');


    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleAddToCart = () => {
        setIsSuccessModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-orange-200 dark:selection:bg-orange-900 overflow-x-hidden">
            <Header />

            <main className="pt-24 pb-20 px-6  max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column: Image Gallery */}
                    <div className="space-y-6">
                        {/* Main Image */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800 group">
                            <Image
                                src={PRODUCT.images[currentImageIndex]}
                                alt={`${t('title')} view ${currentImageIndex + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {PRODUCT.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`relative w-24 aspect-[4/5] flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === idx
                                        ? "border-orange-600 ring-2 ring-orange-100 dark:ring-orange-900"
                                        : "border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="flex flex-col justify-center space-y-8 lg:py-10">
                        <div className="space-y-4">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold tracking-wider uppercase">
                                {t('madeBy')}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                                {t('title')}
                            </h1>
                            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">
                                {t('subtitle')}
                            </p>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                                {PRODUCT.price.toLocaleString()} ֏
                            </span>
                            <span className="text-sm text-zinc-500 font-medium uppercase tracking-wide">
                                {t('price_label')}
                            </span>
                        </div>

                        <div className="prose prose-zinc dark:prose-invert">
                            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                                {t('description')}
                            </p>
                        </div>

                        <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

                        {/* Size Selector */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                                    {t('select_size')}
                                </span>
                                <span className="text-sm text-orange-600 cursor-pointer hover:underline">
                                    {t('size_chart')}
                                </span>
                            </div>

                            <div className="grid grid-cols-4 gap-3">
                                {PRODUCT.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`h-14 rounded-xl font-semibold transition-all duration-200 border-2 ${selectedSize === size
                                            ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white shadow-lg scale-105"
                                            : "bg-transparent text-zinc-600 border-zinc-200 hover:border-zinc-400 dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-500 italic">
                                {t('size_note')}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 space-y-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedSize}
                                className="w-full bg-orange-600 hover:bg-orange-700 active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:hover:bg-orange-600 text-white text-lg font-bold py-5 rounded-2xl shadow-xl hover:shadow-orange-600/25 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <span>{t('order_now')}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </button>

                            <div className="text-center">
                                <p className="text-xs text-zinc-400">
                                    {t('shipping_note')}
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="mt-20" />

                {/* Product Details Section */}

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8 items-start">
                    {/* Left Column: Info */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">
                            {t('details_title')}
                        </h2>

                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li>{t('bullet_1')}</li>
                            <li>{t('bullet_2')}</li>
                            <li>{t('bullet_3')}</li>
                            <li>{t('bullet_4')}</li>
                            <li>{t('bullet_5')}</li>
                        </ul>
                    </div>
                </div>
            </main>

            {/* Success Modal */}
            {isSuccessModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 animate-in fade-in"
                        onClick={() => setIsSuccessModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl border border-zinc-100 dark:border-zinc-800 transition-all duration-500 animate-in zoom-in-95 fade-in slide-in-from-bottom-10">
                        <div className="flex flex-col items-center text-center">
                            {/* Success Icon */}
                            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-8">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 text-orange-600 dark:text-orange-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </div>

                            <h2 className="text-3xl font-black uppercase text-zinc-900 dark:text-white mb-4">
                                {t('success_modal_title')}
                            </h2>

                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl w-full mb-8 border border-zinc-100 dark:border-zinc-800">
                                <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] tracking-widest mb-2">
                                    {t('added_to_cart')}
                                </p>
                                <p className="text-xl font-black text-zinc-900 dark:text-white">
                                    {t('title')} — {selectedSize}
                                </p>
                            </div>

                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-10 flex items-center gap-3">
                                <span className="text-2xl">🚚</span>
                                <span className="font-medium text-lg">{t('delivery_info')}</span>
                            </p>

                            <button
                                onClick={() => setIsSuccessModalOpen(false)}
                                className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-5 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl"
                            >
                                {t('success_close')}
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <Footer />
        </div>
    );
}
