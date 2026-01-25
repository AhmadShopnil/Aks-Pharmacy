import Container from "@/app/components/Common/Container"
import { PageContainer } from "@/app/components/OtherPages/PageContainer"


export const metadata = {
  title: "Terms & Conditions | Your Pharmacy Name",
  description: "Read the terms and conditions of using our pharmacy website."
}

export default function TermsPage() {
  return (
    <PageContainer title="Terms & Conditions">
      <p>
        Welcome to <strong>Your Pharmacy Name</strong>. By accessing or using
        our website and services, you agree to comply with the following terms
        and conditions.
      </p>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          1. Use of Website
        </h2>
        <p>
          This website is intended for lawful use only. You agree not to misuse
          our services or attempt unauthorized access.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          2. Medical Disclaimer
        </h2>
        <p>
          All information provided on this website is for general informational
          purposes only and does not substitute professional medical advice.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          3. Product Information
        </h2>
        <p>
          Product descriptions, pricing, and availability may change without
          notice. Images are for reference only.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          4. Orders & Payments
        </h2>
        <p>
          Orders are subject to availability and confirmation. Full payment is
          required before order processing.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          5. Prescription Medicines
        </h2>
        <p>
          Valid prescriptions are required for prescription medicines. We
          reserve the right to cancel orders if prescriptions are invalid.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          6. Limitation of Liability
        </h2>
        <p>
          We are not responsible for any damages arising from the use of our
          products or website.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          7. Changes to Terms
        </h2>
        <p>
          We may update these terms at any time. Continued use of the website
          means you accept the updated terms.
        </p>
      </div>

      <p className="text-sm text-gray-500 pt-4">
        Last updated: [Insert Date]
      </p>
    </PageContainer>
  )
}

