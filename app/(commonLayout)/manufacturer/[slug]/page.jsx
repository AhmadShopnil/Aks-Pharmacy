import ManufacturerProductsPage from "@/app/components/Generic/ManufacturerProductsPage";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const displayName = decodedSlug
        .split(/[\s-]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    return {
        title: `${displayName} Products | AKS Pharmacy`,
        description: `Browse all ${displayName} products available at AKS Pharmacy. Find the best prices and quality medicines.`,
    };
}

export default async function ManufacturerPage({ params }) {
    const { slug } = await params;
    return <ManufacturerProductsPage manufacturerSlug={slug} />;
}
