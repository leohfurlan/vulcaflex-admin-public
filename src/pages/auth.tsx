import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CircleAlert, UserRound } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário deve conter no mínimo 3 caracteres.' }),
  password: z
    .string()
    .min(3, { message: 'A senha deve conter no mínimo 3 caracteres.' }),
})

export default function AuthPage() {
  const router = useRouter()
  const { handleLogin } = useAuth()

  const [error, setError] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', password: '' },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { success, message } = handleLogin(values.username, values.password)

    if (!success) {
      return setError(message)
    }

    setError('')
    router.push('/')
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-300">
      <div className="bg-gray-200 flex flex-col p-8 relative rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/** Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite seu usuário"
                      className="mt-10 lg:w-[360px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.formState.errors.username && (
              <span className="text-destructive text-xs mt-1">
                {form.formState.errors.username.message}
              </span>
            )}

            {/** Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      className="mt-4 lg:w-[360px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.formState.errors.password && (
              <span className="text-destructive text-xs mt-1 block">
                {form.formState.errors.password.message}
              </span>
            )}

            {error && (
              <div className="flex items-center gap-1 text-red-500 mt-3">
                <CircleAlert size={16} />
                <span className="text-xs">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-500 p-6 mt-12 w-full"
              children="Acessar"
            />
          </form>
        </Form>

        <div className="w-32 h-32 bg-white flex items-center justify-center rounded-full absolute -top-20 left-1/2 transform -translate-x-1/2">
          <UserRound size={80} />
        </div>
      </div>
    </div>
  )
}
