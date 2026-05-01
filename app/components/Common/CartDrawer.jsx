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
    clearCart,
} from '@/lib/redux/features/cart/cartSlice';
import { toggleCartDrawer, selectCartDrawerOpen, showNotification, openAuthModal } from "../../../lib/redux/features/ui/uiSlice";
import { useCreateOrderMutation, useValidateCouponMutation } from '@/lib/redux/services/ordersApi';
import {
    useGetAddressesQuery,
    useCreateAddressMutation
} from '@/lib/redux/services/addressApi';
import { useInitiatePaymentMutation } from '@/lib/redux/services/paymentsApi';
import AddressListModal from './AddressListModal';
import toast from 'react-hot-toast';
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
    const user = useAppSelector((state) => state.user?.user);
    const profile = useAppSelector((state) => state.user?.profile);
    const isAuthenticated = useAppSelector((state) => state.user?.isAuthenticated);

    const { data: addressesResponse } = useGetAddressesQuery(undefined, {
        skip: !isOpen || !isAuthenticated
    });
    const [createAddress] = useCreateAddressMutation();
    const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();
    const [validateCoupon, { isLoading: isApplyingCoupon }] = useValidateCouponMutation();
    const [initiatePayment, { isLoading: isInitiatingPayment }] = useInitiatePaymentMutation();
    const addresses = addressesResponse?.data || [];

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");

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
    const finalPayable = (cartTotal - couponDiscount).toFixed();




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

    const handleApplyCoupon = async () => {
        if (!couponCode) {
            toast.error("Please enter a coupon code");
            return;
        }
        
        if (!isAuthenticated) {
            toast.error("Please login to apply coupon");
            return;
        }

        try {
            const response = await validateCoupon({
                coupon_code: couponCode,
                order_total: cartTotal
            }).unwrap();
            
            if (response.success && response.data) {
                setAppliedCoupon(response.data.coupon);
                setCouponDiscount(response.data.discount_amount);
                toast.success(`Coupon applied successfully!`);
            } else {
                toast.error(response.message || "Invalid coupon code");
            }
        } catch (error) {
            console.error("Failed to apply coupon:", error);
            toast.error(error?.data?.message || "Failed to apply coupon.");
            setAppliedCoupon(null);
            setCouponDiscount(0);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponDiscount(0);
        setCouponCode("");
        toast.success("Coupon removed");
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please select a shipping address");
            return;
        }

        if (!agreeTerms) {
            toast.error("Please agree to the terms and conditions");
            return;
        }

        const orderPayload = {
            shipping: {
                name: selectedAddress?.customer_name || profile?.name || "",
                email: profile?.email || selectedAddress?.email || "",
                phone: selectedAddress?.customer_phone || profile?.phone || "",
                address: selectedAddress?.detailed_address || "",
                thana: selectedAddress?.division || "",
                district: selectedAddress?.district || "",
                country: "Bangladesh",
                note: ""
            },
            products: cartItems.map(item => ({
                id: item.id,
                name: item.title,
                price: item.price,
                qty: item.quantity,
                original_price: (item.price + (item.discount || 0)),
                brand_id: "",
                vendor_id: "",
                category_id: "",
                icon: item.img || "",
                slug: item.slug || "",
                size: item.size || "",
                color: item.color || ""
            })),
            paymentMethod: paymentMethod,
            promoCode: appliedCoupon?.code || "",
            promoAmount: couponDiscount || 0,
            amount: Number(finalPayable),
            // transaction_id: `AKS-${Date.now()}${Math.floor(Math.random() * 1000)}`
        };

        try {
            console.log("orderPayload", orderPayload)
            const res = await createOrder(orderPayload).unwrap();

            // The API response might be wrapped in a data property
            const orderData = res.data || res;

            if (orderData) {
                console.log("order res", orderData)
                toast.success("Order placed successfully!");
                dispatch(clearCart());
                setAppliedCoupon(null);
                setCouponDiscount(0);
                setCouponCode("");

                if (paymentMethod !== "cash_on_delivery") {
                    const origin = window.location.origin;
                    const paymentPayload = {
                        gateway: 'sslcommerz',
                        amount: orderData?.order?.grand_total || orderPayload?.amount,
                        // amount: orderData?.grand_total || orderPayload.amount,
                        currency: 'BDT',
                        transaction_id: orderData?.order?.transactions?.[0]?.transaction_id,
                        // transaction_id: orderData.unique_id || orderPayload.transaction_id,
                        customer_name: orderPayload.shipping.name,
                        customer_email: orderPayload.shipping.email,
                        customer_phone: orderPayload.shipping.phone,
                        product_name: orderData.order_item?.[0]?.item_name || 'Pharmacy Items',
                        product_category: 'Healthcare',
                        customer_address: orderPayload.shipping.address,
                        customer_city: orderPayload.shipping.district,
                        customer_postcode: '1000', // Default if not available
                        customer_country: 'Bangladesh',
                        success_url: `${origin}/api/payment/callback?status=success`,
                        fail_url: `${origin}/api/payment/callback?status=failed`,
                        cancel_url: `${origin}/api/payment/callback?status=cancle`
                    };

                    toast.loading("Redirecting to payment gateway...");
                    const paymentRes = await initiatePayment(paymentPayload).unwrap();

                    if (paymentRes?.gateway_url) {
                        window.location.href = paymentRes.gateway_url;
                    } else {
                        toast.error("Failed to get payment URL");
                        dispatch(toggleCartDrawer());
                    }
                } else {
                    // Redirect to dashboard for COD
                    dispatch(toggleCartDrawer());
                    window.location.href = '/dashboard';
                }
            }
        } catch (error) {
            console.error("Failed to place order:", error);
            toast.error(error?.data?.message || "Failed to place order. Please try again.");
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
                            <div className="bg-white p-4 ">
                                <h3 className="font-semibold text-gray-800 mb-2.5">Shipping Address</h3>
                                {!isAuthenticated ? (
                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-500">You need to login to add a shipping address and place an order.</p>
                                        <button
                                            onClick={() => dispatch(openAuthModal())}
                                            className="w-full bg-[#1d81b3] text-white font-medium py-2.5 rounded-sm hover:bg-[#166a94] transition"
                                        >
                                            Login / Register
                                        </button>
                                    </div>
                                ) : !selectedAddress ? (
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
                                            disabled={!!appliedCoupon || isApplyingCoupon}
                                        />
                                    </div>
                                    {!appliedCoupon ? (
                                        <button 
                                            onClick={handleApplyCoupon}
                                            disabled={isApplyingCoupon || !couponCode}
                                            className="bg-[#1d81b3] text-white px-6 py-2 rounded-sm font-medium hover:bg-[#166a94] transition disabled:opacity-50"
                                        >
                                            {isApplyingCoupon ? "..." : "Apply"}
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={handleRemoveCoupon}
                                            className="bg-red-500 text-white px-4 py-2 rounded-sm font-medium hover:bg-red-600 transition"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                {appliedCoupon && (
                                    <div className="mt-2 text-sm text-green-600 font-medium">
                                        Coupon '{appliedCoupon.code}' applied! You save Tk {couponDiscount}.
                                    </div>
                                )}
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white p-4 mb-2">
                                <h3 className="font-semibold text-gray-800 mb-2.5">Payment Method</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cash_on_delivery"
                                            checked={paymentMethod === "cash_on_delivery"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 text-[#1d81b3] focus:ring-[#1d81b3]"
                                        />
                                        <span className="text-sm text-gray-700">Cash On Delivery</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="debitcredit"
                                            checked={paymentMethod === "debitcredit"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 text-[#1d81b3] focus:ring-[#1d81b3]"
                                        />
                                        <span className="text-sm text-gray-700">Debit/Credit</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="mobilebanking"
                                            checked={paymentMethod === "mobilebanking"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 text-[#1d81b3] focus:ring-[#1d81b3]"
                                        />
                                        <span className="text-sm text-gray-700">Mobile Banking(SSL)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Bill Details */}
                            <div className="bg-white px-4 mb-2 text-sm">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600 text-sm md:text-base">Subtotal (MRP)</span>
                                    <span className="font-medium text-sm md:text-base">Tk{mrp?.toFixed(1)}</span>
                                </div>
                                {appliedCoupon && (
                                    <div className="flex justify-between mb-2 text-sm md:text-base">
                                        <span className="text-gray-600">Coupon Discount</span>
                                        <span className="text-red-500 font-medium">-Tk{couponDiscount?.toFixed(1)}</span>
                                    </div>
                                )}
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
                        <button
                            onClick={() => {
                                if (!isAuthenticated) {
                                    dispatch(openAuthModal());
                                } else {
                                    handlePlaceOrder();
                                }
                            }}
                            disabled={isPlacingOrder}
                            className="w-full bg-[#1d81b3] p-4 flex justify-between items-center text-white shrink-0 cursor-pointer hover:bg-[#166a94] transition disabled:opacity-50 disabled:cursor-not-allowed border-none outline-none">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <ShoppingCart className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col leading-tight text-left">
                                    <span className="font-bold text-sm">{cartCount} items</span>
                                    <span className="font-bold text-lg">Tk{Math.round(finalPayable)}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 font-bold">
                                {!isAuthenticated ? "Login to Place Order" : (isPlacingOrder || isInitiatingPayment) ? "Processing..." : "Place Order"}
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </button>
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
