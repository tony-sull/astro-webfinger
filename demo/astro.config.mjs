import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import webfinger from 'astro-webfinger'

// https://astro.build/config
export default defineConfig({
  site: 'https://tonysull.co',
  adapter: node({ mode: 'standalone' }),
  output: 'server',
  integrations: [
    webfinger({
      tony: {
        instance: 'indieweb.social',
        username: 'tonysull',
      },
      astro: {
        instance: 'm.webtoo.ls',
        username: 'astrodotbuild',
      },
    }),
  ],
})
