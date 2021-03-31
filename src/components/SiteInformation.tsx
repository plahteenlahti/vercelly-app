import React, { FC } from 'react'
import { VercelSite } from '../typings/vercel'
import styled from 'styled-components/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Card } from './Card'
import { Text } from './Typography'
import { Linking } from 'react-native'
import { localizedFormat, localizedRelativeFormat } from '../utilities/time'
import { CardTitle } from './CardTitle'

type Props = {
  site: VercelSite | undefined
  name?: string
}

const Summary: FC<Props> = ({ site }) => {
  const repoUrl = site?.link?.type
  const lastPublish = site?.updatedAt
  const ownedBy = site?.name

  const openRepo = () => {
    switch (site?.link?.type) {
      case 'github':
        Linking.openURL(`https://github.com/${site.link.org}/${site.link.repo}`)
        break
      default:
        break
    }
  }

  return (
    <SummaryText>
      {repoUrl ? (
        <Text type="Body">
          Deploys from <Link onPress={openRepo}>{site?.link?.type}</Link>.{' '}
        </Text>
      ) : null}
      {ownedBy ? <Text type="Body">Owned by {ownedBy}.</Text> : null}{' '}
      {lastPublish ? (
        <Text type="Body">
          Last published on {localizedFormat(new Date(lastPublish), 'MMM dd.')}
        </Text>
      ) : null}
    </SummaryText>
  )
}

export const SiteInformation: FC<Props> = ({ site, name }) => {
  const openSite = () => {
    Linking.openURL(`${site?.name}`)
  }

  const createdAt = site?.createdAt
    ? localizedRelativeFormat(new Date(site?.createdAt), new Date())
    : ''

  const updatedAt = site?.updatedAt
    ? localizedRelativeFormat(new Date(site?.updatedAt), new Date())
    : ' '

  return (
    <>
      <CardTitle icon="info-circle" title="Project information" />
      <Card>
        <Row>
          <Summary site={site} />
        </Row>
        <Row>
          <LinkIcon />
          <Title onPress={openSite}>{name}</Title>
        </Row>
        <Row>
          <ClockIcon />
          {site?.createdAt && <Title>{`Site created ${createdAt}`}</Title>}
        </Row>
        <Row>
          <ClockIcon />
          {site?.updatedAt && <Title>{`Last publish ${updatedAt}`}</Title>}
        </Row>
      </Card>
    </>
  )
}

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 8px 0px;
  padding-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
`

const LinkIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'link',
  size: 12,
  color: theme.secondaryTextColor
}))`
  margin-right: 8px;
`

const ClockIcon = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'clock',
  size: 12,
  color: theme.secondaryTextColor
}))`
  margin-right: 8px;
`

const Title = styled.Text`
  color: ${({ theme }) => theme.primaryTextColor};
`

const Link = styled.Text`
  color: ${({ theme }) => theme.accentColor};
  text-transform: capitalize;
`

const SummaryText = styled.Text`
  line-height: 20px;
`
