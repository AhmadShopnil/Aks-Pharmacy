"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
    selectCartItems,
    selectCartTotal,
    selectCartCount,
    removeItem,
    incrementQuantity,
    decrementQuantity,
} from "@/lib/redux/features/cart/cartSlice";
import {
    useGetAddressesQuery,
    useCreateAddressMutation
} from "@/lib/redux/services/addressApi";
import Container from "@/app/components/Common/Container";
import Image from "next/image";
import Link from "next/link";
import {
    Trash2,
    Plus,
    Minus,
    ShoppingCart,
    ArrowRight,
    Ticket,
    MapPin,
    Truck,
    ShieldCheck,
    Info,
    ChevronRight,
    Home
} from "lucide-react";
import AddressListModal from "@/app/components/Common/AddressListModal";

export default function CartPage() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const cartTotal = useAppSelector(selectCartTotal);
    const cartCount = useAppSelector(selectCartCount);

    const { data: addressesResponse } = useGetAddressesQuery();
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
    const deliveryCharge = mrp > 999 ? 0 : 60;
    const discount = cartTotal * 0.05; // 5% discount demonstration
    const finalPayable = cartTotal - discount + deliveryCharge;

    const selectedAddress = addresses.find(a => a.id === selectedAddressId);

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

    return (
        <div className="bg-slate-50 min-h-screen py-10 md:py-16">
            <Container>
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
                    <Link href="/" className="hover:text-[#0784BB] transition-colors flex items-center gap-1">
                        <Home size={16} /> Home
                    </Link>
                    <ArrowRight size={14} />
                    <span className="text-slate-900 font-medium">Shopping Cart</span>
                </nav>

                <h1 className="text-3xl font-bold text-slate-900 mb-10">Your Shopping Cart</h1>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Left Side: Cart Items */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-slate-900">Cart items ({cartCount})</h2>
                                    <button
                                        onClick={() => {/* Clear cart logic */ }}
                                        className="text-sm text-slate-400 hover:text-rose-600 transition-colors font-medium"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                                <div className="divide-y divide-slate-50">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
                                            <div className="relative w-24 h-24 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                                                <Image
                                                    src={item.img}
                                                    alt={item.title}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between gap-4">
                                                    <div>
                                                        <Link href={`/products/${item.title}`} className="text-lg font-bold text-slate-900 hover:text-[#0784BB] transition-colors leading-tight block mb-1">
                                                            {item.title}
                                                        </Link>
                                                        <p className="text-sm text-slate-400 font-medium">{item.brand || 'Personal Care'}</p>
                                                    </div>
                                                    <div className="text-right whitespace-nowrap">
                                                        <p className="text-xl font-bold text-[#0784BB]">Tk {item.price.toFixed(2)}</p>
                                                        {item.discount && (
                                                            <p className="text-sm text-slate-400 line-through">Tk {(item.price * 1.2).toFixed(2)}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-6">
                                                    <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-100">
                                                        <button
                                                            onClick={() => handleDecrement(item.id)}
                                                            className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-600"
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="w-10 text-center font-bold text-slate-800">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleIncrement(item.id)}
                                                            className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-600"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemove(item.id)}
                                                        className="text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1.5 text-sm font-bold"
                                                    >
                                                        <Trash2 size={16} /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping info or other messaging can go here */}
                            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0784BB] shrink-0">
                                    <Truck size={28} />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h4 className="font-bold text-slate-900">Enjoy Free Delivery</h4>
                                    <p className="text-slate-600 text-sm mt-1">
                                        You are <strong>Tk {Math.max(0, 1000 - cartTotal).toFixed(0)}</strong> away from free shipping.
                                        Add more items to your cart to save on delivery!
                                    </p>
                                </div>
                                <Link href="/shop" className="px-6 py-2.5 bg-white text-[#0784BB] rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all">
                                    Browse Shop
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Order Summary */}
                        <div className="lg:col-span-4 space-y-6">

                            {/* Shipping Address */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <MapPin size={18} className="text-[#0784BB]" /> Shipping Address
                                </h3>
                                {!selectedAddress ? (
                                    <button
                                        onClick={() => setIsAddressModalOpen(true)}
                                        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:border-[#0784BB] hover:text-[#0784BB] transition-all flex flex-col items-center justify-center gap-2"
                                    >
                                        <Plus size={24} /> Add new address
                                    </button>
                                ) : (
                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl relative group">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-black uppercase text-[#0784BB] bg-[#0784BB]/10 px-2 py-0.5 rounded">
                                                {selectedAddress.address_label || "Address"}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-900">{selectedAddress.customer_name}</p>
                                        <p className="text-sm text-slate-600 mt-1">{selectedAddress.detailed_address}</p>
                                        <p className="text-sm text-slate-600">{selectedAddress.district || selectedAddress.division}, {selectedAddress.customer_phone}</p>
                                        <button
                                            onClick={() => setIsAddressModalOpen(true)}
                                            className="mt-4 text-xs font-black uppercase text-[#0784BB] hover:underline"
                                        >
                                            Change Address
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Coupon */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Ticket size={18} className="text-[#0784BB]" /> Apply Coupon
                                </h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0784BB]/20 focus:border-[#0784BB] transition-all text-sm font-medium"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-6">
                                    <h3 className="font-bold text-slate-900 mb-6">Order Summary</h3>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex justify-between text-slate-500">
                                            <span>Subtotal ({cartCount} items)</span>
                                            <span className="font-bold text-slate-900">Tk {cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-500">
                                            <span>Delivery Charge</span>
                                            <span className={deliveryCharge === 0 ? "text-emerald-600 font-bold" : "font-bold text-slate-900"}>
                                                {deliveryCharge === 0 ? 'FREE' : `Tk ${deliveryCharge.toFixed(2)}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-slate-500">
                                            <span>Tax/Discount</span>
                                            <span className="text-rose-600 font-bold">- Tk {discount.toFixed(2)}</span>
                                        </div>
                                        <div className="h-px bg-slate-50 w-full my-6" />
                                        <div className="flex justify-between text-lg font-black italic">
                                            <span className="text-slate-900">Total Amount</span>
                                            <span className="text-[#0784BB]">Tk {Math.round(finalPayable)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <label className="flex items-start gap-3 cursor-pointer group mb-6">
                                            <input
                                                type="checkbox"
                                                className="mt-1 w-5 h-5 rounded border-slate-300 text-[#0784BB] focus:ring-[#0784BB] cursor-pointer"
                                                checked={agreeTerms}
                                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                            />
                                            <span className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-900 transition-colors">
                                                By proceeding, I agree to the <Link href="/terms" className="text-[#0784BB] font-bold">Terms & Conditions</Link>,
                                                <Link href="/privacy" className="text-[#0784BB] font-bold"> Privacy Policy</Link> and
                                                <Link href="/refund" className="text-[#0784BB] font-bold"> Refund Policy</Link>.
                                            </span>
                                        </label>

                                        <button
                                            disabled={!agreeTerms || cartItems.length === 0}
                                            className="w-full bg-[#0784BB] text-white rounded-2xl py-5 font-black text-xl shadow-lg shadow-[#0784BB]/20 hover:bg-[#0673a3] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                                        >
                                            Checkout Now
                                            <ArrowRight size={22} />
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-center gap-4">
                                    <ShieldCheck size={20} className="text-emerald-600" />
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">100% Secure Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <ShoppingCart className="text-slate-200" size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                        <p className="text-slate-500 mb-10 max-w-sm mx-auto">
                            Add some health essentials to your cart and they will show up here.
                        </p>
                        {/* <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 px-10 py-4 bg-[#0784BB] text-white rounded-2xl font-bold hover:bg-[#0673a3] transition-all shadow-xl shadow-[#0784BB]/10"
                        >
                            Explore Store <ArrowRight size={20} />
                        </Link> */}
                    </div>
                )}
            </Container>

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
        </div>
    );
}
