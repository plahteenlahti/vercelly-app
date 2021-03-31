import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

import { getUser } from '../api/vercel'
import { navigate } from '../navigators/RootNavigation'
import { RootState } from '../store/reducers'

export const ListHeader: FC = () => {
  const accessToken = useSelector((state: RootState) => state.app.accessToken)
  const { data: user } = useQuery(['profile', { accessToken }], getUser)

  const goToProfile = () => {
    navigate('Profile', {})
  }

  return (
    <Container>
      <Avatar onPress={goToProfile}>
        <ProfilePicture
          borderRadius={130}
          resizeMode="contain"
          source={{
            uri: `https://vercel.com/api/www/avatar/${user?.user?.avatar}`
          }}
        />
      </Avatar>
    </Container>
  )
}

const Container = styled.View``

const Avatar = styled.TouchableOpacity``

const ProfilePicture = styled.Image`
  height: 30px;
  width: 30px;
  border-radius: 130px;
`
