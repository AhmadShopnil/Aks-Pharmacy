import GenericProductsPage from "@/app/components/Generic/GenericProductsPage";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const genericName = decodeURIComponent(slug)
        .split(/[\s-]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    return {
        title: `${genericName} Products | AKS Pharmacy`,
        description: `Browse all ${genericName} products available at AKS Pharmacy. Find the best prices and quality medicines.`,
    };
}

export default async function GenericPage({ params }) {
    const { slug } = await params;
    return <GenericProductsPage genericSlug={slug} />;
}
