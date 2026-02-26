"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus, MapPin, Edit2, Trash2, CheckCircle } from "lucide-react";
import {
    useGetAddressesQuery,
    useCreateAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useSetDefaultAddressMutation,
} from "@/lib/redux/services/addressApi";
import AddressModal from "@/app/components/Common/AddressModal";

const AddressManager = () => {
    const { data: addressesResponse, isLoading } = useGetAddressesQuery();
    const [createAddress] = useCreateAddressMutation();
    const [updateAddress] = useUpdateAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();
    const [setDefaultAddress] = useSetDefaultAddressMutation();

    const addresses = addressesResponse?.data || [];
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

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this address?")) {
            try {
                await deleteAddress(id).unwrap();
            } catch (err) {
                console.error("Failed to delete address:", err);
            }
        }
    };

    const handleSetDefault = async (id) => {
        try {
            await setDefaultAddress(id).unwrap();
        } catch (err) {
            console.error("Failed to set default address:", err);
        }
    };

    const handleSave = async (data) => {
        try {
            if (editingAddress) {
                await updateAddress({ ...data, id: editingAddress.id }).unwrap();
            } else {
                await createAddress(data).unwrap();
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error("Failed to save address:", err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1d81b3]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Addresses</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1d81b3] text-white rounded-lg hover:bg-[#166a94] transition shadow-md"
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
                        className={`relative p-6 rounded-md border-2 transition-all ${address.is_default
                            ? "border-[#1d81b3] bg-blue-50/50 dark:bg-blue-900/10"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                            } bg-white dark:bg-zinc-900 group`}
                    >
                        {/* Default Badge */}
                        {address.is_default && (
                            <div className="absolute -top-3 left-6 px-3 py-1 bg-[#1d81b3] text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-sm">
                                <CheckCircle className="w-3 h-3" />
                                Default Address
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${address.is_default ? "bg-blue-100 text-[#1d81b3]" : "bg-zinc-100 text-zinc-500"
                                    }`}>
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{address.address_label || "Address"}</h3>
                                    <p className="text-sm text-zinc-500">{address.customer_name}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(address)}
                                    className="p-2 text-zinc-500 hover:text-[#1d81b3] hover:bg-zinc-100 rounded-lg transition"
                                    title="Edit Address"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                {!address.is_default && (
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
                            <p>{address.customer_phone}</p>
                            <p>
                                {address.detailed_address}
                            </p>
                            <p>
                                {address.district && `${address.district}, `}
                                {address.division}
                            </p>
                        </div>

                        {!address.is_default && (
                            <div className="mt-6 pl-16">
                                <button
                                    onClick={() => handleSetDefault(address.id)}
                                    className="text-sm font-semibold text-zinc-500 hover:text-[#1d81b3] transition"
                                >
                                    Set as default address
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {addresses.length === 0 && (
                    <div className="col-span-full py-12 text-center bg-white dark:bg-zinc-900 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <MapPin className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-zinc-500">No addresses saved yet</h3>
                        <p className="text-zinc-400 mb-6">Add a delivery address for faster checkout</p>
                        <button
                            onClick={handleAdd}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-[#1d81b3] text-white rounded-lg hover:bg-[#166a94] transition shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            Add Your First Address
                        </button>
                    </div>
                )}
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
