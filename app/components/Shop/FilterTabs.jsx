const categories = [
  "Fresh Vegetables",
  "Fresh Fruits",
  "Dry Fruits",
  "Dairy Products",
];

export default function FilterTabs() {
  return (
    <div className="flex gap-3 flex-wrap my-5">
      {categories.map((cat, i) => (
        <button
          key={i}
          className={`px-4 py-2 rounded-md text-sm font-medium 
            ${i === 0 ? "bg-[#1D81B3] text-white" : "bg-white text-gray-700 border"}
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
