import OrderList from "@/app/components/Dashboard/OrderList";

export default function OrdersPage() {
    return (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-md border border-zinc-200 dark:border-zinc-800">
            <OrderList />
        </div>
    );
}
