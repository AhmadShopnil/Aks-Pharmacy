import Image from "next/image";

export default function ShopBanner() {
    return (
        <div className="pt-6">
            <Image
                src="/images/banners/healthcare.png"
                alt="Fresh Food"
                width={1800}
                height={261}

            />

        </div>
    );
}
