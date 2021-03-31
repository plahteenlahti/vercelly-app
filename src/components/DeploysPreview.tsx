import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { Deploy } from '../typings/vercel'
import { Card } from './Card'
import { DeployItem } from './DeployItem'
import { Text } from './Typography'

type Props = {
  deploys?: Array<Deploy>
  siteID: string
  siteName: string
}

export const DeploysPreview: FC<Props> = ({ deploys, siteID, siteName }) => {
  const navigation = useNavigation()

  const goToDeploys = () => {
    navigation.navigate('Deploys', {
      siteID,
      name: siteName
    })
  }

  return (
    <>
      <TitleContainer>
        <ThemedIcon name="code-branch" size={15} solid />
        <CardTitle type="Title 3">Deploys</CardTitle>
      </TitleContainer>
      <Card>
        {deploys?.map((deploy, index) => {
          const navigate = () => {
            navigation.navigate('Deploy', {
              name: siteName,
              buildID: deploy?.uid
            })
          }

          return (
            <DeployItem
              key={`${deploy.uid}_${index}`}
              last={index + 1 === deploys.length}
              deploy={deploy}
              navigate={navigate}
            />
          )
        })}
        <Container>
          <ShowMoreButton onPress={goToDeploys}>
            <ButtonText>Show more</ButtonText>
          </ShowMoreButton>
        </Container>
      </Card>
    </>
  )
}

const CardTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
`

type ItemProps = {
  last: boolean
}

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 8px 16px;
`

const ThemedIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``

const Container = styled.View``

const ShowMoreButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 16px;
`

const ButtonText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.accentColor};
  font-size: 13px;
  font-weight: bold;
`
