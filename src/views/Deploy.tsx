import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useEffect, useState } from 'react'
import { Platform, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getDeploy } from '../api/vercel'
import { DataField } from '../components/DataField'
import { RootStackParamList } from '../navigators/SiteStack'
import { RootState } from '../store/reducers'
import { Deploy as TypeDeploy } from '../typings/vercel'

type DeployScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Deploy'
>
export type DeployRouteProp = RouteProp<RootStackParamList, 'Deploy'>

type Props = {
  navigation: DeployScreenNavigationProp
  route: DeployRouteProp
}

type Key = keyof TypeDeploy

const makeRow = (key: Key, value: unknown) => {
  return <DataField key={key as string} title={key as string} value={value} />
}

export const Deploy: FC<Props> = ({
  route: {
    params: { buildID }
  }
}) => {
  const accessToken = useSelector((state: RootState) => state.app.accessToken)
  const [init, setInit] = useState(false)

  const { data, isLoading, refetch, isSuccess, isError } = useQuery(
    ['build', { buildID, accessToken }],
    getDeploy
  )

  useEffect(() => {
    if (!init && (isSuccess || isError)) {
      setInit(true)
    }
  }, [isLoading, init, isSuccess, isError])

  return (
    <Container
      edges={
        Platform.OS === 'ios' ? ['top', 'right', 'left'] : ['right', 'left']
      }>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        scrollToOverflowEnabled
        refreshControl={
          <RefreshControl
            refreshing={init ? isLoading : false}
            onRefresh={refetch}
          />
        }>
        {data
          ? Object.keys(data).map((value: string) => {
              const key = value as Key
              return makeRow(key, data[key])
            })
          : null}
      </ScrollView>
    </Container>
  )
}

const Container = styled(SafeAreaView)`
  flex: 1;
`

const ScrollView = styled.ScrollView`
  background-color: ${({ theme }) => theme.primaryBackground};
`
