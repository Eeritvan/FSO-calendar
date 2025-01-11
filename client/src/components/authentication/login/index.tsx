import { SubmitHandler, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginMutation } from '@/graphql/mutations'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  object,
  pipe,
  string,
  minLength,
  number,
  optional,
  maxValue,
  minValue,
  InferInput
} from 'valibot'

const loginSchema = object({
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

type LoginFormData = InferInput<typeof loginSchema>

const Login = () => {
  const queryClient = useQueryClient()
  const { setItem } = useLocalStorage('user-info')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: valibotResolver(loginSchema)
  })

  const loginMutate = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const result = await loginMutation
        .send({
          username: data.username,
          password: data.password,
          totp: data.totp ? data.totp : null
        })
      if (result.errors) throw result.errors[0].message
      setItem(result)
      return result
    },
    onError: (e) => setError('root', { message: e as unknown as string }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['token'] })
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    await new Promise(() => loginMutate.mutate(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Login <br />
      <input {...register('username')} placeholder='username' /> <br />
      {errors.username && <p>{errors.username.message}</p>}
      <input {...register('password')}
        type='password'
        placeholder='password'
      /> <br />
      {errors.password && <p>{errors.password.message}</p>}
      <input {...register('totp', {
        setValueAs: (value: string) => {
          return value === '' ? undefined : Number(value)
        }
      })}
      type='number'
      placeholder='6-digit TOTP'
      /> <br />
      {errors.totp && <p>{errors.totp.message}</p>}
      <button disabled={isSubmitting} type='submit'>
        {isSubmitting ? 'loading' : 'submit'}
      </button>
      {errors.root && <p>{errors.root.message}</p>}
    </form>
  )
}

export default Login
