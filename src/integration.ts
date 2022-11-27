import type { AstroIntegration } from 'astro'
import webfingerPlugin, { MastodonOptions } from './vite-webfinger-plugin.js'

export interface WebfingerOptions {
  mastodon?: MastodonOptions
}

export default function createIntegration({
  mastodon,
}: WebfingerOptions = {}): AstroIntegration {
  // See the Integration API docs for full details
  // https://docs.astro.build/en/reference/integrations-reference/
  return {
    name: '@example/my-integration',
    hooks: {
      'astro:config:setup': ({ injectRoute, updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [mastodon && webfingerPlugin(mastodon)].filter(Boolean),
          },
        })

        injectRoute({
          pattern: '.well-known/webfinger',
          entryPoint: 'astro-webfinger/routes/webfinger.ts',
        })
      },
    },
  }
}
