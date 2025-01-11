import { SubmitHandler, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerMutation } from '@/graphql/mutations'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import FormField from '../shared/formField'
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

type FormData = InferInput<typeof registerSchema>

const Register = () => {
  const queryClient = useQueryClient()
  const { setItem } = useLocalStorage('user-info')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: valibotResolver(registerSchema)
  })

  const registerMutate = useMutation({
    mutationFn: async (data: FormData) => {
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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await registerMutate.mutateAsync(data)
    } catch (error) {
      setError('root', { message: error as unknown as string })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        type = 'text'
        label = 'Username'
        error = {errors.username?.message}
        register = {register}
        name = 'username'
        placeholder = 'username'
      />
      <FormField
        type = 'password'
        label = 'Password'
        error = {errors.password?.message}
        register = {register}
        name = 'password'
        placeholder = 'password'
      />
      <FormField
        type = 'password'
        label = 'Password confirmation'
        error = {errors.passwordConfirm?.message}
        register = {register}
        name = 'passwordConfirm'
        placeholder = 'Password confirmation'
      />
      <button disabled={isSubmitting} type='submit'>
        {isSubmitting ? 'loading' : 'submit'}
      </button>
      {errors.root && <p>{errors.root.message}</p>}
    </form>
  )
}

export default Register
