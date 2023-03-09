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

To configure this integration, pass a `config` object to the `webfinger()` function call in `astro.config.mjs` - both static (SSG) builds an server-rendered (SSR) builds.

### Static builds (SSG)

The Webfinger protocol actually depends on using query parameters when searching for accounts. Because query parameters aren't actually supported in static builds, only one account can be provided to the account.

> :caution: Query parameters won't actually be used at all when your account is requested, your account information will always be returned for any Webfinger request regardless of what was being searched for.

```js
import webfinger from 'astro-webfinger'

export default defineConfig({
  integrations: [
    webfinger({
      instance: 'myinstance.social',
      username: 'myusername',
    }),
  ],
})
```

### Server-rendering (SSR)

With server-rendering the Webfinger query parameters can be used to actually match accounts. If the same integration options as above are passed during an SSR build, it will function the same as SSG and always return your account regardless of what was searched for.

To take full advantage of the benefits of SSR, the integration can be given an object mapping local usernames **on your own domain** to the related Webfinger accounts.

```js
import webfinger from 'astro-webfinger'

export default defineConfig({
  site: 'https://tonysull.co',
  integrations: [
    webfinger({
      tony: {
        instance: 'myinstance.social',
        username: 'tony',
      },
      nottony: {
        instance: 'secret.social',
        username: 'someoneelse',
      },
    }),
  ],
})
```

In the example above, a search for:

- `tony@tonysull.co` would return account information for `@tony@myinstance.social`
- `nottony@tonysull.co` would return account information for `@someoneelse@secret.social`
- all other searches would return a 404 error

## What's next?

### Fine-grained control of the Webfinger redirect

Currently the list of aliases and links in the Webfinger redirect are hard-coded for basic support. I'm definitely not a power user when it comes to the Fediverse but could see there being good reason to support custom aliases and links!

Have something else in mind? Start a [discussion thread](https://github.com/tony-sull/astro-webfinger/discussions) open an [issue](https://github.com/tony-sull/astro-webfinger/issues), or file a [pull request](https://github.com/tony-sull/astro-webfinger/pulls) if you're able to contribute code!

## Credits

Inspired by [`Jekyll::MastodonWebfinger`](https://github.com/philnash/jekyll-mastodon_webfinger)

**Related articles**

[Maarten Balliauw's](https://maartenballiauw.be) blog post [Mastodon on your own domain without hosting a server](https://blog.maartenballiauw.be/post/2022/11/05/mastodon-own-donain-without-hosting-server.html)

[Lindsay Wardell's](https://lindsaykwardell.com) blog post [Integrate Mastodon with Astro](https://www.lindsaykwardell.com/blog/integrate-mastodon-with-astro)
