import React from "react";
import Container from "@/app/components/Common/Container";
import NewArrivalsClient from "./NewArrivalsClient";

export const metadata = {
    title: "New Arrivals | AKS Pharmacy",
    description: "Check out the latest additions to our pharmacy. Quality medications and healthcare products.",
};

export default function NewArrivalsPage() {
    return (
        <div className="bg-slate-50/30 min-h-screen pb-4 md:pb-20">
            {/* Hero Section */}
            <div className="bg-[#0784BB] text-white pt-24 pb-32 relative overflow-hidden">
                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px] animate-pulse" />

                <Container className="relative z-10">
                    <div className="max-w-3xl">
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
                <NewArrivalsClient />
            </Container>
        </div>
    );
}
