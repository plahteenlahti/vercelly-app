import React, { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { VercelSite } from '../typings/vercel.d'
import { Card } from './Card'
import { CardTitle } from './CardTitle'

type Props = {
  site?: VercelSite
}

export const BuildSettings: FC<Props> = ({ site }) => {
  return (
    <>
      <CardTitle icon="info-circle" title="Build settings" />
      <Card>
        <Row>
          <Icon name="terminal" />
          <Title>{site?.accountId}</Title>
        </Row>
        <Row>
          <Icon name="terminal" />
          <Title>{site?.accountId}</Title>
        </Row>
        <Row>
          <Icon name="server" />
          <Title>{site?.accountId}</Title>
        </Row>
      </Card>
    </>
  )
}

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 4px 0px;
  padding-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
`

const Icon = styled(FontAwesome5).attrs(({ theme }) => ({
  size: 12,
  color: theme.secondaryTextColor
}))`
  margin-right: 8px;
`

const Title = styled.Text`
  color: ${({ theme }) => theme.primaryTextColor};
`
