import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getSiteDeploys } from '../api/vercel'
import { DeployItem } from '../components/DeployItem'
import { RootStackParamList } from '../navigators/SiteStack'
import { RootState } from '../store/reducers'
import { Deploy } from '../typings/vercel'

type DeploysScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Deploys'
>
export type DeploysScreenRouteProp = RouteProp<RootStackParamList, 'Deploys'>

type Props = {
  navigation: DeploysScreenNavigationProp
  route: DeploysScreenRouteProp
}

export const Deploys: FC<Props> = ({ route, navigation }) => {
  const accessToken = useSelector((state: RootState) => state.app.accessToken)
  const { siteID } = route.params

  const { data } = useQuery(
    ['deploys', { siteID, accessToken }],
    getSiteDeploys
  )

  console.log(data?.deployments)

  const renderItem: ListRenderItem<Deploy> = ({ item: deploy, index }) => {
    const navigate = () => {
      navigation.navigate('Deploy', {
        name: `${deploy?.name}`,
        buildID: `${deploy?.uid}`
      })
    }

    return (
      <DeployItem
        last={index + 1 === data?.deployments?.length}
        navigate={navigate}
        deploy={deploy}
        key={`${deploy?.uid}`}
      />
    )
  }

  return (
    <Container>
      <List
        data={data?.deployments}
        keyExtractor={(deploy) => deploy?.uid}
        renderItem={renderItem}
      />
    </Container>
  )
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.secondaryBackground};
`

const List = styled(FlatList as new () => FlatList<Deploy>)`
  padding: 0px 16px;
`
