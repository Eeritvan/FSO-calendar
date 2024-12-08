import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleDarkMode,
  writeSomething,
  resetSettings,
  SettingsState
} from '../../reducers/settingsReducer'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

import { valibotResolver } from '@hookform/resolvers/valibot'
import * as v from 'valibot'

const schema = v.object({
  text: v.pipe(
    v.string('username is required'),
    v.minLength(3, 'Needs to be at least 3 characters')
  ),
  password: v.pipe(
    v.string('password is required'),
    v.endsWith('cool', 'Needs to end with `cool`')
  )
})

interface RootState {
  settings: SettingsState;
}

const Settings = () => {
  const dispatch = useDispatch()
  const settings = useSelector((state: RootState) => state.settings)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: valibotResolver(schema)
  })
  const onSubmit = (data: FormData) => dispatch(writeSomething(data.text))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Switch
        id='dark-mode'
        checked={settings.darkMode}
        onCheckedChange={() => dispatch(toggleDarkMode())}
      />
      <Label htmlFor='dark-mode'>Toggle darkmode</Label>
      <br />

      <input {...register('text')} />
      <input {...register('password')} />
      <input type='submit' />

      <div> Text: {settings.text} </div>
      {errors.text && <p>{errors.text.message}</p>}
      <button onClick={() => dispatch(resetSettings())}> reset </button>

    </form>
  )
}

export default Settings
