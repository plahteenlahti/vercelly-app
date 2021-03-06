import React, { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styled, { css } from 'styled-components/native'
import { Deploy } from '../typings/vercel'
import { localizedRelativeFormat } from '../utilities/time'

type Props = {
  last: boolean
  deploy: Deploy
  navigate: () => void
}

export const DeployItem: FC<Props> = ({ last, deploy, navigate }) => {
  const deploytAt = deploy?.created
    ? localizedRelativeFormat(new Date(deploy?.created), new Date())
    : ''

  return (
    <Container last={last} onPress={navigate} key={deploy?.id}>
      <IconContainer>
        {deploy?.state === 'ERROR' ? <Failure /> : <Success />}
      </IconContainer>
      <Column>
        <DeployText numberOfLines={1} lineBreakMode="clip">
          <Type>{deploy?.url}: </Type>
        </DeployText>

        {/* Success */}
        <Branch>{`Deployed at ${deploytAt}`}</Branch>

        {/* Skipped */}

        {deploy?.state === 'QUEUED' && (
          <Skipped>
            <SkippedText>Queued</SkippedText>
          </Skipped>
        )}
      </Column>
      <Chevron name="chevron-right" size={15} solid />
    </Container>
  )
}

type ItemProps = {
  last: boolean
}

const Container = styled.TouchableOpacity<ItemProps>`
  ${({ last }) =>
    last
      ? css``
      : css`
          border-bottom-width: 1px;
          border-bottom-color: ${({ theme }) => theme.borderColor};
        `}

  padding: 8px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const DeployText = styled.Text`
  padding-right: 16px;
  margin-bottom: 6px;
`

const Type = styled.Text`
  font-weight: 500;
  color: ${({ theme }) => theme.primaryTextColor};
`

const Branch = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryTextColor};
`

const Column = styled.View`
  flex: 1;
  margin-left: 8px;
`

const Skipped = styled.View`
  background-color: ${({ theme }) => theme.primaryBackground};
  padding: 2px;
  border-radius: 25px;
  width: 70px;
  align-items: center;
  justify-content: center;
`

const SkippedText = styled.Text`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 12px;
  font-weight: 500;
`

const Chevron = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.secondaryTextColor
}))``

const Success = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'check-circle',
  color: theme.successColor
}))``

const Failure = styled(FontAwesome5).attrs(({ theme }) => ({
  name: 'exclamation-triangle',
  color: theme.errorColor
}))``

const IconContainer = styled.View`
  height: 100%;
  padding-top: 5px;
`
