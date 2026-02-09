import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Medical Devices",
    image: "/images/items/24.webp",
  },
  {
    id: 2,
    name: "Medical Devices",
    image: "/images/items/25.webp",
  },
   {
    id: 4,
    name: "Medical Devices",
    image: "/images/items/26.webp",
  },
  {
    id: 3,
    name: "Medical Devices",
    image: "/images/items/27.webp",
  },
 
    {
    id: 5,
    name: "Medical Devices",
    image: "/images/items/28.webp",
  },
];

export default function CategoryTabs() {
  return (
    <div className="flex flex-wrap gap-3 ">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/shop/${cat.id}`}
          className="border rounded-lg  hover:shadow-md transition w-[100px] h-auto md:w-[220px]  "
        >
           <Image
            src={cat.image}
            alt={cat.name}
            width={220}    
            height={200}   
            className="w-full h-[85px] md:h-[200px]  rounded-t-lg"
          />
          {/* <Image
            src={cat.image}
            alt={cat.name}
            width={220}    
            height={200}   
            className="object-contain rounded-t-lg"
          /> */}

          <p className="bg-[#0784BB] text-white py-1  text-center text-[11px] md:text-sm font-medium rounded-b-lg">
            {cat.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
