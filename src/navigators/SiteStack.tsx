import React, { FC, useContext } from 'react'
import { Linking, Platform, Pressable } from 'react-native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'
import styled, { ThemeContext } from 'styled-components/native'
import { ListHeader } from '../components/ListHeader'
import { Sites } from '../Sites'
import { RootState } from '../store/reducers'
import { Authorize } from '../views/Authorize'
import { Deploy, DeployRouteProp } from '../views/Deploy'
import { Deploys, DeploysScreenRouteProp } from '../views/Deploys'
import { Profile } from '../views/Profile'
import { Site, SiteScreenRouteProp } from '../views/Site'

export type RootStackParamList = {
  Authorize: undefined
  Sites: undefined
  Site: { name: string; url: string; siteID: string }

  Deploys: { siteID: string; name: string }
  Deploy: { name: string; buildID: string }

  Submissions: { siteID: string; name: string }
  Submission: { submissionID: string; name: string }

  Profile: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

type SiteOptions = { route: SiteScreenRouteProp }
type DeployOptions = { route: DeployRouteProp }
type DeploysOptions = { route: DeploysScreenRouteProp }
type ScreenOptions = any

export const SiteStack: FC = () => {
  const { accentColor, primaryTextColor, mode } = useContext(ThemeContext)
  const accessToken = useSelector((state: RootState) => state.app.accessToken)

  const openSite = (url: string) => {
    Linking.openURL(`https://${url}`)
  }

  const headerSettings = (Platform.OS === 'ios'
    ? {
        headerTranslucent: true,
        headerLargeTitle: true,
        headerTopInsetEnabled: true,
        headerStyle: {
          backgroundColor: 'transparent',
          blurEffect: mode
        }
      }
    : {}) as ScreenOptions

  const headerSmallSettings = (Platform.OS === 'ios'
    ? {
        headerTranslucent: true,
        headerTopInsetEnabled: true,
        headerStyle: {
          backgroundColor: 'transparent',
          blurEffect: mode
        }
      }
    : {}) as ScreenOptions

  return (
    <Stack.Navigator
      initialRouteName={!accessToken ? 'Authorize' : 'Sites'}
      screenOptions={{
        headerTintColor: accentColor,
        headerTitleStyle: {
          color: primaryTextColor
        }
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
          stackPresentation: 'fullScreenModal'
        }}
        name="Authorize"
        component={Authorize}
      />
      <Stack.Screen
        options={{
          ...headerSettings,
          title: 'Vercelly',
          headerRight: () => <ListHeader />
        }}
        name="Sites"
        component={Sites}
      />
      <Stack.Screen
        name="Site"
        component={Site}
        options={({ route }: SiteOptions) => ({
          title: route.params.name,
          ...headerSettings,
          stackAnimation: 'slide_from_right',
          headerRight: () => (
            <Pressable onPress={() => openSite(route.params.url)}>
              <IconBrowser size={20} name="safari" brands />
            </Pressable>
          )
        })}
      />

      <Stack.Screen
        name="Deploys"
        component={Deploys}
        options={({ route }: DeploysOptions) => ({
          stackAnimation: 'slide_from_right',
          ...headerSmallSettings,
          title: route.params.name
        })}
      />
      <Stack.Screen
        name="Deploy"
        component={Deploy}
        options={({ route }: DeployOptions) => ({
          stackAnimation: 'slide_from_right',
          ...headerSmallSettings,
          title: route.params.name
        })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          ...headerSmallSettings
        }}
      />
    </Stack.Navigator>
  )
}

const IconBrowser = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.accentColor
}))``
