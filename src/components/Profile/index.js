import { useEffect, useState } from 'react'
import { Box, Heading, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import axios from 'axios'

const Profile = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    axios
    .get('http://localhost:3000/current_user')
    .then(({ data }) => {
      setUser(data)
    })
  })

  if (!user) {
    return <></>
  }

  const { name, balance } = user

  return (
    <Box borderWidth='1px' borderRadius='lg'>
      <Heading>Profile</Heading>
      <Stat>
        <StatLabel>{name}</StatLabel>
        <StatNumber>${balance}</StatNumber>
      </Stat>
    </Box>
  )
}

export default Profile
