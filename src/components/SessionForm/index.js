import { useState } from 'react'
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react'
import { AiOutlineEye } from 'react-icons/ai'
import * as Api from '../../api'
import { Error, PlainButton, SubmitButton } from './styles'

const AccountForm = ({ onLogInClose, setUser }) => {
  const [email, setEmail] = useState('')
  const onEmailChange = (e) => setEmail(e.target.value)

  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const togglePasswordVisible = () => {
    setIsPasswordVisible(visible => !visible)
  }

  const [isLoading, setIsLoading] = useState(false)
  const onPasswordChange = (e) => setPassword(e.target.value)

  const toast = useToast()

  const submit = (e) => {
    e.preventDefault()

    setIsLoading(true)

    Api.createSession({ email, password })
    .then(response => {
      localStorage.setItem("token", response.headers.authorization)
      toast({
        title: 'Log In Successful',
        description: 'You are now signed in. Happy Trading!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setUser(response.data)
      onLogInClose()
    }).catch(err => {
      const msg = err?.response?.data ?? 'An error occurred, please try again.'

      toast({
        title: 'There was a problem',
        description: msg,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const submitButtonText = isLoading ? 'Logging In...' : 'Log In'

  const [passwordResetError, setPasswordResetError] = useState('')
  const resetPassword = (e) => {
    e.preventDefault()

    if (!email) {
      setPasswordResetError('Please enter your email')
      return
    }

    setPasswordResetError('')

    Api.resetPassword({ email })
    .then(() => {
      toast({
        description: `Password reset instructions have been sent to ${email}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

    }).catch(err => {
      const msg = err?.response?.data ?? 'An error occurred, please try again.'

      toast({
        title: 'There was a problem',
        description: msg,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
  }

  return (
    <form onSubmit={submit}>
      <FormControl marginBottom="2.5" isRequired>
        <FormLabel htmlFor='email'>Email address</FormLabel>
        <Input onChange={onEmailChange} value={email} id='email' type='email' />
        {passwordResetError && <Error >{passwordResetError}</Error>}
      </FormControl>

      <FormControl marginBottom="3.5" isRequired>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Flex position="relative">
          <Input onChange={onPasswordChange} value={password} id='password' type={isPasswordVisible ? 'text' : 'password'} />
          <Box zIndex="1" cursor="pointer" position="absolute" top="11px" right="10px">
            <AiOutlineEye onClick={togglePasswordVisible} size="20px"/>
          </Box>
        </Flex>
      </FormControl>

      <Flex justifyContent="center">
        <SubmitButton disabled={isLoading} type="submit" value={submitButtonText} />
      </Flex>
      <PlainButton onClick={resetPassword}>Send password reset instructions</PlainButton>
    </form>
  )
}

export default AccountForm
