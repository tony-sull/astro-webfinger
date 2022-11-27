import { defineConfig } from 'astro/config'
import buss from 'buss'

// https://astro.build/config
export default defineConfig({
  site: 'https://tonysull.co',
  integrations: [
    buss({
      mastodon: {
        instance: 'indieweb.social',
        username: 'tonysull',
      },
    }),
  ],
})
