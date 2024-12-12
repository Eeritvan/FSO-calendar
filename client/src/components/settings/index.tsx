import { useForm } from 'react-hook-form'
import useSettingsSlice from '../../store/settingsStore'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, pipe, string, minLength, endsWith } from 'valibot'

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
    darkMode,
    text,
    toggleDarkMode,
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

  const handleReset = () => {
    resetSettings()
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Switch
        id='dark-mode'
        checked={darkMode}
        onCheckedChange={toggleDarkMode}
      />
      <Label htmlFor='dark-mode'>Toggle darkmode</Label>
      <br />

      <input {...register('text')} />
      <input {...register('password')} />
      <input type='submit' />

      <div> Text: {text} </div>
      {errors.text && <p>{errors.text.message}</p>}s
      <button onClick={handleReset}> reset </button>
    </form>
  )
}

export default Settings
