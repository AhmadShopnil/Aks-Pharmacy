import React from "react";
import { getProducts } from "@/lib/fetchApis";
import Container from "@/app/components/Common/Container";
import ProductCard from "@/app/components/Common/Cards/ProductCard/ProductCard";
import { Sparkles, ArrowRight, Zap, Star } from "lucide-react";

export const metadata = {
    title: "New Arrivals | AKS Pharmacy",
    description: "Check out the latest additions to our pharmacy. Quality medications and healthcare products.",
};

const products = [

    {
        id: 4,
        title: "Aplb – Glutathione Niacinamide Beauty Tablet 30pcs",
        img: "/images/medicine/13.jpeg",
        price: "780 ৳",
        oldPrice: "1,010 ৳",
        discount: "-23%",
        rating: 4,
    },
    {
        id: 5,
        title: "Cosrx – Advanced Snail 92 All In One Cream",
        img: "/images/medicine/14.webp",
        price: "940 ৳",
        oldPrice: "1,600 ৳",
        discount: "-47%",
        rating: 5,
    },
    {
        id: 6,
        title: "Essence – I Lo+ve Extreme Crazy Volume Mascara",
        img: "/images/medicine/15.webp",
        price: "550 ৳",
        oldPrice: "900 ৳",
        discount: "-39%",
        rating: 5,
    },
    {
        id: 7,
        title: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
        img: "/images/medicine/16.jpeg",
        price: "1,220 ৳",
        oldPrice: "1,300 ৳",
        discount: "-6%",
        rating: 5,
    },
    {
        id: 1,
        title: "Cosrx – Advanced Snail 92 All In One Cream",
        img: "/images/medicine/17.jpeg",
        price: "940 ৳",
        oldPrice: "1,600 ৳",
        discount: "-47%",
        rating: 5,
    },
    {
        id: 2,
        title: "Essence – I Lo+ve Extreme Crazy Volume Mascara",
        img: "/images/medicine/18.webp",
        price: "550 ৳",
        oldPrice: "900 ৳",
        discount: "-39%",
        rating: 5,
    },
    {
        id: 3,
        title: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
        img: "/images/medicine/19.webp",
        price: "1,220 ৳",
        oldPrice: "1,300 ৳",
        discount: "-6%",
        rating: 5,
    },
    {
        id: 8,
        title: "Aplb – Glutathione Niacinamide Beauty Tablet 30pcs",
        img: "/images/medicine/20.webp",
        price: "780 ৳",
        oldPrice: "1,010 ৳",
        discount: "-23%",
        rating: 4,
    },
    {
        id: 10,
        title: "Essence – I Lo+ve Extreme Crazy Volume Mascara",
        img: "/images/medicine/21.webp",
        price: "550 ৳",
        oldPrice: "900 ৳",
        discount: "-39%",
        rating: 5,
    },
    {
        id: 9,
        title: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
        img: "/images/medicine/22.webp",
        price: "1,220 ৳",
        oldPrice: "1,300 ৳",
        discount: "-6%",
        rating: 5,
    },
];

export default async function NewArrivalsPage() {
    // const products = await getProducts();

    // In a real scenario, we might want to filter or fetch specifically for 'new'
    // But here we'll take the first 12 products as new arrivals
    const newArrivals = products.slice(0, 12);

    return (
        <div className="bg-slate-50/30 min-h-screen  pb-4 md:pb-20">
            {/* Hero Section */}
            <div className="bg-[#0784BB] text-white pt-24 pb-32 relative overflow-hidden">
                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px] animate-pulse" />

                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4 text-emerald-300" />
                            <span>Discover the Latest</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-none">
                            New <span className="text-white">Arrivals</span>
                        </h1>
                        <p className="text-emerald-50 text-xl md:text-2xl leading-relaxed max-w-2xl">
                            Fresh stock just arrived! Explore our latest healthcare essentials,
                            wellness products, and medicinal additions carefully curated for you.
                        </p>
                    </div>
                </Container>
            </div>

            {/* Main Content */}
            <Container className="-mt-16 relative z-20">
                <div className="bg-white rounded-3xl shadow-xl  p-6 md:p-10 border border-slate-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Recently Added</h2>
                            <p className="text-slate-500 mt-1">Showing the latest {newArrivals.length} products added to our inventory.</p>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-slate-400 uppercase tracking-wider font-bold">Quick Filters:</span>
                            <button className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-semibold border border-emerald-100 transition-all hover:bg-emerald-100">Medicines</button>
                            <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg font-semibold border border-slate-100 transition-all hover:bg-slate-100">Wellness</button>
                        </div>
                    </div>

                    {newArrivals?.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
                            {newArrivals?.map((product) => (
                                <div key={product?.id} className="group h-full flex flex-col transition-all duration-300 hover:-translate-y-2">
                                    <ProductCard item={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Zap className="text-slate-300" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">No new arrivals yet</h3>
                            <p className="text-slate-500 mt-2">Check back soon for our latest restocks and new products.</p>
                            <button className="mt-8 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                                Explore All Products
                            </button>
                        </div>
                    )}

                    {/* Pagination/Load More Placeholder */}
                    <div className="mt-10 pt-4 border-t border-slate-100 text-center">
                        <button className="inline-flex items-center gap-2 px-10 py-3.5 bg-[#0784BB] text-white rounded-xl font-bold hover:bg-slate-800 transition-all group">
                            Load More
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

            </Container>
        </div>
    );
}
