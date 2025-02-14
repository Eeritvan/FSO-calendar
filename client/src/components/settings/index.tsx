import { useForm } from 'react-hook-form'
import useSettingsSlice from '../../store/settingsStore'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, pipe, string, minLength, endsWith } from 'valibot'
import { useCallback } from 'react'

const schema = object({
  text: pipe(
    string('username is required'),
    minLength(3, 'Needs to be at least 3 characters')
  ),
  password: pipe(
    string('password is required'),
    endsWith('cool', 'Needs to end with `cool`')
  )
})

interface FormData {
  text: string;
  password: string;
}

const Settings = () => {
  const {
    // darkMode,
    text,
    // toggleDarkMode,
    writeSomething,
    resetSettings
  } = useSettingsSlice()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: valibotResolver(schema)
  })

  const onSubmit = (data: FormData) => writeSomething(data.text)

  const handleReset = useCallback(() => {
    resetSettings()
    reset()
  }, [reset, resetSettings])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('text')} />
      <input {...register('password')} />
      <input type='submit' />

      <div> Text: {text} </div>
      {errors.text && <p>{errors.text.message}</p>}
      <button onClick={handleReset}> reset </button>
    </form>
  )
}

export default Settings
