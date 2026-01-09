export default function FilterSidebar() {
  return (
    <div className="bg-white   space-y-6">
      {/* Price Range */}
      <div className="border p-4 rounded-md">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" className="w-full border px-2 py-1 rounded" />
          <input type="number" placeholder="Max" className="w-full border px-2 py-1 rounded" />
        </div>
      </div>

      {/* Delivery Time */}
      <div className="border p-4 rounded-md">
        <h3 className="font-semibold mb-2">Delivery Time</h3>
        <div className="space-y-1 text-sm">
          <label className="flex gap-2">
            <input type="checkbox" /> 1–2 hours
          </label>
          <label className="flex gap-2">
            <input type="checkbox" /> 2–4 hours
          </label>
        </div>
      </div>

      {/* Category */}
      <div className="border p-4 rounded-md">
        <h3 className="font-semibold mb-2">Category</h3>
        <div className="space-y-1 text-sm">
          <label className="flex gap-2"><input type="checkbox" /> Vegetables</label>
          <label className="flex gap-2"><input type="checkbox" /> Fruits</label>
          <label className="flex gap-2"><input type="checkbox" /> Dry Fruits</label>
        </div>
      </div>

      {/* Weight */}
      <div className="border p-4 rounded-md">
        <h3 className="font-semibold mb-2">Weight</h3>
        <div className="space-y-1 text-sm">
          <label className="flex gap-2"><input type="checkbox" /> 500g</label>
          <label className="flex gap-2"><input type="checkbox" /> 1kg</label>
        </div>
      </div>
       {/* Free Shiping */}
      <div className="border p-4 rounded-md">
        <h3 className="font-semibold mb-2">Free Shipping</h3>
        <div className="space-y-1 text-sm">
          <label className="flex gap-2"><input type="checkbox" /> Yes</label>
          <label className="flex gap-2"><input type="checkbox" /> No</label>
        </div>
      </div>
    </div>
  );
}
