# `astro-webfinger`

This [Astro integration](https://docs.astro.build/en/guides/integrations-guide/) allows any Mastodon instance to discover your Mastodon profile directly from your own domain.

**Try it out** In your favorite Mastodon instance, search for `@toot@tonysull.co` and you'll find my Mastodon profile.

## Why?

Hosting a live Mastodon site on your own domain is no easy task. If you aren't ready to take that leap you can use your own domain as an alias to point to your Mastodon profile.

This uses the [WebFinger](https://webfinger.net/) protocol to attach information to an email, in this case to point an email address on your own domain to your Mastodon profile.

For example, I have a Mastodon profile at [@tonysull@indieweb.social](https://indieweb.social/@tonysull). The `astro-webfinger` integration is added to my Astro site at [https://tonysull.co](https://tonysull.co), allowing any Mastodon instance to discover my account by searching for `toot@tonysull.co`.

## Installation

```bash
# npm
npm i @astrojs/rss
# yarn
yarn add @astrojs/rss
# pnpm
pnpm i @astrojs/rss
```

## Configuration

To configure this integration, pass a `config` object to the `webfinger()` function call in `astro.config.mjs`.

```js
import webfinger from 'astro-webfinger'

export default defineConfig({
  integrations: [
    webfinger({
      mastodon: {
        instance: 'myinstance.social',
        username: 'myusername',
      },
    }),
  ],
})
```

## What's next?

### Server-Side Rendering (SSR)

Currently, `astro-webfinger` will return your Mastodon profile regardless of the username that was actually searched. ex: search for `fake@tonysull.co` and you will still discover my Mastodon profile.

A future release of `astro-webfinger` will add an SSR mode that allows you to configure what usernames should be recognized insearch results. This will also allow you to alias _multiple Mastodon profiles_ from the your own domain.

## Credits

Inspired by [`Jekyll::MastodonWebfinger`](https://github.com/philnash/jekyll-mastodon_webfinger)

**Related articles**

[Maarten Balliauw's](https://maartenballiauw.be) blog post [Mastodon on your own domain without hosting a server](https://blog.maartenballiauw.be/post/2022/11/05/mastodon-own-donain-without-hosting-server.html)

[Lindsay Wardell's](https://lindsaykwardell.com) blog post [Integrate Mastodon with Astro](https://www.lindsaykwardell.com/blog/integrate-mastodon-with-astro)
