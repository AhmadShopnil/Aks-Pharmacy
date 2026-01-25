export const demoOrders = [
    {
        id: "ORD-2024-001",
        date: "2024-01-15",
        status: "Delivered",
        total: 1250.50,
        paymentMethod: "Cash on Delivery",
        shippingAddress: "House 12, Road 5, Dhanmondi, Dhaka",
        items: [
            { id: 1, name: "Napa Extend 500mg", price: 50.00, quantity: 2, image: "/images/products/napa.jpg" },
            { id: 2, name: "Sergel 20mg", price: 120.00, quantity: 1, image: "/images/products/sergel.jpg" },
        ]
    },
    {
        id: "ORD-2024-002",
        date: "2024-01-20",
        status: "Processing",
        total: 850.00,
        paymentMethod: "bKash",
        shippingAddress: "House 12, Road 5, Dhanmondi, Dhaka",
        items: [
            { id: 3, name: "Ace 500mg", price: 20.00, quantity: 5, image: "/images/products/ace.jpg" },
        ]
    },
    {
        id: "ORD-2024-003",
        date: "2024-01-22",
        status: "Shipped",
        total: 2100.00,
        paymentMethod: "Credit Card",
        shippingAddress: "House 12, Road 5, Dhanmondi, Dhaka",
        items: [
            { id: 4, name: "Ceevit 250mg", price: 45.00, quantity: 10, image: "/images/products/ceevit.jpg" },
        ]
    }
];

export const demoUser = {
    name: "Samrat Khan",
    email: "test@example.com",
    phone: "+880 1712 345678",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    city: "Dhaka",
    zip: "1209",
    country: "Bangladesh"
};
