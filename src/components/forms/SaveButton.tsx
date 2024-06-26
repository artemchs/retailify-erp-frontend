import { Loader2, Save } from 'lucide-react'
import { Button } from '../ui/button'
import { UseFormReturn } from 'react-hook-form'
import { ReactNode } from 'react'

type Props = {
  isPending: boolean
  onSubmit(values: unknown): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  text?: string
  icon?: ReactNode
}

export default function SaveButton({
  isPending,
  form,
  onSubmit,
  text,
  icon,
}: Props) {
  return (
    <Button
      className='mt-4 w-full lg:w-fit ml-auto'
      disabled={isPending}
      onClick={form.handleSubmit(onSubmit)}
    >
      {isPending ? (
        <Loader2 className='h-4 w-4 mr-2 animate-spin' />
      ) : icon ? (
        icon
      ) : (
        <Save className='h-4 w-4 mr-2' />
      )}
      {text ?? 'Сохранить'}
    </Button>
  )
}
