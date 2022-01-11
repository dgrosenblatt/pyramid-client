import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  useToast
} from '@chakra-ui/react'
import { AiOutlineEye } from 'react-icons/ai'
import * as Api from '../../api'

const AccountForm = ({ onSignUpClose, setUser }) => {
  const [email, setEmail] = useState('')
  const onEmailChange = (e) => setEmail(e.target.value)

  const [name, setName] = useState('')
  const onNameChange = (e) => setName(e.target.value)

  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const togglePasswordVisible = () => {
    setIsPasswordVisible(visible => !visible)
  }

  const [isLoading, setIsLoading] = useState(false)
  const onPasswordChange = (e) => setPassword(e.target.value)

  const toast = useToast()

  const submit = () => {
    setIsLoading(true)

    Api.createUser({ email, password, name })
    .then(response => {
      localStorage.setItem("token", response.headers.authorization)
      toast({
        title: `Account Created`,
        description: `You are now signed in. Happy Trading!`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setUser(response.data)
      onSignUpClose()
    }).catch(err => {
      console.log({err})
    }).finally(() => {
      setIsLoading(false)
    })
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormControl marginBottom="2.5" isRequired>
        <FormLabel htmlFor='email'>Email address</FormLabel>
        <Input onChange={onEmailChange} value={email} id='email' type='email' />
      </FormControl>

      <FormControl marginBottom="2.5">
        <FormLabel htmlFor='name'>Public name for standings</FormLabel>
        <Input onChange={onNameChange} value={name} id='name' type='text' />
        <FormHelperText>Optional</FormHelperText>
      </FormControl>

      <FormControl marginBottom="3.5" isRequired>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Flex position="relative">
          <Input onChange={onPasswordChange} value={password} id='password' type={isPasswordVisible ? 'text' : 'password'} />
          <Box zIndex="1" cursor="pointer" position="absolute" top="11px" right="10px">
            <AiOutlineEye onClick={togglePasswordVisible} size="20px"/>
          </Box>
        </Flex>
        <FormHelperText>Must be at least 8 characters</FormHelperText>
      </FormControl>

      <Flex justifyContent="center">
        <Button isLoading={isLoading} w="100%" colorScheme="green" onClick={submit}>Create Account</Button>
      </Flex>
    </form>
  )
}

export default AccountForm
