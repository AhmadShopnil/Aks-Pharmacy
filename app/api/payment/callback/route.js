import { NextResponse } from 'next/server';

/**
 * SSLCommerz redirects the user via a POST request after payment.
 * Next.js App Router pages do not support POST requests for rendering.
 * This API route handles the POST request from SSLCommerz and redirects
 * the user to the appropriate page using a GET request.
 */
export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'success';

    let targetPath = '/success';
    if (status === 'failed') {
        targetPath = '/failed';
    } else if (status === 'cancle') {
        targetPath = '/cancle';
    }

    // Use a 303 redirect to force the browser to perform a GET request to the target page.
    // This solves the issue where the page doesn't load initially on Vercel/Netlify.
    const redirectUrl = new URL(targetPath, request.url);
    return NextResponse.redirect(redirectUrl, 303);
}
