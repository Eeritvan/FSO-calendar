import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginQuery } from '@/graphql/mutations'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useLocation } from 'wouter'
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
  const queryClient = useQueryClient()
  const { setItem } = useLocalStorage('user-info')
  const [error, setError] = useState<string | null>(null)
  const [, navigate] = useLocation()

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
      if (result.errors) throw result.errors[0].message
      setItem(result)
      return result
    },
    onError: (e) => setError(e as unknown as string), // todo: fix this
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['token'] })
      navigate('/')
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    loginMutate.mutate(data)
  }

  return (
    <>
      Login
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username')}
          placeholder="username"
        /> <br />
        {errors.username && <p>{errors.username.message}</p>}
        <input {...register('password')}
          type="password"
          placeholder="password"
        /> <br />
        {errors.password && <p>{errors.password.message}</p>}
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
        {error && <p>{error}</p>}
      </form>
    </>
  )
}

export default Login
