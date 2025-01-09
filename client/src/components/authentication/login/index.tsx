import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, pipe, string, minLength, number } from 'valibot'
import { useMutation } from '@tanstack/react-query'
import { loginQuery } from '../../../graphql/mutations'

interface LoginFormData {
  username: string
  password: string
  totp: number
}

const schema = object({
  username: pipe(
    string('username is required'),
    minLength(3, 'Needs to be at least 3 characters')
  ),
  password: pipe(
    string('password is required')
  ),
  totp: pipe(
    number('must be a number')
  )
})

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: valibotResolver(schema)
  })

  const loginMutate = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const result = await loginQuery
        .send({ username: data.username, password: data.password })
      window.localStorage.setItem('user-token', JSON.stringify(result))
      return result
    }
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutate.mutate(data)
  }

  return (
    <>
      Login
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username')} /> <br />
        <input {...register('password')} /> <br />
        <input {...register('totp', { valueAsNumber: true })} type='number'/>
        <br />
        {errors.totp && <p>{errors.totp.message}</p>}
        <input type='submit' />
      </form>
    </>
  )
}

export default Login
