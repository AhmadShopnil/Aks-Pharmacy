"use client";
import React, { useState } from "react";
import { X, MapPin, Plus, CheckCircle, Trash2 } from "lucide-react";

const AddressListModal = ({ isOpen, onClose, addresses, onSelect, onAddNew, onDelete }) => {
    const [isAddMode, setIsAddMode] = useState(false);

    if (!isOpen) return null;

    const handleAddressAdded = (data) => {
        onAddNew(data);
        setIsAddMode(false);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                        <h2 className="text-xl font-bold">
                            {isAddMode ? "Add New Address" : "Select Address"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6">
                        {isAddMode ? (
                            <AddressForm
                                onSave={handleAddressAdded}
                                onCancel={() => setIsAddMode(false)}
                            />
                        ) : (
                            <div className="space-y-4 ">
                                {/* Add New Button */}
                                <button
                                    onClick={() => setIsAddMode(true)}
                                    className="w-full py-3 border-2 border-dashed border-[#1d81b3] text-[#1d81b3] rounded-lg font-semibold hover:bg-teal-50 transition flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add New Address
                                </button>

                                {/* Address List */}
                                <div className="space-y-3">
                                    {addresses.map((address) => (
                                        <div
                                            key={address.id}
                                            onClick={() => onSelect(address)}
                                            className="p-4 border border-zinc-200 rounded-lg hover:border-[#1d81b3] cursor-pointer transition relative group"
                                        >
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold">{address.label}</span>
                                                        {address.isDefault && (
                                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                                                Default
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 font-medium">{address.name} | {address.phone}</p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {address.address}, {address.city} - {address.zip}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {addresses.length === 0 && (
                                        <p className="text-center text-gray-500 py-4">No addresses found.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};



import { Home, User, Phone } from "lucide-react";

const AddressForm = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        label: "", name: "", phone: "", address: "", city: "", zip: "", country: "Bangladesh",
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
            <div className="grid grid-cols-2 gap-3">
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
                    <input
                        type="tel"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
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
            <div className="grid grid-cols-2 gap-3">
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
                <div className="space-y-1">
                    <label className="text-sm font-semibold">ZIP</label>
                    <input
                        type="text"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1d81b3]"
                        value={formData.zip}
                        onChange={e => setFormData({ ...formData, zip: e.target.value })}
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

export default AddressListModal;
