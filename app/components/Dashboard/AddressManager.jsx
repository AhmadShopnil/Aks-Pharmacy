"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus, MapPin, Edit2, Trash2, CheckCircle } from "lucide-react";
import {
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from "@/lib/redux/features/user/userSlice";
import AddressModal from "@/app/components/Common/AddressModal";

const AddressManager = () => {
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.user.addresses);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const handleAdd = () => {
        setEditingAddress(null);
        setIsModalOpen(true);
    };

    const handleEdit = (address) => {
        setEditingAddress(address);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this address?")) {
            dispatch(deleteAddress(id));
        }
    };

    const handleSetDefault = (id) => {
        dispatch(setDefaultAddress(id));
    };

    const handleSave = (data) => {
        if (editingAddress) {
            dispatch(updateAddress({ ...data, id: editingAddress.id }));
        } else {
            dispatch(addAddress(data));
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Addresses</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1D81B3] text-white rounded-lg hover:bg-[#166a94] transition shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    Add New Address
                </button>
            </div>

            {/* Address Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className={`relative p-6 rounded-xl border-2 transition-all ${address.isDefault
                                ? "border-[#1D81B3] bg-blue-50/50 dark:bg-blue-900/10"
                                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                            } bg-white dark:bg-zinc-900 group`}
                    >
                        {/* Default Badge */}
                        {address.isDefault && (
                            <div className="absolute -top-3 left-6 px-3 py-1 bg-[#1D81B3] text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-sm">
                                <CheckCircle className="w-3 h-3" />
                                Default Address
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${address.isDefault ? "bg-blue-100 text-[#1D81B3]" : "bg-zinc-100 text-zinc-500"
                                    }`}>
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{address.label}</h3>
                                    <p className="text-sm text-zinc-500">{address.name}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(address)}
                                    className="p-2 text-zinc-500 hover:text-[#1D81B3] hover:bg-zinc-100 rounded-lg transition"
                                    title="Edit Address"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                {!address.isDefault && (
                                    <button
                                        onClick={() => handleDelete(address.id)}
                                        className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                        title="Delete Address"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm pl-16">
                            <p>{address.phone}</p>
                            <p>
                                {address.address}, {address.city} - {address.zip}
                            </p>
                            <p>{address.country}</p>
                        </div>

                        {!address.isDefault && (
                            <div className="mt-6 pl-16">
                                <button
                                    onClick={() => handleSetDefault(address.id)}
                                    className="text-sm font-semibold text-zinc-500 hover:text-[#1D81B3] transition"
                                >
                                    Set as default address
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editAddress={editingAddress}
            />
        </div>
    );
};

export default AddressManager;
