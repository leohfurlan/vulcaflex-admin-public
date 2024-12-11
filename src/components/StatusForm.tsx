import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { useFormContext } from '@/contexts/FormContext'
import { useDashboardContext } from '@/contexts/DashboardContext'

export interface IFormValues {
  unity: string | undefined
  process: string | undefined
  transporter: string | undefined
  barrel: string | undefined
  plate: string | undefined
}

interface StatusFormProps {
  handleClick: (data: IFormValues) => void
}

export function StatusForm({ handleClick }: StatusFormProps) {
  const router = useRouter()
  const { formData, setFormData } = useFormContext()
  const form = useForm<IFormValues>({ defaultValues: formData })

  const { dataBarrel, dataProcess, dataTransporter, dataUnity, hasError } =
    useDashboardContext()

  if (hasError) {
    router.push('/error')
  }

  const onChange = (key: string, val: string) => {
    if (formData[key as keyof IFormValues] === val) {
      return
    }

    setFormData((prev) => ({ ...prev, [key]: val }))
  }

  useEffect(() => {
    if (formData.barrel) {
      handleClick(formData)
    }
  }, [formData.barrel])

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 grid-rows-2 gap-2"
        onSubmit={form.handleSubmit((data) => handleClick(data))}
      >
        {/** Unidade */}
        <FormField
          control={form.control}
          name="unity"
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val)
                  onChange('unity', val)
                }}
              >
                <FormControl className="mx-auto">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Unidades">
                      {field.value}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{dataUnity?.especificacao}</SelectLabel>
                    {dataUnity?.lista.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/** Processo */}
        <FormField
          control={form.control}
          name="process"
          render={({ field }) => (
            <FormItem>
              <Select
                disabled={!formData.unity}
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val)
                  onChange('process', val)
                }}
              >
                <FormControl className="mx-auto">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Processo">
                      {field.value}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Processo</SelectLabel>
                    {dataProcess?.lista.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/** Transportador */}
        <FormField
          control={form.control}
          name="transporter"
          render={({ field }) => (
            <FormItem>
              <Select
                disabled={!formData.process}
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val)
                  onChange('transporter', val)
                }}
              >
                <FormControl className="mx-auto">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Transportador">
                      {field.value}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Transportador</SelectLabel>
                    {dataTransporter?.lista.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/** Tambor */}
        <FormField
          control={form.control}
          name="barrel"
          render={({ field }) => (
            <FormItem>
              <Select
                disabled={!formData.transporter}
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val)
                  onChange('barrel', val)
                }}
              >
                <FormControl className="mx-auto">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Tambor">
                      {field.value}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tambor</SelectLabel>
                    {dataBarrel?.lista.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
