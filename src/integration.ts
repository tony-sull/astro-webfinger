import type { AstroIntegration } from 'astro'
import { type WebfingerProps } from './utils/simpleWebfinger.js'
import webfingerPlugin, {
  type WebfingerOptions,
} from './vite-webfinger-plugin.js'

interface DeprecatedOptions {
  /** @deprecated Use `webfinger({ instance, username }) instead */
  mastodon?: WebfingerProps
  instance: never
  username: never
}

type Options = WebfingerOptions | DeprecatedOptions

export default function createIntegration(
  options: Options | undefined
): AstroIntegration {
  // See the Integration API docs for full details
  // https://docs.astro.build/en/reference/integrations-reference/
  return {
    name: '@example/my-integration',
    hooks: {
      'astro:config:setup': ({ injectRoute, updateConfig, config }) => {
        if (!options) {
          return
        }

        if ('mastodon' in options) {
          if (config.output === 'static') {
            throw new Error(
              `[astro-webfinger] nested "mastodon" objects are were deprecated in v1.0.0 and removed in v2.0.0
        
Pass the { instance, username } object directly to the integration for static builds`
            )
          } else {
            ;`[astro-webfinger] nested "mastodon" objects are were deprecated in v1.0.0 and removed in v2.0.0
        
Pass a map of user accounts similar to { user: { instance, username } } directly to the integration for SSR builds`
          }
        }

        if (
          config.output === 'static' &&
          Array.isArray(options) &&
          options.length > 1
        ) {
          throw new Error(`[astro-webfinger] only supports one Webfinger account in static builds.
          
See Astro's server-side rendering docs if you need to provide an array of multiple accounts.

https://docs.astro.build/en/guides/server-side-rendering/`)
        }

        updateConfig({
          vite: {
            plugins: [webfingerPlugin(options, config)],
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
