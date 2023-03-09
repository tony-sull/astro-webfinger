import { webfingers, output } from 'virtual:astro-webfinger'
import type { APIRoute } from 'astro'

const RESOURCE_REGEX = /^acct:(\S*)?@(\S*)$/

export const get: APIRoute = ({ request, site }) => {
  let webfinger: Record<string, unknown> | undefined = undefined
  
  if (output === 'static') {
    webfinger = webfingers.DEFAULT
  } else {
    const url = new URL(request.url)
    const acct = url.searchParams.get('resource')
    
    if (acct) {
      const [,user, domain] = RESOURCE_REGEX.exec(acct)

      if (domain === site.hostname) {
        webfinger = webfingers[user]
      }
    }
  }

  if (!webfinger) {
    return new Response(undefined, { status: 404 })
  }

  return new Response(JSON.stringify(webfinger), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
