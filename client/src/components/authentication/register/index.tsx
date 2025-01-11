import { SubmitHandler, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { registerMutation } from '@/graphql/mutations'
import {
  object,
  pipe,
  string,
  minLength,
  nonEmpty,
  InferInput,
  forward,
  partialCheck
} from 'valibot'

const registerSchema = pipe(
  object({
    username: pipe(
      string('username is required'),
      minLength(3, 'Needs to be at least 3 characters')
    ),
    password: pipe(
      string('password must be a string'),
      nonEmpty('password cant be empty'),
      minLength(8, 'the password must be at least 8 characters long')
    ),
    passwordConfirm: string()
  }),
  forward(
    partialCheck(
      [['password'], ['passwordConfirm']],
      (input) => input.password === input.passwordConfirm,
      'The two passwords do not match.'
    ),
    ['passwordConfirm']
  )
)

type RegisterFormData = InferInput<typeof registerSchema>

const Register = () => {
  const queryClient = useQueryClient()
  const { setItem } = useLocalStorage('user-info')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading }
  } = useForm<RegisterFormData>({
    resolver: valibotResolver(registerSchema)
  })

  const loginMutate = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const result = await registerMutation
        .send({
          username: data.username,
          password: data.password
        })
      if (result.errors) throw result.errors[0].message
      setItem(result)
      return result
    },
    onError: (e) => setError('root', { message: e as unknown as string }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['token'] })
  })

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    await new Promise(() => loginMutate.mutate(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Register <br />
      <input {...register('username')}
        placeholder='username'
      /> <br />
      {errors.username && <p>{errors.username.message}</p>}
      <input {...register('password')}
        type='password'
        placeholder='username'
      /> <br />
      {errors.password && <p>{errors.password.message}</p>}
      <input {...register('passwordConfirm')}
        type='password'
        placeholder='password confirmation'
      /> <br />
      {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
      <button type='submit'>
        {isLoading ? 'loading' : 'submit'}
      </button>
      {errors.root && <p>{errors.root.message}</p>}
    </form>
  )
}

export default Register
