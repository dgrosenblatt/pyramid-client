import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Flex, Input, Box, useToast, Heading } from '@chakra-ui/react'
import { Form, SubmitButton } from './styles';
import { AiOutlineEye } from 'react-icons/ai';
import * as Api from '../../api'

const PasswordForm = ({ setUser }) => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('reset_password_token')

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const togglePasswordVisible = () => {
    setIsPasswordVisible((isVisible) => !isVisible)
  }

  const [password, setPassword] = useState('')
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const toast = useToast()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const submit = (e) => {
    e.preventDefault()

    setIsLoading(true)
    Api.updatePassword({ token, password })
      .then((response) => {
        toast({
          title: 'Password Updated.',
          description: 'You are now signed in. Happy Trading!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        localStorage.setItem("token", response.headers.authorization)
        setUser(response.data)
        navigate('/')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const submitButtonText = isLoading ? 'Updating...' : 'Update Password'

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%">
      <Heading marginBottom="2rem">Reset Your Password</Heading>
      <Form onSubmit={submit}>
        <FormControl marginBottom="3.5" isRequired>
          <FormLabel htmlFor='password'>New Password</FormLabel>
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
      </Form>
    </Flex>
  )
}

export default PasswordForm
