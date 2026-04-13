
import { PageContainer } from "@/app/components/OtherPages/PageContainer"
import { getSinglePage } from "@/lib/fetchApis"


export const metadata = {
  title: "Terms & Conditions | Your Pharmacy Name",
  description: "Read the terms and conditions of using our pharmacy website."
}

export default async function PrivacyPage() {
  const pageDetails = await getSinglePage(251)
  return (
    <PageContainer title={pageDetails?.name}>
      <div
        dangerouslySetInnerHTML={{ __html: pageDetails?.description }}
      />
    </PageContainer>
  )
}

