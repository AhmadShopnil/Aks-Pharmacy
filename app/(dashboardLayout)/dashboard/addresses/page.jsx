import AddressManager from "@/app/components/Dashboard/AddressManager";
import React from "react";

export const metadata = {
    title: "My Addresses | Dashboard",
};

const AddressPage = () => {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen">
            <AddressManager />
        </div>
    );
};

export default AddressPage;
