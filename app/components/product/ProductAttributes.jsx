export default function ProductAttributes({ attributes, categorySchema }) {
  if (!categorySchema || !attributes) return null;

  return (
    <div className="bg-white rounded-sm border border-gray-200  p-3 md:p-4 overflow-hidden">
      <h3 className="text-gray-900 font-black text-lg mb-8 flex items-center gap-3 tracking-tight">
        <span className="w-1.5 h-6 bg-[#0784BB] rounded-full"></span>
        TECHNICAL SPECIFICATIONS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
        {categorySchema.map((field) => {
          const value = attributes[field.key]
          if (!value) return null

          return (
            <div key={field.key} className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.1em] text-gray-400 font-black">
                {field.label}
              </span>
              <span className="text-base font-bold text-gray-800 leading-tight">
                {Array.isArray(value) ? value.join(", ") : value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
