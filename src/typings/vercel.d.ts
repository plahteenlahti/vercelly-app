export type VercelSite = {
  id: string
  name: string
  accountId: string
  createdAt: number
  updatedAt: number
  targets: {
    [key in string]: {
      alias: string[]
      aliasAssigned: number
      builds: unknown[]
      createdAt: number
      createdIn: string
      creator: {
        uid: string
        email: string
        username: string
        githubLogin: string
      }
      deploymentHostname: string
      forced: false
      id: string
      meta: {
        githubCommitAuthorName: string
        githubCommitMessage: string
        githubCommitOrg: string
        githubCommitRef: string
        githubCommitRepo: string
      }
      name: string
      plan: string
      private: true
      readyState: string
      target: string
      teamId: null
      type: string
      url: string
      userId: string
      withCache: false
    }
  }
  link?: {
    createdAt: number
    deployHooks: []
    gitCredentialId: string
    org: string
    repo: string
    repoId: number
    type: string
    updatedAt: number
  }
  latestDeployments: Deploy[]
}

export type Deploy = {
  uid: string
  name: string
  url: string
  created: number
  creator: {}
  state: 'QUEUED' | 'BUILDING' | 'READY' | 'ERROR'
  meta: {}
  target: string
  aliasError: string
  aliasAssigned: boolean
}

export type User = {
  user?: {
    uid?: string
    email?: string
    name?: string
    username?: string
    avatar?: string
    platformVersion?: number
    billing?: {
      plan?: string
      period?: null
      trial?: null
      cancelation?: null
      addons?: null
    }
    bio?: string
    website?: string
    profiles?: [
      {
        service?: string
        link?: string
      }
    ]
  }
}

export type Team = {
  id: string
  slug: string
  name: string
  creatorId: string
  created: string
  avatar: null | string
}

export type Submission = {
  body?: string
  company?: null
  created_at?: string
  data?: {
    email?: string
    ip?: string
    message?: string
    name?: string
    referrer?: string
    subject?: string
    user_agent?: string
  }
  email?: string
  first_name?: string
  form_id?: string
  form_name?: string
  human_fields?: {
    Email?: string
    Message?: string
    Name?: string
    Subject?: string
  }
  id?: string
  last_name?: string
  name?: string
  number?: number
  ordered_human_fields?: { title: string; name: string; value: string }[]
  site_url?: string
  summary?: string
  title?: string
}

export type Build = {
  id: string
  deploy_id: string
  sha: string
  done: boolean
  error: string
  created_at: string
}
