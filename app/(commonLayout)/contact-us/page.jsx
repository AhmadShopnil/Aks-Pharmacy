

import ContactUs from "@/app/components/ContactUs/ContactUs";
import { getSettings } from "@/lib/fetchApis";



export default async function ContactUsPage() {
    const settings = await getSettings()


    return (
        <div className="bg-slate-50 min-h-screen">
            <ContactUs settings={settings} />
        </div>
    );
}
