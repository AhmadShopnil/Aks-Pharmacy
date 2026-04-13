"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, PhoneCall, Globe, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Container from "@/app/components/Common/Container";
import { getMediaLinkByMetaName, getMetaValueByMetaName } from "@/helper/metaHelpers";
import { useCreateContactMutation } from "@/lib/redux/services/contactApi";

export default function ContactUs({ settings }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
    });
    const [createContact, { isLoading }] = useCreateContactMutation();
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
    const [submitMessage, setSubmitMessage] = useState("");


    const logo = getMediaLinkByMetaName(settings, "site_logoimg_id");
    const email = getMetaValueByMetaName(settings, "company_email") || "";
    const phone = getMetaValueByMetaName(settings, "company_phone");
    const phone_2 = getMetaValueByMetaName(settings, "company_phone_2");
    const facebook_url = getMetaValueByMetaName(settings, "facebook_url") || "#";
    const instagram_url = getMetaValueByMetaName(settings, "instagram_url") || "#";
    const twitter_url = getMetaValueByMetaName(settings, "twitter_url") || "#";
    const youtube_url = getMetaValueByMetaName(settings, "youtube_url") || "#";
    const footer_content = getMetaValueByMetaName(settings, "footer_content") || "#"
    const bottom_footer_content = getMetaValueByMetaName(settings, "bottom_footer_content");
    const office_location = getMetaValueByMetaName(settings, "office_location");
    const whats_app = getMetaValueByMetaName(settings, "whats_app");





    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(null);
        setSubmitMessage("");

        try {
            const result = await createContact({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                subject: formData.subject,
                comment: formData.message,
            }).unwrap();

            setSubmitStatus("success");
            setSubmitMessage(result?.message || "Thank you! Your message has been sent successfully.");
            setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
        } catch (err) {
            const errorData = err?.data;
            const errorMsg =
                errorData?.message ||
                (errorData?.errors ? Object.values(errorData.errors).flat().join(" ") : null) ||
                "Something went wrong. Please try again.";
            setSubmitStatus("error");
            setSubmitMessage(errorMsg);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Header */}
            <div className="bg-[#0784BB] pt-20 pb-32 md:pt-24 md:pb-48 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-50 -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-700 rounded-full blur-[120px] opacity-50 -ml-48 -mb-48" />

                <Container className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Let's start a <span className="">conversation.</span></h1>
                        <p className="text-emerald-50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Have questions about your order or need medical advice?
                            Our experts are here to help you 24/7.
                        </p>
                    </motion.div>
                </Container>
            </div>

            <Container className="-mt-20 md:-mt-32 relative z-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <PhoneCall size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
                            {/* <p className="text-slate-500 mb-4">Monday – Sunday, 24/7</p> */}
                            <a href={`tel:${phone}`} className="text-lg font-bold text-emerald-600 hover:underline">{phone}</a>
                            <br />
                            <a href={`tel:${phone_2}`} className="text-lg font-bold text-emerald-600 hover:underline">{phone_2}</a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Mail size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
                            {/* <p className="text-slate-500 mb-4">We'll respond within 2 hours.</p> */}
                            <a href={`mailto:${email}`} className="text-lg font-bold text-[#0784BB] hover:underline">{email}</a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Visit Us</h3>

                            <p className="text-lg font-bold text-slate-800">{office_location}</p>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100"
                    >
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Send us a message</h2>
                            <p className="text-slate-500">Fill out the form below and our medical team will get in touch.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Subject</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Message</label>
                                <textarea
                                    rows="5"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium resize-none"
                                    placeholder="Describe your inquiry..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            {/* Feedback message */}
                            {submitStatus === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4 text-sm font-medium"
                                >
                                    <CheckCircle size={18} className="flex-shrink-0" />
                                    {submitMessage}
                                </motion.div>
                            )}
                            {submitStatus === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm font-medium"
                                >
                                    <AlertCircle size={18} className="flex-shrink-0" />
                                    {submitMessage}
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="cursor-pointer w-full bg-[#0784BB] text-white rounded-2xl py-3 md:py-4 font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <><Loader2 size={20} className="animate-spin" /> Sending...</>
                                ) : (
                                    <>Send Message <Send size={20} /></>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* Map Placeholder / Store Locator */}
                {/* <div className="mt-20 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row">
                    <div className="flex-1 min-h-[400px] bg-slate-200 relative">
                       
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 flex-col px-10 text-center">
                            <Globe size={48} className="mb-4 opacity-20" />
                            <p className="font-medium">Interactive Map Integration</p>
                            <p className="text-sm">Store locator successfully initialized. Location markers active.</p>
                        </div>
                    </div>
                    <div className="p-10 md:w-[400px] flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Store Locations</h3>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">Manhattan Flagship</p>
                                    <p className="text-slate-500 text-sm">45 Rockefeller Plaza, New York, NY 10111</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">Opening Hours</p>
                                    <p className="text-slate-500 text-sm">Mon-Fri: 8AM - 10PM</p>
                                    <p className="text-slate-500 text-sm">Sat-Sun: 9AM - 8PM</p>
                                </div>
                            </div>
                        </div>
                        <button className="mt-10 w-full py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                            Find More Stores
                        </button>
                    </div>
                </div> */}
            </Container>
        </div>
    );
}
