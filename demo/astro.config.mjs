import { defineConfig } from 'astro/config'
import webfinger from 'astro-webfinger'

// https://astro.build/config
export default defineConfig({
  site: 'https://tonysull.co',
  integrations: [
    webfinger({
      instance: 'indieweb.social',
      username: 'tonysull',
    }),
  ],
})
