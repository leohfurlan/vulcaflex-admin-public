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

interface IFormValues {
  client: string
  unity: string
  process: string
  transporter: string
  barrel: string
}

interface StatusFormProps {
  handleClick: (data: IFormValues) => void
}

export function StatusForm({ handleClick }: StatusFormProps) {
  const form = useForm<IFormValues>()

  const handleChange = (cb: (s: string) => void, val: string) => {
    cb(val)
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-wrap gap-2"
        onSubmit={form.handleSubmit((data) => handleClick(data))}
      >
        {/** Cliente */}
        <FormField
          control={form.control}
          name="client"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(val) => handleChange(field.onChange, val)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cliente</SelectLabel>
                    <SelectItem value="vale">Vale</SelectItem>
                    {/* <SelectItem value="petrobras">Petrobras</SelectItem> */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/** Unidade */}
        <FormField
          control={form.control}
          name="unity"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(val) => handleChange(field.onChange, val)}
                defaultValue={field.value}
                disabled={!form.getValues('client')}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Unidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Unidade</SelectLabel>
                    <SelectItem value="s11d">S11D</SelectItem>
                    {/* <SelectItem value="porto_de_tubarao">
                      Porto de Tubarão
                    </SelectItem>
                    <SelectItem value="mina_de_fabrica">
                      Mina de Fábrica
                    </SelectItem> */}
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
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!form.getValues('unity')}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Processo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Processo</SelectLabel>
                    <SelectItem value="britagem">Britagem</SelectItem>
                    {/* <SelectItem value="peneiramento">Peneiramento</SelectItem>
                    <SelectItem value="patio_estocagem">
                      Pátio Estocagem
                    </SelectItem> */}
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
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!form.getValues('process')}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Transportador" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Transportador</SelectLabel>
                    <SelectItem value="0001">Transportador 0001</SelectItem>
                    {/* <SelectItem value="0002">Transportador 0002</SelectItem> */}
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
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!form.getValues('transporter')}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tambor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tambor</SelectLabel>
                    <SelectItem value="0001">Tambor 0001</SelectItem>
                    <SelectItem value="0002">Tambor 0002</SelectItem>
                    <SelectItem value="0003">Tambor 0003</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button className="bg-orange-500 text-white hover:bg-orange-400 w-full max-w-[180px] md:w-fit">
          Monitorar
        </Button>
      </form>
    </Form>
  )
}
