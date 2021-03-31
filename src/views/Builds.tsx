import React, { FC } from 'react'
import { RefreshControl } from 'react-native'
import { useQuery } from 'react-query'
import styled from 'styled-components/native'
import { VercelSite } from '../typings/vercel'

type Props = {}

const getSite = async (): Promise<VercelSite> => {
  try {
    const response = await fetch('https://api.netlify.com/api/v1/deploys', {
      headers: {
        Authorization: 'Bearer rsrIVhvoXjV2Yb_cjBx4_6YR65J_l6mKZRSrhZf0uuQ'
      }
    })

    return response.json()
  } catch (error) {
    return error
  }
}

export const Builds: FC<Props> = ({}) => {
  const { isLoading, refetch } = useQuery(['site'], getSite)

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
    </Container>
  )
}

const Container = styled.SafeAreaView`
  flex: 1;
`

const ScrollView = styled.ScrollView`
  background-color: white;
  flex: 1;
`

const Title = styled.Text``

const SitePreview = styled.Image`
  width: 100%;
  height: 100%;
  min-height: 250px;
`
