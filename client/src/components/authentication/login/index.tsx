import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation } from '@tanstack/react-query'
import { loginQuery } from '../../../graphql/mutations'
import { Redirect } from 'wouter'
import {
  object,
  pipe,
  string,
  minLength,
  number,
  optional,
  maxValue,
  minValue
} from 'valibot'

interface LoginFormData {
  username: string
  password: string
  totp?: number
}

const schema = object({
  username: pipe(
    string('username is required'),
    minLength(3, 'Needs to be at least 3 characters')
  ),
  password: pipe(
    string('password is required')
  ),
  totp: optional(pipe(
    number('must be a number'),
    minValue(0, 'incorrect totp format'),
    maxValue(999999, 'incorrect totp format')
  ))
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
        .send({
          username: data.username,
          password: data.password,
          totp: data.totp ? data.totp : null
        })
      if (result.errors) {
        throw result.errors[0].message
      }

      window.localStorage.setItem('user-token', JSON.stringify(result))
      return result
    },
    // eslint-disable-next-line no-console
    onError: (error) => console.log(error)
  })

  const onSubmit = async (data: LoginFormData) => loginMutate.mutate(data)

  return (
    <>
      Login
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username')}
          placeholder="username"
        /> <br />
        <input {...register('password')}
          type="password"
          placeholder="password"
        /> <br />
        <input {...register('totp', {
          setValueAs: (value: string) => {
            return value === '' ? undefined : Number(value)
          }
        })}
        type='number'
        placeholder="6-digit TOTP"
        /> <br />
        {errors.totp && <p>{errors.totp.message}</p>}
        <input type='submit' />
      </form>
    </>
  )
}

export default Login
