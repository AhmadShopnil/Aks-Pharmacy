import { PageContainer } from "@/app/components/OtherPages/PageContainer"

export const metadata = {
  title: "Return & Refund Policy | Your Pharmacy Name",
  description: "Learn about our return and refund policies."
}

export default function RefundPolicyPage() {
  return (
    <PageContainer title="Return & Refund Policy">
      <p>
        At <strong>Your Pharmacy Name</strong>, we prioritize customer safety
        and satisfaction. Please read our policy carefully.
      </p>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          1. Non-Returnable Items
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Prescription medicines</li>
          <li>Opened or used products</li>
          <li>Medical devices once unsealed</li>
          <li>Perishable items</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          2. Eligible Returns
        </h2>
        <p>
          Returns are accepted only if the product is damaged, expired, or
          incorrect at the time of delivery.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          3. Return Timeframe
        </h2>
        <p>
          Issues must be reported within <strong>24–48 hours</strong> of
          delivery.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          4. Refund Process
        </h2>
        <p>
          Approved refunds will be credited to the original payment method
          within 7–10 business days.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          5. Order Cancellation
        </h2>
        <p>
          Orders can be canceled before dispatch only. Shipped orders cannot
          be canceled.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          6. Contact Us
        </h2>
        <p>
          Email: support@yourpharmacy.com <br />
          Phone: +880XXXXXXXXX
        </p>
      </div>

      <p className="text-sm text-gray-500 pt-4">
        Last updated: [Insert Date]
      </p>
    </PageContainer>
  )
}
