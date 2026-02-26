import { BASE_URL } from "./baseUrl"



export async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.headers || {}),
      },
    })

    if (!res.ok) {
      console.error("API ERROR:", res.status, res.statusText, url)
      return { ok: false, data: null }
    }

    const contentType = res.headers.get("content-type")

    if (!contentType?.includes("application/json")) {
      console.error("NON-JSON RESPONSE:", contentType, url)
      return { ok: false, data: null }
    }

    const json = await res.json()
    return { ok: true, data: json }

  } catch (error) {
    console.error("FETCH FAILED:", url, error)
    return { ok: false, data: null }
  }
}



export async function getSingleProduct(slug) {
  const url = `${BASE_URL}/post?slug=${slug}`

  const { ok, data } = await safeFetch(url, {
    next: { revalidate: 30 },
  })

  return ok ? data?.data || {} : {}
}

// export async function getSingleProduct(slug) {
//   const url = `${BASE_URL}/post?slug=${slug}`;
//       console.log("url",url);
//   const res = await fetch(url, {
//     next: { revalidate: 30 },
//   })
// console.log("from api call",res)
//   if (!res.ok) return {}

//   const json = await res.json()
//   return json?.data || {}
// }



export async function getSliders() {
  const url = `${BASE_URL}/posts?term_type=slider&order_by=order_column:asc`
  const { ok, data } = await safeFetch(url, {
    next: { revalidate: 30 },
  })

  return ok ? data?.data || [] : []
}

export async function getProducts() {
  const url = `${BASE_URL}/posts?term_type=products&order_by=order_column&order_direction=desc&per_page=15`
  const { ok, data } = await safeFetch(url, {
    next: { revalidate: 30 },
  })

  return ok ? data?.data || [] : []
}
// &order_by=order_column:asc&per_page=15
export async function getCategories(type) {
  const url = `${BASE_URL}/categories?taxonomy_type=${type}`
//  const url = `${BASE_URL}/api/v1/categories?taxonomy_type=${type}&order_by=order_column&order_direction=desc`
  const { ok, data } = await safeFetch(url, {
    next: { revalidate: 30 },
  })

  return ok ? data?.data || [] : []
}
// ?taxonomy_type=product_categories&limit=10&order_by=order_column&order_direction=desc