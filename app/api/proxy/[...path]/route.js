import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.AKS_API_BASE_URL || "https://admin.akspharma.com.bd";

const buildTargetUrl = (requestUrl, pathSegments) => {
  const url = new URL(requestUrl);
  let path = Array.isArray(pathSegments)
    ? pathSegments.join("/")
    : typeof pathSegments === "string"
      ? pathSegments
      : "";

  if (!path) {
    const prefix = "/api/proxy/";
    if (url.pathname.startsWith(prefix)) {
      path = url.pathname.slice(prefix.length);
    }
  }

  const targetUrl = new URL(API_BASE_URL);
  const basePath = targetUrl.pathname.replace(/\/$/, "");
  targetUrl.pathname = [basePath, path].filter(Boolean).join("/");
  targetUrl.search = url.search;

  return targetUrl.toString();
};

const filterHeaders = (headers) => {
  const filtered = new Headers();
  headers.forEach((value, key) => {
    if (key.toLowerCase() === "host") return;
    if (key.toLowerCase() === "content-length") return;
    if (key.toLowerCase() === "accept-encoding") return;
    filtered.set(key, value);
  });
  return filtered;
};

const forwardRequest = async (request, context = {}) => {
  try {
    const resolvedParams =
      context?.params && typeof context.params.then === "function"
        ? await context.params
        : context?.params;
    const pathSegments = resolvedParams?.path;
    const targetUrl = buildTargetUrl(request.url, pathSegments);
    const headers = filterHeaders(request.headers);

    const init = {
      method: request.method,
      headers,
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = await request.arrayBuffer();
    }

    const upstreamResponse = await fetch(targetUrl, init);
    const responseBody = await upstreamResponse.arrayBuffer();

    const responseHeaders = new Headers(upstreamResponse.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");
    responseHeaders.delete("transfer-encoding");

    return new NextResponse(responseBody, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Proxy request failed",
        error: error?.message || String(error),
      },
      { status: 502 }
    );
  }
};

export const GET = forwardRequest;
export const POST = forwardRequest;
export const PUT = forwardRequest;
export const PATCH = forwardRequest;
export const DELETE = forwardRequest;
export const OPTIONS = forwardRequest;
