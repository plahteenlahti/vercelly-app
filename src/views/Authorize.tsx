import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { authorize } from 'react-native-app-auth'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { AuthorizeButton } from '../components/AuthorizeButton'
import { RootStackParamList } from '../navigators/SiteStack'
import { setAccessToken } from '../store/reducers/app'
import configuration from 'react-native-ultimate-config'

const { width } = Dimensions.get('window')

type AuthorizationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Authorize'
>
type AuthorizationScreenRouteProp = RouteProp<RootStackParamList, 'Authorize'>

type Props = {
  navigation: AuthorizationScreenNavigationProp
  route: AuthorizationScreenRouteProp
}

const image = require('../assets/images/logo.png')

export const Authorize: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch()
  const config = {
    clientId: configuration.clientId,
    clientSecret: configuration.clientSecret,
    redirectUrl: configuration.redirectUrl,
    usePKCE: false,
    scopes: [],
    serviceConfiguration: {
      authorizationEndpoint: 'https://vercel.com/oauth/authorize',
      tokenEndpoint: 'https://api.vercel.com/v2/oauth/access_token'
    }
  }

  const authenticateWithVercel = async () => {
    try {
      const { accessToken: newAccessToken } = await authorize(config)
      dispatch(setAccessToken(newAccessToken))
      navigation.replace('Sites')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <ScrollView>
        <Card>
          <IconContainer>
            <Icon resizeMode="cover" source={image} />
          </IconContainer>
          <Title>Vercelly</Title>
          <Summary>
            Vercelly helps you to manage your Vercel projects and deployments.
          </Summary>
        </Card>
        <ButtonContainer>
          <AuthorizeButton onPress={authenticateWithVercel} />
        </ButtonContainer>
      </ScrollView>
    </Container>
  )
}

const Card = styled.View`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.secondaryBackground};
  margin: 16px;
  padding: 16px;
  align-items: center;
  elevation: 3;
`

const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: 40px;
  width: ${width}px;
  background-color: ${({ theme }) => theme.primaryBackground};
`

const Title = styled.Text`
  font-size: 32px;
  color: ${({ theme }) => theme.primaryTextColor};
`

const Summary = styled.Text`
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.primaryTextColor};
  margin-bottom: 16px;
  line-height: 24px;
`

const IconContainer = styled.View`
  margin-top: 50px;
  height: 64px;
  width: 64px;
  overflow: hidden;
  border-radius: 18px;
  margin-bottom: 30px;
  border: 3px solid black;
`

const Icon = styled.Image`
  height: 100%;
  width: 100%;
`

const ButtonContainer = styled.View`
  margin: 32px 0px;
  padding: 0px 16px;
  flex-direction: row;
`
