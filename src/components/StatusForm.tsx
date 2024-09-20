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
import { Button } from './ui/button'
import { useFormContext } from '@/contexts/FormContext'
import { useGetBarrelSpecification } from '@/hooks/useGetBarrelSpecification'
import { useRouter } from 'next/router'

export interface IFormValues {
  unity: string | undefined
  process: string | undefined
  transporter: string | undefined
  barrel: string | undefined
}

interface StatusFormProps {
  handleClick: (data: IFormValues) => void
}

export function StatusForm({ handleClick }: StatusFormProps) {
  const router = useRouter()
  const { formData, setFormData } = useFormContext()
  const form = useForm<IFormValues>({ defaultValues: formData })

  const { data: dataUnity, isError: isErrorUnity } =
    useGetBarrelSpecification(true)
  const { data: dataProcess, isError: isErrorProcess } =
    useGetBarrelSpecification(!!formData.unity, formData.unity)
  const { data: dataTransporter, isError: isErrorTransporter } =
    useGetBarrelSpecification(
      !!formData.process,
      formData.unity,
      formData.process,
    )
  const { data: dataBarrel, isError: isErrorBarrel } =
    useGetBarrelSpecification(
      !!formData.transporter,
      formData.unity,
      formData.process,
      formData.transporter,
    )

  const hasError =
    isErrorUnity || isErrorProcess || isErrorTransporter || isErrorBarrel

  if (hasError) {
    router.push('/error')
  }

  const onChange = (key: string, val: string) => {
    if (formData[key as keyof IFormValues] === val) {
      return
    }

    setFormData((prev) => ({ ...prev, [key]: val }))
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-wrap gap-2"
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
                <FormControl>
                  <SelectTrigger className="w-[180px]">
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
                <FormControl>
                  <SelectTrigger className="w-[180px]">
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
                <FormControl>
                  <SelectTrigger className="w-[180px]">
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
                <FormControl>
                  <SelectTrigger className="w-[180px]">
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
        <Button
          className="bg-orange-500 text-white hover:bg-orange-400 w-full max-w-[180px] md:w-fit"
          disabled={!form.getValues('barrel')}
        >
          Monitorar
        </Button>
      </form>
    </Form>
  )
}
