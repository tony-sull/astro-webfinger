export type WebfingerProps = {
  username: string
  instance: string
}

export function simpleWebfinger({ username, instance }: WebfingerProps) {
  return {
    subject: `acct:${username}@${instance}`,
    aliases: [
      `https://${instance}/@${username}`,
      `https://${instance}/users/${username}`,
    ],
    links: [
      {
        rel: `http://webfinger.net/rel/profile-page`,
        type: `text/html`,
        href: `https://${instance}/@${username}`,
      },
      {
        rel: `self`,
        type: `application/activity+json`,
        href: `https://${instance}/users/${username}"`,
      },
      {
        rel: `http://ostatus.org/schema/1.0/subscribe`,
        template: `https://${instance}/authorize_interaction?uri={uri}`,
      },
    ],
  }
}
