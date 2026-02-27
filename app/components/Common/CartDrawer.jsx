'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
    selectCartItems,
    selectCartTotal,
    selectCartCount,
    removeItem,
    incrementQuantity,
    decrementQuantity,
} from '@/lib/redux/features/cart/cartSlice';
import { toggleCartDrawer, selectCartDrawerOpen } from '@/lib/redux/features/ui/uiSlice';
import {
    useGetAddressesQuery,
    useCreateAddressMutation
} from '@/lib/redux/services/addressApi';
import AddressListModal from './AddressListModal';
import {
    MapPin,
    Plus,
    Ticket,
    Truck,
    Info,
    Check,
    ChevronRight,
    X,
    ShoppingCart
} from 'lucide-react';


export default function CartDrawer() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const cartTotal = useAppSelector(selectCartTotal);
    const cartCount = useAppSelector(selectCartCount);
    const isOpen = useAppSelector(selectCartDrawerOpen);

    const { data: addressesResponse } = useGetAddressesQuery(undefined, {
        skip: !isOpen
    });
    const [createAddress] = useCreateAddressMutation();
    const addresses = addressesResponse?.data || [];

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [couponCode, setCouponCode] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    React.useEffect(() => {
        if (!selectedAddressId && addresses.length > 0) {
            const defaultAddr = addresses.find(addr => addr.is_default);
            if (defaultAddr) {
                setSelectedAddressId(defaultAddr.id);
            } else {
                setSelectedAddressId(addresses[0].id);
            }
        }
    }, [addresses, selectedAddressId]);

    const mrp = cartTotal;
    const discount = cartTotal * 1.2 / 100;
    // const finalPayable = cartTotal - discount;
    const finalPayable = cartTotal;




    const selectedAddress = addresses.find(a => a.id === selectedAddressId);

    const handleClose = () => {
        dispatch(toggleCartDrawer());
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const handleAddNewAddress = async (data) => {
        try {
            const response = await createAddress(data).unwrap();
            if (response.success && response.data) {
                setSelectedAddressId(response.data.id);
            }
        } catch (err) {
            console.error("Failed to add address:", err);
        }
    };

    if (!isOpen) return null;


    // console.log("cartItems", cartItems)



    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#F3F4F6] shadow-2xl z-50 transform transition-transform bg-white 
            duration-300 flex flex-col ">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white border-b shrink-0">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        Shopping Cart
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-red-500 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">

                    {/* Cart Items */}
                    <div className="bg-white p-4 mb-3">
                        {cartItems?.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems?.map((item) => (
                                    <div key={item.id} className="flex gap-4 border-b last:border-0 pb-4 last:pb-0">
                                        <div className="relative w-18 h-18 border border-gray-200 rounded-xs shrink-0">
                                            <Image
                                                src={item?.img}
                                                alt={item?.title}
                                                fill
                                                className="object-fit rounded-xs"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-medium text-sm text-gray-800 line-clamp-2">{item.title}</h3>
                                                <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-600 font-bold">
                                                    <X className="w-4 h-4 md:w-5 md:h-5" />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-end ">
                                                <div className="font-bold text-gray-700">
                                                    Tk {item?.price}
                                                </div>
                                                <div className="flex items-center border rounded-md bg-white">
                                                    <button onClick={() => handleDecrement(item.id)} className="px-2 py-0.5 hover:bg-gray-50 text-gray-600">-</button>
                                                    <span className="px-2 text-sm font-medium border-x">{item.quantity}</span>
                                                    <button onClick={() => handleIncrement(item.id)} className="px-2 py-0.5 hover:bg-gray-50 text-gray-600">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {cartItems?.length > 0 && (
                        <>
                            {/* Shipping Address */}
                            <div className="bg-white p-4 ">
                                <h3 className="font-semibold text-gray-800 mb-2.5">Shipping Address</h3>
                                {!selectedAddress ? (
                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-500">You havent added any address yet.</p>
                                        <button
                                            onClick={() => setIsAddressModalOpen(true)}
                                            className="w-full bg-[#1d81b3] text-white font-medium py-2.5 rounded-sm hover:bg-[#166a94]
                                             transition"
                                        >
                                            Add New Address
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="border rounded-sm p-3 mb-3 relative">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-[#1d81b3] shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-sm">{selectedAddress.address_label || "Address"}</span>
                                                        <span className="text-xs bg-[#1d81b3]/10 text-[#1d81b3] px-1.5 py-0.5 rounded">Selected</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {selectedAddress.detailed_address} {selectedAddress.district ? `, ${selectedAddress.district}` : ""}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{selectedAddress.customer_phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsAddressModalOpen(true)}
                                            className="w-full border border-[#1d81b3] text-[#1d81b3] font-medium py-2 rounded-sm hover:bg-blue-50 transition"
                                        >
                                            Change Address
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Coupon Code */}
                            <div className="bg-white p-4 mb-2">
                                <p className="text-[#1d81b3] text-base font-medium underline mb-2 cursor-pointer">Have coupon code ?</p>
                                <div className="flex gap-2 ">
                                    <div className="relative flex-1">
                                        <Ticket className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                                        <input
                                            type="text"
                                            placeholder="Enter Coupon Code"
                                            className="w-full pl-10 pr-4 py-2 border rounded-sm focus:ring-2 focus:ring-[#1d81b3] outline-none text-sm"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                        />
                                    </div>
                                    <button className="bg-[#1d81b3] text-white px-6 py-2 rounded-sm font-medium hover:bg-[#166a94] transition">
                                        Apply
                                    </button>
                                </div>
                                {/* saving amount after cupon add */}
                                {/* <div className="bg-blue-50 border border-blue-100 rounded-sm p-3 flex gap-3">
                                    <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center shrink-0 text-white text-xs">Tk</div>
                                    <div className="text-xs text-[#1d81b3]">
                                        <p>You are saving <span className="font-bold">Tk{discount?.toFixed(1)}</span> in this order.</p>
                                        <p>You will receive <span className="font-bold">Tk50</span> cashback after delivery.</p>
                                    </div>
                                </div> */}
                            </div>

                            {/* Bill Details */}
                            <div className="bg-white px-4 mb-2 text-sm">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600 text-sm md:text-base">Subtotal (MRP)</span>
                                    <span className="font-medium text-sm md:text-base">Tk{mrp?.toFixed(1)}</span>
                                </div>
                                {/* <div className="flex justify-between mb-2 text-sm md:text-base">
                                    <span className="text-gray-600">Discount Applied</span>
                                    <span className="text-red-500 font-medium">-Tk{discount.toFixed(1)}</span>
                                </div> */}
                                {/* <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Rounding Off</span>
                                    <span className="text-red-500 font-medium">{roundingOff}</span>
                                </div> */}
                            </div>

                            {/* Delivery Options */}
                            <div className="bg-white px-4 mb-2">
                                <div className="flex items-center justify-between ">
                                    <div className="flex items-center gap-2">
                                        {/* <div className="bg-[#1d81b3] text-white rounded-full p-0.5">
                                            <Check className="w-3 h-3" />
                                        </div> */}
                                        <span className="bg-[#1d81b3] text-white text-xs px-2 py-1 rounded">
                                            Regular Delivery
                                        </span>
                                    </div>
                                    <span className="text-[#1d81b3] font-medium text-sm">Free</span>
                                </div>
                                {/* <p className="text-xs text-gray-500 ml-6 mb-2">Delivery Charge (First Order)</p>
                                <div className="bg-blue-50 text-blue-700 text-xs p-2 rounded flex items-center gap-2">
                                    <Info className="w-4 h-4" />
                                    Free Delivery Above 999 Taka Order
                                </div> */}
                            </div>

                            {/* Amount Payable */}
                            <div className="bg-white px-4 flex justify-between items-center text-gray-800 text-sm md:text-base font-bold  mt-3">
                                <span>Amount Payable</span>
                                <span className="text-[#0784BB] text-lg">Tk {finalPayable}</span>
                            </div>

                            {/* <div className="p-4 flex gap-3">
                                <Link
                                    href="/cart"
                                    onClick={handleClose}
                                    className="flex-1 text-center py-3 border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition"
                                >
                                    View Cart
                                </Link>
                            </div> */}



                            {/* Spacer for sticky footer */}
                            {/* <div className="h-20" /> */}
                        </>
                    )}
                </div>

                {/* Sticky Footer */}
                {cartItems?.length > 0 && (
                    <div>
                        {/* Terms */}
                        <div className="p-4">
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mt-1 w-4 h-4 text-[#1d81b3] rounded border-gray-300 focus:ring-[#1d81b3]"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                />
                                <span className="text-sm text-gray-600">
                                    Please check the checkbox to agree to our <span className="text-[#1d81b3] font-medium">Terms & Conditions, Privacy Policy & Refund-Return Policy</span>
                                </span>
                            </label>
                        </div>
                        <div className="bg-[#1d81b3] p-4 flex justify-between items-center text-white shrink-0 cursor-pointer hover:bg-[#166a94] transition">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <ShoppingCart className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="font-bold text-sm">{cartCount} items</span>
                                    <span className="font-bold text-lg">Tk{Math.round(finalPayable)}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 font-bold">
                                Place Order
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Address List Modal */}
            <AddressListModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                addresses={addresses}
                onSelect={(addr) => {
                    setSelectedAddressId(addr.id);
                    setIsAddressModalOpen(false);
                }}
                onAddNew={handleAddNewAddress}
            />
        </>
    );
}
