"use client"
import { useState } from "react"
import { FileText } from "lucide-react"

export default function ProductOverview({ product }) {
  const [lang, setLang] = useState("en")

  const htmlContent = product?.descriptionHtml?.[lang]

  if (!htmlContent) return null

  return (
    <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b bg-gray-50/30 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 ">
          <div className="text-[#0784BB] ">
            <FileText size={24} />
          </div>
          <h2 className="text-2xl font-semibold text-[#0784BB]">
            Product Overview of {product?.name}
          </h2>
        </div>

        {/* Language Switch */}
        <div className="flex bg-white p-1 rounded-md border shadow-sm">
          <button
            onClick={() => setLang("bn")}
            className={`px-4 py-2 text-xs font-black rounded-md cursor-pointer ${lang === "bn"
              ? "bg-[#0784BB] text-white"
              : "text-gray-400 hover:text-gray-800"
              }`}
          >
            বাংলা
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-2 text-xs font-black rounded-md cursor-pointer ${lang === "en"
              ? "bg-[#0784BB] text-white"
              : "text-gray-400 hover:text-gray-800"
              }`}
          >
            ENGLISH
          </button>
        </div>
      </div>

      {/* HTML Content */}
      <div
        className="p-8 prose prose-gray max-w-none prose-headings:text-[#0784BB]"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Disclaimer */}
      <div className="m-6 p-4 bg-amber-50 rounded-md border border-amber-100">
        <p className="text-[10px] text-amber-900 font-bold italic opacity-80">
          DISCLAIMER: This information is for educational purposes only.
          Always consult a licensed healthcare professional.
        </p>
      </div>
    </div>
  )
}
