"use client";
import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Save, Camera } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "@/lib/redux/features/user/userSlice";

const ProfileForm = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.profile);
    const [formData, setFormData] = useState(userProfile);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(formData));
        alert("Profile updated successfully!");
    };

    return (
        <div className="">
            <div className="bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="h-32 bg-zinc-100 dark:bg-zinc-800 relative">
                    <div className="absolute -bottom-12 left-8">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-2xl bg-white dark:bg-zinc-900 border-4 border-white dark:border-zinc-900 shadow-xl flex items-center justify-center text-3xl font-bold">
                                {formData.name.charAt(0)}
                            </div>
                            <button className="absolute bottom-0 right-0 p-1.5 bg-zinc-900 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="pt-16 p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold flex items-center gap-2">
                                <User className="w-4 h-4 text-zinc-400" /> Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold flex items-center gap-2">
                                <Mail className="w-4 h-4 text-zinc-400" /> Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 cursor-not-allowed outline-none transition-all"
                                value={formData.email}
                                readOnly
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold flex items-center gap-2">
                                <Phone className="w-4 h-4 text-zinc-400" /> Phone Number
                            </label>
                            <input
                                type="tel"
                                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-zinc-400" /> City
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-zinc-400" /> Full Address
                            </label>
                            <textarea
                                rows="3"
                                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-zinc-900 outline-none transition-all resize-none"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-[#1D81B3] dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-xl"
                        >
                            <Save className="w-5 h-5" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;
