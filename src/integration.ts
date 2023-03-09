import type { AstroIntegration } from 'astro'
import webfingerPlugin, {
  type WebfingerOptions,
} from './vite-webfinger-plugin.js'

type Options = WebfingerOptions

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
