"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, MessageCircle, HelpCircle, ArrowRight } from "lucide-react";
import Container from "@/app/components/Common/Container";
import Link from "next/link";

const faqs = [
    {
        question: "How do I order prescription medications?",
        answer: "Ordering prescription medications is easy. Simply search for your medicine, upload a clear photo or PDF of your valid prescription, and add it to your cart. Our licensed pharmacist will review it before processing your order.",
        category: "Ordering"
    },
    {
        question: "What are your delivery hours?",
        answer: "We offer 24/7 delivery services in major metropolitan areas. For other regions, we typically deliver between 8:00 AM and 10:00 PM. You can choose your preferred time slot during checkout.",
        category: "Delivery"
    },
    {
        question: "Is it safe to buy medicine online?",
        answer: "Yes, it is completely safe when you buy from an accredited pharmacy like AKS. We source all our medications directly from authorized distributors and manufacturers, ensuring 100% authenticity.",
        category: "Safety"
    },
    {
        question: "What is your return policy?",
        answer: "We accept returns for non-medicinal items within 7 days of delivery if the packaging is unopened. For medications, returns are only accepted if the product is damaged or different from what was ordered, due to health and safety regulations.",
        category: "Returns"
    },
    {
        question: "Do you offer international shipping?",
        answer: "Currently, we only operate within the country to ensure we comply with all local pharmaceutical regulations and provide fast, climate-controlled shipping for sensitive medications.",
        category: "Shipping"
    },
    {
        question: "How can I track my order?",
        answer: "Once your order is dispatched, you will receive a tracking link via SMS and email. You can also track it directly from your dashboard in the 'My Orders' section.",
        category: "Tracking"
    }
];

const categories = ["All", "Ordering", "Delivery", "Safety", "Returns", "Tracking"];

export default function FAQPage() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-slate-50/50 min-h-screen py-16 md:py-24">
            <Container>
                {/* Header Section */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                            How can we <span className="text-[#0784BB]">help you?</span>
                        </h1>
                        <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                            Find answers to all your questions about our pharmacy services,
                            delivery, and order processing.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-10 relative group"
                    >
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="block w-full pl-12 pr-4 py-4 md:py-5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-700 text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </motion.div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat, idx) => (
                        <motion.button
                            key={cat}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setActiveCategory(cat)}
                            className={`cursor-pointer px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                ? "bg-[#0784BB] text-white shadow-lg shadow-emerald-200"
                                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto">
                    {filteredFaqs.length > 0 ? (
                        <div className="space-y-4">
                            {filteredFaqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <button
                                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                        className="w-full text-left px-6 md:px-8 py-6 flex items-center justify-between gap-4 group"
                                    >
                                        <span className="text-lg md:text-xl font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                                            {faq.question}
                                        </span>
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeIndex === index ? "bg-emerald-100 text-emerald-600" : "bg-slate-50 text-slate-400"
                                            }`}>
                                            {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {activeIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 md:px-8 pb-8 pt-2 text-slate-600 leading-relaxed text-[17px]">
                                                    <div className="h-px w-full bg-slate-50 mb-6" />
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <HelpCircle className="text-slate-300" size={32} />
                            </div>
                            <h3 className="text-xl font-medium text-slate-900">No matching questions found</h3>
                            <p className="text-slate-500 mt-2">Try adjusting your search or category filter</p>
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 max-w-5xl mx-auto bg-[#0784BB] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden group shadow-2xl shadow-emerald-200"
                >

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                            <MessageCircle size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Still have questions?</h2>
                        <p className="text-emerald-50/80 text-lg mb-10 max-w-xl">
                            Can't find the answer you're looking for? Please chat to our friendly team.
                            We're here to help you 24/7.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact-us"
                                className="px-8 py-4 bg-white text-[#0784BB] rounded-lg font-bold hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
                                Contact Us <ArrowRight size={18} />
                            </Link>
                            {/* <button className="px-8 py-4 bg-emerald-700 text-white border border-emerald-500/30 rounded-2xl font-bold hover:bg-emerald-800 transition-all">
                                Contact Us
                            </button> */}
                        </div>
                    </div>
                </motion.div>
            </Container>
        </div>
    );
}
