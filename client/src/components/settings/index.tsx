import { useForm, SubmitHandler } from 'react-hook-form'

let renderCount = 0

const Settings = () => {
  renderCount++

  const { register, handleSubmit } = useForm()
  const onSubmit = (data: FormData) => console.log(data)

  return (
    <div>
      This is settings page
      <div>
        rerenders: {renderCount}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName', { minLength: 3 }) } />
        <input {...register('lastName', { minLength: 3 }) } />
        <input type='submit' />
        testi
      </form>
    </div>
  )
}

export default Settings