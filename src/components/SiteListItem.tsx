import React, { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { localizedRelativeFormat } from '../utilities/time'
import { NoPreview } from './NoPreview'
import { Text } from './Typography'

type Props = {
  navigateToSite: () => void
  screenshot_url?: string
  updatedAt?: number
  custom_domain?: string
  default_domain?: string
}

export const SiteListItem: FC<Props> = ({
  navigateToSite,
  screenshot_url,
  updatedAt,
  custom_domain,
  default_domain
}) => {
  return (
    <RowContainer>
      <TouchableOpacity onPress={navigateToSite}>
        <Card>
          <PreviewContainer>
            {screenshot_url ? (
              <Preview resizeMode="cover" source={{ uri: screenshot_url }} />
            ) : (
              <NoPreview />
            )}
          </PreviewContainer>

          <Column>
            <SiteName type="Body">{custom_domain || default_domain}</SiteName>
            <Domain numberOfLines={2}>
              {`Last deploy ${localizedRelativeFormat(
                new Date(updatedAt),
                new Date()
              )}`}
            </Domain>
          </Column>
          <Chevron name="chevron-right" size={15} solid />
        </Card>
      </TouchableOpacity>
    </RowContainer>
  )
}

const RowContainer = styled.View``

const Card = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.secondaryBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.borderColor};
  flex-direction: row;
  align-items: center;
`

const Chevron = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``

const Column = styled.View`
  padding-left: 16px;
  flex: 1;
`

const Preview = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${({ theme }) => theme.borderColor};
`

const SiteName = styled(Text)`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 8px;
`

const Domain = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryTextColor};
  flex: 1;
`
const PreviewContainer = styled.View`
  border-radius: 8px;
  overflow: hidden;
  height: 45px;
  width: 76px;
  background-color: ${({ theme }) => theme.primaryBackground};
`
