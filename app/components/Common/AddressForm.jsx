
import { useState } from "react";

const AddressForm = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        address_label: "",
        customer_name: "",
        customer_phone: "",
        detailed_address: "",
        division: "",
        district: "",
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
                    placeholder="Home, Office..."
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                    value={formData.address_label}
                    onChange={e => setFormData({ ...formData, address_label: e.target.value })}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-sm font-semibold">Name</label>
                    <input
                        type="text"
                        required
                        placeholder="Enter full name"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                        value={formData.customer_name}
                        onChange={e => setFormData({ ...formData, customer_name: e.target.value })}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold">Phone</label>
                    <input
                        type="tel"
                        required
                        placeholder="01712345678"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                        value={formData.customer_phone}
                        onChange={(e) =>
                            setFormData({ ...formData, customer_phone: e.target.value })
                        }
                    />
                </div>
            </div>
            <div className="space-y-1">
                <label className="text-sm font-semibold">Detailed Address</label>
                <textarea
                    required
                    rows="2"
                    placeholder="House/Flat no, Street, Area"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                    value={formData.detailed_address}
                    onChange={e => setFormData({ ...formData, detailed_address: e.target.value })}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-sm font-semibold">Division</label>
                    <input
                        type="text"
                        placeholder="Division"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                        value={formData.division}
                        onChange={e => setFormData({ ...formData, division: e.target.value })}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold">District</label>
                    <input
                        type="text"
                        placeholder="District"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                        value={formData.district}
                        onChange={e => setFormData({ ...formData, district: e.target.value })}
                    />
                </div>
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