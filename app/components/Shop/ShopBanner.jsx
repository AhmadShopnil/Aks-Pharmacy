import Image from "next/image";

export default function ShopBanner({ category }) {


    return (
        <div className="pt-2">
            <Image
                src={category?.image}
                alt="Fresh Food"
                width={1800}
                height={261}

            />

        </div>
    );
}
