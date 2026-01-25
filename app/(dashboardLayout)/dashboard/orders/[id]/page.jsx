import OrderDetails from "@/app/components/Dashboard/OrderDetails";

export default async function OrderDetailsPage({ params }) {
    const { id } = await params;

    return (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-md border border-zinc-200 dark:border-zinc-800">
            <OrderDetails orderId={id} />
        </div>
    );
}
