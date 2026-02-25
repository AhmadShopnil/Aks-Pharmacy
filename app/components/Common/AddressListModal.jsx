"use client";
import React, { useState } from "react";
import { X, MapPin, Plus, CheckCircle, Trash2 } from "lucide-react";
import AddressForm from "./AddressForm";

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
                                                        <span className="font-bold">{address.address_label || "Address"}</span>
                                                        {address.is_default && (
                                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                                                Default
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 font-medium">{address.customer_name} | {address.customer_phone}</p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {address.detailed_address} {address.district ? `, ${address.district}` : ""} {address.division ? `, ${address.division}` : ""}
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




export default AddressListModal;