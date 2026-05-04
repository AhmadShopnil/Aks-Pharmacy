import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

export default function CategoryTabs({ childCategories }) {
  if (!childCategories || childCategories.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
      {childCategories.map((cat) => (
        <Link
          key={cat.id}
          href={`/products/${cat?.slug}`}
          className="group flex flex-col border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden bg-white"
        >
          {/* Image Wrapper */}
          <div className="w-full aspect-[1/1]  relative bg-gray-50 flex items-center justify-center overflow-hidden group-hover:bg-gray-100 transition-colors">
            {cat?.icon ? (
              <Image
                src={cat.icon}
                alt={cat.name}
                fill
                className="object-contain  transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <ImageIcon className="w-6 h-6 md:w-8 md:h-8 mb-1 opacity-50" />
                <span className="text-[10px] md:text-xs">No Image</span>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="bg-[#0784BB] text-white p-2 flex-grow flex items-center justify-center transition-colors group-hover:bg-[#066a96]">
            <p className="text-center text-[11px] sm:text-xs md:text-sm font-medium line-clamp-2 leading-tight">
              {cat.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}