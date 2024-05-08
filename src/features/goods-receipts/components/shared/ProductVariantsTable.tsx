import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FormInput, X } from 'lucide-react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CurrencyFormatter } from '@/components/ui/units'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'variants'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
}

export type Variant = {
  variantId: string
  supplierPrice: number
  sellingPrice: number
  receivedQuantity: number
  productName: string
  size: string
  productId: string
  productSku: string
}

export default function ProductVariantsTable({ field, form }: Props) {
  const variants = field.value as Variant[]
  function setVariants(newVariants: Variant[]) {
    form.setValue('variants', newVariants)
  }

  return (
    <div className='border rounded-md border-input'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Товар</TableHead>
            <TableHead className='text-right'>
              Полученное количество (шт)
            </TableHead>
            <TableHead className='text-right'>Цена закупки (грн)</TableHead>
            <TableHead className='text-right'>Цена продажи (грн)</TableHead>
            <TableHead className='text-right'>Общая стоимость</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant.variantId}>
              <TableCell>
                <span className='font-medium'>
                  {variant.productName} {variant.size} {variant.productSku}
                </span>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Input
                    value={variant.receivedQuantity}
                    type='number'
                    onChange={(e) => {
                      const newVariants = variants
                      const index = newVariants.findIndex(
                        (obj) => obj.variantId === variant.variantId
                      )
                      newVariants[index] = {
                        ...newVariants[index],
                        receivedQuantity: e.target.valueAsNumber,
                      }
                      setVariants(newVariants)
                    }}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size='icon'
                          className='shrink-0'
                          variant='ghost'
                          type='button'
                          onClick={() => {
                            const newVariants = variants.map((v) => ({
                              ...v,
                              receivedQuantity:
                                v.productId === variant.productId
                                  ? variant.receivedQuantity
                                  : v.receivedQuantity,
                            }))
                            setVariants(newVariants)
                          }}
                        >
                          <FormInput className='h-4 w-4' />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Заполнить все варианты этого товара с этим значением.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Input
                    value={variant.supplierPrice}
                    type='number'
                    onChange={(e) => {
                      const newVariants = variants
                      const index = newVariants.findIndex(
                        (obj) => obj.variantId === variant.variantId
                      )
                      newVariants[index] = {
                        ...newVariants[index],
                        supplierPrice: e.target.valueAsNumber,
                      }
                      setVariants(newVariants)
                    }}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size='icon'
                          className='shrink-0'
                          variant='ghost'
                          type='button'
                          onClick={() => {
                            const newVariants = variants.map((v) => ({
                              ...v,
                              supplierPrice:
                                v.productId === variant.productId
                                  ? variant.supplierPrice
                                  : v.supplierPrice,
                            }))
                            setVariants(newVariants)
                          }}
                        >
                          <FormInput className='h-4 w-4' />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Заполнить все варианты этого товара с этим значением.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
              <TableCell>
                <Input
                  value={variant.sellingPrice}
                  type='number'
                  onChange={(e) => {
                    const newVariants = variants
                    const index = newVariants.findIndex(
                      (obj) => obj.variantId === variant.variantId
                    )
                    newVariants[index] = {
                      ...newVariants[index],
                      sellingPrice: e.target.valueAsNumber,
                    }
                    setVariants(newVariants)
                  }}
                />
              </TableCell>
              <TableCell className='text-right'>
                <CurrencyFormatter
                  value={
                    variant.receivedQuantity && variant.supplierPrice
                      ? variant.receivedQuantity * variant.supplierPrice
                      : 0
                  }
                  className='font-medium'
                />
              </TableCell>
              <TableCell>
                <Button
                  size='icon'
                  variant='secondary'
                  className='h-8 w-8'
                  onClick={() => {
                    const newArray = variants.filter(
                      (obj) => obj.variantId !== variant.variantId
                    )
                    setVariants(newArray)
                  }}
                >
                  <X className='h-4 w-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {variants.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>
                <div className='w-full flex items-center justify-center h-24'>
                  <p>Вы еще не выбрали товары...</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
