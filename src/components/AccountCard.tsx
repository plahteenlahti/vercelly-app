import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Team } from '../typings/vercel'
import { Card } from './Card'
import { PlaceholderIcon } from './PlaceholderIcon'

type Props = {
  team: Team
}

export const TeamCard: FC<Props> = ({ team }) => {
  return (
    <Card>
      <CardTitle>
        {team?.avatar ? (
          <TeamLogo
            source={{
              uri: `https://vercel.com/api/www/avatar/${team?.avatar}`
            }}
          />
        ) : (
          <PlaceholderIcon />
        )}

        <TeamName>{team.name}</TeamName>
      </CardTitle>

      <TypeContainer>
        <Type>{team.slug}</Type>
      </TypeContainer>
    </Card>
  )
}

const TeamLogo = styled.Image`
  height: 30px;
  width: 30px;
  margin-right: 8px;
`

const TypeContainer = styled.View`
  position: absolute;
  background-color: ${({ theme }) => theme.secondaryTextColor};
  padding: 3px 5px;
  border-radius: 8px;
  right: 16px;
  top: 12px;
`

const Type = styled.Text`
  text-transform: uppercase;
  font-size: 10px;
  color: ${({ theme }) => theme.primaryBackground};
`

const CardTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`

const TeamName = styled.Text`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 15px;
  margin-left: 8px;
`
