export default function ProductAttributes({ attributes, categorySchema }) {
  // if (!attributes) return null;

  // console.log("attributes", attributes)
  return (
    <div className="bg-white rounded-sm border border-gray-200  p-3 md:p-4 overflow-hidden">
      <h3 className="text-gray-900 font-black text-lg mb-8 flex items-center gap-3 tracking-tight">
        <span className="w-1.5 h-6 bg-[#0784BB] rounded-full"></span>
        TECHNICAL SPECIFICATIONS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
        {attributes?.map((item, id) => {
          return (
            <div key={id} className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.1em] text-gray-400 font-black">
                {item?.attribute_name}
              </span>
              <span className="text-base font-bold text-gray-800 leading-tight">
                {item?.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
