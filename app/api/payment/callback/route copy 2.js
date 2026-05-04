import { NextResponse } from 'next/server';


export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'success';



    try {
        const body = await request.formData();

        // Forward the data to the backend IPN API
        // SSLCommerz data is sent in the request body as FormData
        const ipnRes = await fetch('https://admin.akspharma.com.bd/api/v1/payments/ipn', {
            method: 'POST',
            body: body,
        });


        console.log("IPN Response:", ipnRes);
    } catch (error) {
        console.error("IPN Forwarding Error:", error);
    }

    let targetPath = '/success';
    if (status === 'failed') {
        targetPath = '/failed';
    } else if (status === 'cancle') {
        targetPath = '/cancle';
    }

    const redirectUrl = new URL(targetPath, request.url);
    return NextResponse.redirect(redirectUrl, 303);
}
