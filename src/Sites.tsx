import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useEffect, useState } from 'react'
import { ListRenderItem, Platform, RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getSites } from './api/vercel'
import { SiteListItem } from './components/SiteListItem'
import { SiteListItemSkeleton } from './components/SiteListItemSkeleton'
import { RootStackParamList } from './navigators/SiteStack'
import { RootState } from './store/reducers'
import { VercelSite } from './typings/vercel'

type SitesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>
type SitesScreenRouteProp = RouteProp<RootStackParamList, 'Sites'>

type Props = {
  navigation: SitesScreenNavigationProp
  route: SitesScreenRouteProp
}

const placeHolderItems = Array.from({ length: 10 }, (v, i) => i).map(
  (_, index) => ({
    key: `${index}`,
    custom_domain: 'domain',
    default_domain: 'default'
  })
)

export const Sites: FC<Props> = ({ navigation }) => {
  const accessToken = useSelector((state: RootState) => state.app.accessToken)
  const [init, setInit] = useState(false)

  const { data, isLoading, isSuccess, isError, refetch } = useQuery(
    ['sites', { accessToken }],
    getSites
  )

  useEffect(() => {
    if (!init && (isSuccess || isError)) {
      setInit(true)
    }
  }, [isLoading, init, isSuccess, isError])

  const renderItem: ListRenderItem<VercelSite> = ({ item }) => {
    const navigateToSite = () => {
      navigation.navigate('Site', {
        siteID: `${item.id}`,
        name: item.name,
        url: item.id
      })
    }

    if (isLoading) {
      return <SiteListItemSkeleton isLoading={isLoading} key={item.id} />
    }

    return (
      <SiteListItem
        key={item.id}
        navigateToSite={navigateToSite}
        screenshot_url={item.screenshot_url}
        custom_domain={item.name}
        default_domain={item.name}
        updatedAt={item.updatedAt}
      />
    )
  }

  return (
    <Container
      edges={
        Platform.OS === 'ios' ? ['top', 'right', 'left'] : ['right', 'left']
      }>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        scrollToOverflowEnabled
        refreshControl={
          <RefreshControl
            refreshing={init ? isLoading : false}
            onRefresh={refetch}
          />
        }
        data={isLoading ? placeHolderItems : data?.projects}
        renderItem={renderItem}
      />
    </Container>
  )
}

const Container = styled(SafeAreaView)`
  flex: 1;
`
