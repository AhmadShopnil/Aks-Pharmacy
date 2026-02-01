
import { useState } from "react";

const AddressForm = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        label: "",
        name: "",
        phone: "+880",
        address: "",
        city: "",
        // zip: "",
        country: "Bangladesh",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 ">
            {/* Address Label */}
            <div className="space-y-1">
                <label className="text-sm font-semibold">Address Label</label>
                <input
                    type="text"
                    required
                    placeholder="Home, Office..."
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                    value={formData.label}
                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-sm font-semibold">Name</label>
                    <input
                        type="text"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold">Phone</label>
                    <div className="flex">
                        <span className="px-3 flex items-center border border-r-0 rounded-l-lg bg-gray-100 text-gray-600">
                            +880
                        </span>
                        <input
                            type="tel"
                            required
                            className="w-full p-2 border rounded-r-lg focus:ring-2 focus:ring-[#1d81b3]"
                            placeholder="1XXXXXXXXX"
                            value={formData.phone.replace("+880", "")}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: "+880" + e.target.value })
                            }
                        />
                    </div>

                </div>
            </div>
            <div className="space-y-1">
                <label className="text-sm font-semibold">Detailed Address</label>
                <textarea
                    required
                    rows="2"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                    <label className="text-sm font-semibold">City</label>
                    <input
                        type="text"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                    />
                </div>
                {/* <div className="space-y-1">
                    <label className="text-sm font-semibold">ZIP</label>
                    <input
                        type="text"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                        value={formData.zip}
                        onChange={e => setFormData({ ...formData, zip: e.target.value })}
                    />
                </div> */}
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 py-2 bg-[#1d81b3] text-white rounded-lg hover:bg-[#166a94]"
                >
                    Save Address
                </button>
            </div>
        </form>
    );
}

export default AddressForm;