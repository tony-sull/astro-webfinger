import webfinger from 'virtual:astro-webfinger'
import type { APIRoute } from 'astro'

export const get: APIRoute = () => {
  return new Response(JSON.stringify(webfinger), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
