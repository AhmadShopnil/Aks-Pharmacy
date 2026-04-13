import { CollapsibleFilter } from "./CollapsibleFilter";

export default function FilterSidebar() {
  return (
    <div className="bg-white space-y-4">

      <CollapsibleFilter title="Price Range">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full border px-2 py-1 rounded"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full border px-2 py-1 rounded"
          />
        </div>
      </CollapsibleFilter>

      {/* <CollapsibleFilter title="Delivery Time">
        <div className="space-y-1 text-sm">
          <label className="flex gap-2">
            <input type="checkbox" /> 1–2 hours
          </label>
          <label className="flex gap-2">
            <input type="checkbox" /> 2–4 hours
          </label>
        </div>
      </CollapsibleFilter> */}

      {/* <CollapsibleFilter title="Category">
        <div className="space-y-1 text-sm">
          <label className="flex gap-2"><input type="checkbox" /> Vegetables</label>
          <label className="flex gap-2"><input type="checkbox" /> Fruits</label>
          <label className="flex gap-2"><input type="checkbox" /> Dry Fruits</label>
        </div>
      </CollapsibleFilter> */}

      {/* <CollapsibleFilter title="Weight">
        <div className="space-y-1 text-sm">
          <label className="flex gap-2"><input type="checkbox" /> 500g</label>
          <label className="flex gap-2"><input type="checkbox" /> 1kg</label>
        </div>
      </CollapsibleFilter> */}

      <CollapsibleFilter title="Free Shipping">
        <div className="space-y-1 text-sm">
          <label className="flex gap-2"><input type="checkbox" /> Yes</label>
          <label className="flex gap-2"><input type="checkbox" /> No</label>
        </div>
      </CollapsibleFilter>

    </div>
  );
}
