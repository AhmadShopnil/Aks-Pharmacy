"use client";
import React, { useState, useEffect } from "react";
import { X, MapPin, User, Phone, Home } from "lucide-react";

const AddressModal = ({ isOpen, onClose, onSave, editAddress = null }) => {
    const [formData, setFormData] = useState({
        address_label: "",
        customer_name: "",
        customer_phone: "",
        detailed_address: "",
        division: "",
        district: "",
        is_default: false,
    });

    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetch('/api/proxy/api/v1/locations/divisions?per_page=100')
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setDivisions(data.data);
                    }
                })
                .catch(console.error);
        }
    }, [isOpen]);

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

    useEffect(() => {
        if (editAddress) {
            setFormData({
                address_label: editAddress.address_label || "",
                customer_name: editAddress.customer_name || "",
                customer_phone: editAddress.customer_phone || "",
                detailed_address: editAddress.detailed_address || "",
                division: editAddress.division || "",
                district: editAddress.district || "",
                is_default: editAddress.is_default || false,
            });
        } else {
            setFormData({
                address_label: "",
                customer_name: "",
                customer_phone: "",
                detailed_address: "",
                division: "",
                district: "",
                is_default: false,
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
                                value={formData.address_label}
                                onChange={(e) =>
                                    setFormData({ ...formData, address_label: e.target.value })
                                }
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
                                    value={formData.customer_name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, customer_name: e.target.value })
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
                                    placeholder="01712345678"
                                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-[#1d81b3] outline-none transition-all"
                                    value={formData.customer_phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, customer_phone: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* Full Address */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-zinc-400" />
                                Detailed Address
                            </label>
                            <textarea
                                rows="3"
                                placeholder="House/Flat no, Street, Area"
                                className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-[#1d81b3] outline-none transition-all resize-none"
                                value={formData.detailed_address}
                                onChange={(e) =>
                                    setFormData({ ...formData, detailed_address: e.target.value })
                                }
                                required
                            />
                        </div>

                        {/* Division and District */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Division</label>
                                <select
                                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-[#1d81b3] outline-none transition-all"
                                    value={formData.division}
                                    onChange={(e) => {
                                        setFormData({ ...formData, division: e.target.value, district: "" })
                                    }}
                                    required
                                >
                                    <option value="" disabled>Select Division</option>
                                    {divisions.map((div) => (
                                        <option key={div.id} value={div.name}>{div.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">District</label>
                                <select
                                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-[#1d81b3] outline-none transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                                    value={formData.district}
                                    onChange={(e) =>
                                        setFormData({ ...formData, district: e.target.value })
                                    }
                                    disabled={!formData.division || districts.length === 0}
                                    required
                                >
                                    <option value="" disabled>Select District</option>
                                    {districts.map((dist) => (
                                        <option key={dist.id} value={dist.name}>{dist.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Default Checkbox */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_default"
                                checked={formData.is_default}
                                onChange={(e) =>
                                    setFormData({ ...formData, is_default: e.target.checked })
                                }
                                className="w-4 h-4 text-[#1d81b3] border-zinc-300 rounded focus:ring-[#1d81b3]"
                            />
                            <label htmlFor="is_default" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Set as default address
                            </label>
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
