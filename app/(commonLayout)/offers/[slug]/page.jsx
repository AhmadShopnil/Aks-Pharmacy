import React from "react";
import Container from "@/app/components/Common/Container";
import OfferProductsClient from "./OfferProductsClient";
import { getSingleOfferProducts } from "@/lib/fetchApis";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    // Replace hyphens with spaces and capitalize words for a better title
    const decodedSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return {
        title: `${decodedSlug} Offer | AKS Pharmacy`,
        description: `Explore exclusive deals and products for the ${decodedSlug} offer at AKS Pharmacy.`,
    };
}

export default async function OfferProductsPage({ params }) {
    const { slug } = await params;
    const responseData = await getSingleOfferProducts(slug);

    const offerDetails = responseData?.offer || null;
    const offerProducts = responseData?.data || [];
    const meta = responseData?.pagination || {};
    const lastPage = meta.last_page || 1;
    const total = meta.total || 0;

    return (
        <div className="bg-slate-50/30 min-h-screen pb-4 md:pb-20">
            {/* Hero Section */}
            <div className="bg-[#0784BB] text-white pt-24 pb-32 relative overflow-hidden">
                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px] animate-pulse" />

                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-none capitalize">

                            {offerDetails?.name || <span> Special <span className="text-emerald-300">Offers</span></span>}

                        </h1>
                        <p className="text-emerald-50 text-xl md:text-2xl leading-relaxed max-w-2xl">
                            {offerDetails?.description ? offerDetails.description : `Explore the amazing ${total} products selected for this special deal.`}
                        </p>
                    </div>
                </Container>
            </div>

            {/* Main Content */}
            <Container className="-mt-16 relative z-20">
                <OfferProductsClient slug={slug} />
            </Container>
        </div>
    );
}
