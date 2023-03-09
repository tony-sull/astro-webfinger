declare module 'virtual:astro-webfinger' {
  type Webfinger = Record<string, unknown>
  type Output = 'static' | 'server'
  export const webfingers: {
    DEFAULT?: Webfinger
    [username: string]: Webfinger
  }
  export const output: Output
}
