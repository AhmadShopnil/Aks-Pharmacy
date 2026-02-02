"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, ShieldCheck, Award, HeartPulse } from "lucide-react";
import Container from "@/app/components/Common/Container";
import Image from "next/image";

const teamMembers = [
    {
        name: "Dr. Sarah Johnson",
        role: "Chief Pharmacist",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=400",
        bio: "With over 15 years of experience in clinical pharmacy, Dr. Sarah leads our medical review team.",
        specialty: "Clinical Pharmacology"
    },
    {
        name: "Dr. Michael Chen",
        role: "Head of Operations",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400",
        bio: "Michael ensures our supply chain remains robust and all medications are stored at optimal conditions.",
        specialty: "Logistics & Supply Chain"
    },
    {
        name: "Emily Rodriguez",
        role: "Patient Care Lead",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400",
        bio: "Emily manages nuestro support team, ensuring every patient receives personalized care and attention.",
        specialty: "Customer Experience"
    },
    {
        name: "Dr. Robert Wilson",
        role: "Quality Assurance",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400",
        bio: "Robert oversees our rigorous 5-step quality check process for every prescription order.",
        specialty: "Pharmaceutical Compliance"
    },
];

const values = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
        title: "100% Authentic",
        description: "We source directly from manufacturers to guarantee genuine medications."
    },
    {
        icon: <Award className="w-8 h-8 text-blue-600" />,
        title: "Licensed Experts",
        description: "Our team consists of certified pharmacists registered with national health boards."
    },
    {
        icon: <HeartPulse className="w-8 h-8 text-rose-600" />,
        title: "Patient First",
        description: "Your health and well-being are at the core of every decision we make."
    }
];

export default function OurTeamPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative py-24 md:py-32 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 opacity-40">
                    {/* <Image
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000"
                        alt="Pharmacy Lab"
                        fill
                        className="object-cover"
                        priority
                    /> */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
                </div>

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">Meet the experts</span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Dedicated to your <span className="text-emerald-400">health & wellness.</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                            Our team of licensed pharmacists and healthcare professionals work
                            tirelessly to ensure you receive the highest quality pharmaceutical care.
                        </p>
                    </motion.div>
                </Container>
            </div>

            {/* Values Section */}
            <div className="py-20 bg-slate-50">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center"
                            >
                                <div className="mb-6 p-4 bg-slate-50 rounded-2xl">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Team Grid */}
            <div className="py-24">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Leadership Team</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            Combining decades of pharmaceutical expertise with a passion for modern healthcare delivery.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, idx) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group"
                            >
                                <div className="relative aspect-square rounded-3xl overflow-hidden mb-6 shadow-lg shadow-slate-200">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                        <div className="flex gap-4">
                                            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-emerald-700 transition-all">
                                                <Twitter size={18} />
                                            </button>
                                            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-emerald-700 transition-all">
                                                <Linkedin size={18} />
                                            </button>
                                            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-emerald-700 transition-all">
                                                <Mail size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-1 block">
                                        {member.specialty}
                                    </span>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
                                    <p className="text-slate-500 font-medium mb-4">{member.role}</p>
                                    <p className="text-slate-600 leading-relaxed text-sm px-4">
                                        {member.bio}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Join the team CTA */}
            <div className="py-24 bg-emerald-600 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full -ml-32 -mb-32 blur-3xl" />

                <Container className="relative z-10 text-center text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Want to join our mission?</h2>
                    <p className="text-emerald-50 text-xl mb-10 max-w-2xl mx-auto">
                        We're always looking for passionate healthcare professionals and innovators
                        to help us redefine the pharmacy experience.
                    </p>
                    <button className="px-10 py-4 bg-white text-emerald-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
                        View Career Openings
                    </button>
                </Container>
            </div>
        </div>
    );
}
