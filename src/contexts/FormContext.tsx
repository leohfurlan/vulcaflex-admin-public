import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { IFormValues } from '@/components/StatusForm'

interface FormContextProviderProps {
  children: React.ReactNode
}

interface FormContextProps {
  formData: IFormValues
  setFormData: Dispatch<SetStateAction<IFormValues>>
}

const FormContext = createContext({} as FormContextProps)

export function FormContextProvider({ children }: FormContextProviderProps) {
  const [formData, setFormData] = useState<IFormValues>({
    unity: undefined,
    barrel: undefined,
    process: undefined,
    transporter: undefined,
  } as IFormValues)

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const ctx = useContext(FormContext)
  return ctx
}
