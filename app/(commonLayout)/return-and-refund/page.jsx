import { PageContainer } from "@/app/components/OtherPages/PageContainer"
import { getSinglePage } from "@/lib/fetchApis";

export const metadata = {
  title: "Return & Refund Policy | Your Pharmacy Name",
  description: "Learn about our return and refund policies."
}

export default async function RefundPolicyPage() {

  const pageDetails = await getSinglePage(250)
  // console.log("pageDetails", pageDetails)

  return (
    <PageContainer title={pageDetails?.name}>
      <div
        dangerouslySetInnerHTML={{ __html: pageDetails?.description }}
      />
    </PageContainer>
  )
}
