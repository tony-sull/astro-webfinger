import type { Plugin } from 'vite'

export interface WebfingerOptions {
  username: string
  instance: string
}

export default function webfingerPlugin({
  username,
  instance,
}: WebfingerOptions): Plugin {
  const virtualModuleId = `virtual:astro-webfinger`
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    enforce: 'pre',
    name: 'virtual-webfinger-plugin',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `const webfinger = {
    subject: "acct:${username}@${instance}",
    aliases: [
        "https://${instance}/@${username}",
        "https://${instance}/users/${username}"
    ],
    links: [
        {
            rel: "http://webfinger.net/rel/profile-page",
            type: "text/html",
            href: "https://${instance}/@${username}"
        },
        {
            rel: "self",
            type: "application/activity+json",
            href: "https://${instance}/users/${username}"
        },
        {
            rel: "http://ostatus.org/schema/1.0/subscribe",
            template: "https://${instance}/authorize_interaction?uri={uri}"
        }
    ]
}

export default webfinger`
      }
    },
  }
}
