"use client";
import React, { useState, useEffect } from "react";
import { X, MapPin, User, Phone, Home } from "lucide-react";

const AddressModal = ({ isOpen, onClose, onSave, editAddress = null }) => {
    const [formData, setFormData] = useState({
        label: "",
        name: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        country: "Bangladesh",
    });

    useEffect(() => {
        if (editAddress) {
            setFormData(editAddress);
        } else {
            setFormData({
                label: "",
                name: "",
                phone: "",
                address: "",
                city: "",
                zip: "",
                country: "Bangladesh",
            });
        }
    }, [editAddress, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p10">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-2xl font-bold">
                            {editAddress ? "Edit Address" : "Add New Address"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Address Label */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold flex items-center gap-2">
                                <Home className="w-4 h-4 text-zinc-400" />
                                Address Label
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Home, Office, etc."
                                className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-[#1d81b3] outline-none transition-all"
                                value={formData.label}
                                onChange={(e) =>
                                    setFormData({ ...formData, label: e.target.value })
                                }
                                required
                            />
                        </div>

                        {/* Name and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <User className="w-4 h-4 text-zinc-400" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-[#1d81b3] outline-none transition-all"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-zinc-400" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+880 1712 345678"
                                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-[#1d81b3] outline-none transition-all"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* Full Address */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-zinc-400" />
                                Street Address
                            </label>
                            <textarea
                                rows="3"
                                placeholder="House/Flat no, Street, Area"
                                className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-[#1d81b3] outline-none transition-all resize-none"
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({ ...formData, address: e.target.value })
                                }
                                required
                            />
                        </div>

                        {/* City, ZIP, Country */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">City</label>
                                <input
                                    type="text"
                                    placeholder="City"
                                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-[#1d81b3] outline-none transition-all"
                                    value={formData.city}
                                    onChange={(e) =>
                                        setFormData({ ...formData, city: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">ZIP Code</label>
                                <input
                                    type="text"
                                    placeholder="ZIP"
                                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-[#1d81b3] outline-none transition-all"
                                    value={formData.zip}
                                    onChange={(e) =>
                                        setFormData({ ...formData, zip: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Country</label>
                                <input
                                    type="text"
                                    placeholder="Country"
                                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-[#1d81b3] outline-none transition-all"
                                    value={formData.country}
                                    onChange={(e) =>
                                        setFormData({ ...formData, country: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-[#1d81b3] text-white rounded-lg font-semibold hover:bg-[#166a94] transition shadow-lg"
                            >
                                {editAddress ? "Update Address" : "Add Address"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddressModal;
