"use client";

import { useState } from "react";
import Image from "next/image";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Import images statically
import TshirtFront from "#/images/images/Khustup-front.jpg";
import TshirtBack from "#/images/images/Khustup_back.jpg";



const PRODUCT = {
    id: "syunik-tee-001",
    title: "Խուստուփ լեռան ոգին",
    subtitle: "Սյունիքի երազանքների հավաքածու",
    price: 12000,
    description:
        "Զգացեք Խուստուփ լեռան վեհաշուք ոգին։ Այս բացառիկ շապիկը լեգենդար գագաթի ձեռքով նկարազարդում է, որը ստեղծվել է նրանց համար, ովքեր իրենց սրտում են կրում Սյունիքը։ Պատրաստված է 100% բարձրորակ բամբակից՝ առավելագույն հարմարավետության և դիմացկունության համար։",
    madeBy: "Նախագծված և պատրաստված է սեփականատիրոջ կողմից Սյունիքում",
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


    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size first!");
            return;
        }
        alert(`Added ${PRODUCT.title} (Size: ${selectedSize}) to cart!`);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-orange-200 dark:selection:bg-orange-900">
            <Header />

            <main className="pt-24 pb-20 px-6  max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column: Image Gallery */}
                    <div className="space-y-6">
                        {/* Main Image */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800 group">
                            <Image
                                src={PRODUCT.images[currentImageIndex]}
                                alt={`${PRODUCT.title} view ${currentImageIndex + 1}`}
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
                                {PRODUCT.madeBy}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                                {PRODUCT.title}
                            </h1>
                            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">
                                {PRODUCT.subtitle}
                            </p>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                                {PRODUCT.price.toLocaleString()} ֏
                            </span>
                            <span className="text-sm text-zinc-500 font-medium uppercase tracking-wide">
                                AMD / Piece
                            </span>
                        </div>

                        <div className="prose prose-zinc dark:prose-invert">
                            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                                {PRODUCT.description}
                            </p>
                        </div>

                        <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

                        {/* Size Selector */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                                    Ընտրեք չափը
                                </span>
                                <span className="text-sm text-orange-600 cursor-pointer hover:underline">
                                    Չափերի աղյուսակ
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
                                *Մենք ունենք բոլոր չափսերը ձեզ համար։.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 space-y-4">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white text-lg font-bold py-5 rounded-2xl shadow-xl hover:shadow-orange-600/25 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <span>Order Now</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </button>

                            <div className="text-center">
                                <p className="text-xs text-zinc-400">
                                    Անվտանգ վճարում և արագ առաքում ամբողջ Հայաստանում
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
                            Ապրանքի մանրամասներ
                        </h2>

                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li>100% բարձրորակ բամբակ՝ հարմարավետության և ամրության համար</li>
                            <li>Ձեռքով նկարված Խուստուփ լեռան բացառիկ պատկերազարդում</li>
                            <li>Հասանելի չափսեր՝ S, M, L, XL</li>
                            <li>Լվացվում է մեքենայով և հեշտ է խնամել</li>
                            <li>Կատարյալ նվեր բնության և արկածների սիրահարների համար</li>
                        </ul>
                    </div>

                    {/* Right Column: Detail Image */}
                    {/* <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 order-1 lg:order-2">
                        <Image
                            src={TshirtDetail}
                            alt="Product Detail View"
                            fill
                            className="object-cover"
                            sizes="(max-width: 600px) 100vw, 70vw"
                        />
                    </div> */}
                </div>






            </main>


            <Footer />
        </div>
    );
}
