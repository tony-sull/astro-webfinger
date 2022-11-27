import webfinger from 'virtual:buss-webfinger'
import type { APIRoute } from 'astro'

export const get: APIRoute = () => {
  return new Response(JSON.stringify(webfinger))
}
