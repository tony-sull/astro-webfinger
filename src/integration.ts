import type { AstroIntegration } from 'astro'
import webfingerPlugin, { WebfingerOptions } from './vite-webfinger-plugin.js'

/** 
 * v1.0.0 nested account details in a Mastodon object
 * This has been deprecated in v1.1.0 and will be removed in v2.0
 */
interface DeprecatedOptions {
  /** @deprecated Use `webfinger({ instance, username }) instead */
  mastodon?: WebfingerOptions
  instance: never
  username: never
}

interface IntegrationOptions extends WebfingerOptions {
  mastodon: never
}

export type Options = DeprecatedOptions | IntegrationOptions

export default function createIntegration(options: Options | undefined): AstroIntegration {
  // until v2.0, handle backwards compatibility for options.mastodon
  let resolvedOptions = options?.instance && options?.username
    ? { instance: options.instance, username: options.username }
    : options?.mastodon
      ? options.mastodon
      : undefined

  if (!!options?.mastodon) {
    console.warn('[astro-webfinger] `config.mastodon` is deprecated, use `webfinger({ instance, username })` instead.')
  }

  // See the Integration API docs for full details
  // https://docs.astro.build/en/reference/integrations-reference/
  return {
    name: '@example/my-integration',
    hooks: {
      'astro:config:setup': ({ injectRoute, updateConfig }) => {
        if (!resolvedOptions) {
          return
        }

        updateConfig({
          vite: {
            plugins: [webfingerPlugin(resolvedOptions)],
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
