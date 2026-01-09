import FrequentlyBoughtTogether from "./FrequentlyBoughtTogether";
import MoreProducts from "./MoreProducts";
import ProductDescription from "./ProductDescription";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import RatingAndReviews from "./RatingAndReviews";
import SimilarProducts from "./SimilarProducts";


export default function ProductDetails() {
  return (
    <div className="w-full bg-white">
      {/* Top Section: Image Gallery and Product Info */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-b border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left and Center: Image Gallery (takes 2 columns) */}
          <div className="lg:col-span-2">
            <ProductImageGallery />
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-1">
            <ProductInfo />
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Description */}
        <ProductDescription />

        {/* Rating & Reviews */}
        <RatingAndReviews />

        {/* Similar Products */}
        <SimilarProducts />

        {/* More from X Gold */}
        <MoreProducts />

        {/* Frequently Bought Together */}
        <FrequentlyBoughtTogether />
      </div>
    </div>
  )
}
