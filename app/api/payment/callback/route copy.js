// import { NextResponse } from 'next/server';


// export async function POST(request) {
//     const { searchParams } = new URL(request.url);
//     const status = searchParams.get('status') || 'success';



//     const body = await request.formData();
//     const data = Object.fromEntries(body);
//     console.log("ssl fallback data :", data);



//     let targetPath = '/success';
//     if (status === 'failed') {
//         targetPath = '/failed';
//     } else if (status === 'cancle') {
//         targetPath = '/cancle';
//     }


//     const redirectUrl = new URL(targetPath, request.url);
//     return NextResponse.redirect(redirectUrl, 303);
// }
