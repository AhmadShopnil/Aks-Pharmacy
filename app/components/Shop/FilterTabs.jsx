const categories = [
  "Default",

  "Newest",
];

export default function FilterTabs() {
  return (
    <div className=" flex gap-4 items-center  mb-4">
      <span className="font-semibold">Sort by :</span>
      <div className="flex gap-3 flex-wrap ">
        {categories.map((cat, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-md text-sm font-medium  cursor-pointer hover:bg-[#1D81B3] hover:text-white
            ${i === 0 ? "bg-[#1D81B3] text-white" : "bg-white text-gray-700 border"}
          `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
