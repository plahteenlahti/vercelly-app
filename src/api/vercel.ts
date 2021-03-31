import { QueryFunctionContext } from 'react-query'
import {
  Team,
  Deploy,
  VercelSite,
  Submission,
  User,
  Build
} from '../typings/vercel'

const BASE_URL = 'https://api.vercel.com'

export const getSite = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<VercelSite> => {
  const [_, { siteID, accessToken }] = queryKey
  try {
    const response = await fetch(`${BASE_URL}/v1/projects/${siteID}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getSiteDeploys = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<{ deployments: Array<Deploy> }> => {
  const [_, { siteID, accessToken }] = queryKey

  try {
    const response = await fetch(
      `${BASE_URL}/v5/now/deployments?projectId=${siteID}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    return response.json()
  } catch (error) {
    return error
  }
}

export const getSiteSubmissions = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<Array<Submission>> => {
  const [_, { siteID, accessToken }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/sites/${siteID}/submissions`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getSubmission = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; submissionID: string }]
>): Promise<Submission> => {
  const [_, { submissionID, accessToken }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/submissions/${submissionID}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getSiteMeta = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<any> => {
  const [_, { siteID, accessToken }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/forms`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getUser = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<User> => {
  const [_, { accessToken }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/www/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getTeams = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<{ teams: Array<Team> }> => {
  const [_, { accessToken }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/v1/teams`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

type ProjectsResponse = {
  pagination: {
    count: number
    next: number
    prev: number
  }
  projects: Array<VercelSite>
}

export const getSites = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string }]
>): Promise<ProjectsResponse> => {
  const [_, { accessToken }] = queryKey
  try {
    const response = await fetch(`${BASE_URL}/v4/projects`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}
export const getDeploy = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; buildID: string }]
>): Promise<Deploy> => {
  const [_, { accessToken, buildID }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/v11/now/deployments/${buildID}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const getBuilds = async ({
  queryKey
}: QueryFunctionContext<
  ['_key', { accessToken: string; siteID: string }]
>): Promise<Array<Build>> => {
  const [_, { accessToken, siteID }] = queryKey

  try {
    const response = await fetch(`${BASE_URL}/sites/${siteID}/builds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}
