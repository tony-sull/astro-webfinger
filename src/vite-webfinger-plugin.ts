import { AstroConfig } from 'astro'
import type { Plugin } from 'vite'
import { simpleWebfinger, type WebfingerProps } from './utils/simpleWebfinger'

export type WebfingerOptions =
  | WebfingerProps
  | { [username: string]: WebfingerProps }

export default function webfingerPlugin(
  options: WebfingerOptions,
  config: AstroConfig
): Plugin {
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
        const accounts =
          options.instance && options.username
            ? {
                DEFAULT: options,
              }
            : options

        const webfingers = Object.entries(accounts).reduce(
          (acc, [key, value]) => {
            acc[key] = simpleWebfinger(value)

            return acc
          },
          {}
        )

        return `export const webfingers = ${JSON.stringify(webfingers)}

export const output = "${config.output}"`
      }
    },
  }
}
