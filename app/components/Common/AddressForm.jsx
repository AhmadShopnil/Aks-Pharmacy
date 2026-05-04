
import { useState, useEffect } from "react";

const AddressForm = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        address_label: "",
        customer_name: "",
        customer_phone: "",
        detailed_address: "",
        division: "",
        district: "",
    });

    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        fetch('/api/proxy/api/v1/locations/divisions?per_page=100')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setDivisions(data.data);
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (formData.division && divisions.length > 0) {
            const selectedDiv = divisions.find(d => d.name === formData.division);
            if (selectedDiv) {
                fetch(`/api/proxy/api/v1/locations/districts?division_id=${selectedDiv.id}&per_page=100`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            setDistricts(data.data);
                        }
                    })
                    .catch(console.error);
            } else {
                setDistricts([]);
            }
        } else {
            setDistricts([]);
        }
    }, [formData.division, divisions]);

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
                    <select
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3] outline-none"
                        value={formData.division}
                        onChange={(e) => {
                            setFormData({ ...formData, division: e.target.value, district: "" })
                        }}
                    >
                        <option value="" disabled>Select Division</option>
                        {divisions.map((div) => (
                            <option key={div.id} value={div.name}>{div.name}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold">District</label>
                    <select
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3] outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        value={formData.district}
                        onChange={(e) =>
                            setFormData({ ...formData, district: e.target.value })
                        }
                        disabled={!formData.division || districts.length === 0}
                    >
                        <option value="" disabled>Select District</option>
                        {districts.map((dist) => (
                            <option key={dist.id} value={dist.name}>{dist.name}</option>
                        ))}
                    </select>
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