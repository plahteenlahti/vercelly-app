import React, { FC } from 'react'
import { Platform } from 'react-native'
import styled, { css } from 'styled-components/native'

type Props = {
  onPress: () => void
}

export const AuthorizeButton: FC<Props> = ({ onPress }) => {
  return (
    <Button onPress={onPress}>
      <ButtonText>Authorize Vercel</ButtonText>
    </Button>
  )
}

const Button = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${({ theme }) => theme.secondaryBackground};
  border-radius: 8px;
  width: 100%;
  align-items: center;
  padding: 16px 16px;
  ${Platform.OS === 'ios'
    ? css`
        box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 1px;
      `
    : css`
        elevation: 4;
      `}
`

const ButtonText = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryTextColor};
`
