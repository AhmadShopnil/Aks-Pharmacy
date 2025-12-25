"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function ProductDescription() {
  const [expanded, setExpanded] = useState(true)

  const benefits = [
    {
      title: "Ashwagandha Benefits",
      description:
        "A traditional Ayurvedic herb commonly used to enhance energy, stamina, and vitality. It aids in improving overall health, strength, and vigor.",
    },
    {
      title: "Energy and Stamina",
      description:
        "Helps to naturally boost energy levels, stamina, and vitality without the jittery side effects associated with caffeine.",
    },
    {
      title: "Muscle Building",
      description:
        "Supports natural muscle building, strength enhancement, and recovery, promoting a sense of well-being throughout the day.",
    },
    {
      title: "Stress Management",
      description: "Supports stress management and reduces anxiety, promoting a sense of calm and well-being.",
    },
    {
      title: "Enhanced Energy and Stamina",
      description: "Helps to increase energy levels and physical endurance, making it suitable for active individuals.",
    },
    {
      title: "Sleep and Recovery",
      description: "Supports peaceful sleep and helps ensure quality sleep for faster recovery and restoration.",
    },
    {
      title: "Cognitive Function",
      description: "Ashwagandha has been shown to improve cognitive function, memory, and mental clarity.",
    },
    {
      title: "Overall Health Support",
      description:
        "The combination of Maca and Ashwagandha supports overall health and well-being in a holistic manner.",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <h2 className="text-xl font-bold text-gray-900">Product Description</h2>
        <ChevronDown size={24} className={`text-gray-600 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </div>

      {expanded && (
        <div className="space-y-3">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="text-sm">
              <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
              <p className="text-gray-600 text-xs leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
