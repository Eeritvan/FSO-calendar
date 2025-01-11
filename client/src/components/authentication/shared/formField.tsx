interface FormFieldProps {
  type: string
  label: string
  error?: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  placeholder: string
  setValueAs?: (value: string) => number | undefined
}

const FormField = ({
  type,
  label,
  error,
  register,
  name,
  placeholder,
  setValueAs
}: FormFieldProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, { setValueAs })}
        type={type}
        placeholder={placeholder}
      />
      {error && <p>{error}</p>}
    </div>
  )
}

export default FormField
