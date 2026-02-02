"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, MessageCircle, ChevronDown, User, ShieldCheck, Send } from "lucide-react";

const initialQA = [
    {
        question: "Can I take this medicine on an empty stomach?",
        answer: "It is generally recommended to take this medication with food to avoid any potential stomach irritation, although it's not strictly required.",
        user: "Asif R.",
        date: "2 days ago",
        verified: true
    },
    {
        question: "Is this suitable for children under 10?",
        answer: "Dosage for children varies by age. Please consult your pediatrician or read the dosage instructions on the package carefully before administering.",
        user: "Nusrat J.",
        date: "1 week ago",
        verified: true
    }
];

export default function ProductQA() {
    const [qaList, setQaList] = useState(initialQA);
    const [newQuestion, setNewQuestion] = useState("");
    const [isAsking, setIsAsking] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newQuestion.trim()) return;

        // Simulate adding a question
        const question = {
            question: newQuestion,
            answer: "Our pharmacist will answer your question shortly.",
            user: "You",
            date: "Just now",
            verified: false
        };

        setQaList([question, ...qaList]);
        setNewQuestion("");
        setIsAsking(false);
    };

    return (
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm mt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <MessageCircle className="text-emerald-600" />
                        Questions & Answers
                    </h2>
                    <p className="text-slate-500 mt-1">Have a question? Our medical experts are here to help.</p>
                </div>

                <button
                    onClick={() => setIsAsking(!isAsking)}
                    className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 self-start"
                >
                    {isAsking ? "Cancel" : "Ask a Question"}
                </button>
            </div>

            <AnimatePresence>
                {isAsking && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-10"
                    >
                        <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Your Question</label>
                            <textarea
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder="Ex: Can I take this with my other vitamins?"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 min-h-[100px] outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2"
                                >
                                    Post Question <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-6">
                {qaList.length > 0 ? (
                    qaList.map((item, idx) => (
                        <div key={idx} className="group border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                            <div
                                className="flex items-start gap-4 cursor-pointer"
                                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                            >
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 text-slate-500">
                                    <HelpCircle size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-slate-800 text-lg group-hover:text-emerald-600 transition-colors">
                                            {item.question}
                                        </span>
                                        {item.verified && (
                                            <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1">
                                                <ShieldCheck size={10} /> Verified
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-3">
                                        <span className="flex items-center gap-1"><User size={12} /> {item.user}</span>
                                        <span>•</span>
                                        <span>{item.date}</span>
                                    </div>

                                    <div className={`text-slate-600 leading-relaxed transition-all ${expandedIndex === idx ? "" : "line-clamp-2"}`}>
                                        <span className="font-bold text-emerald-600 mr-2 uppercase text-xs">Answer:</span>
                                        {item.answer}
                                    </div>

                                    <button className="text-emerald-600 text-xs font-bold mt-2 flex items-center gap-1 hover:underline">
                                        {expandedIndex === idx ? "Show less" : "Read full answer"}
                                        <ChevronDown size={14} className={`transition-transform ${expandedIndex === idx ? "rotate-180" : ""}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 opacity-50">
                        <MessageCircle size={48} className="mx-auto mb-4" />
                        <p>No questions yet. Be the first to ask!</p>
                    </div>
                )}
            </div>

            {/* Trust Badge */}
            <div className="mt-10 pt-8 border-t border-slate-100 flex items-center gap-4 text-slate-500">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-800">Expert Answered</p>
                    <p className="text-xs">All our answers are provided by certified pharmacists with years of experience.</p>
                </div>
            </div>
        </div>
    );
}
