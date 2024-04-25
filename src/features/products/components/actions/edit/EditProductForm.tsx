import Products from '@/api/services/Products'
import { editProductFormSchema } from '@/features/products/types/edit-product-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Tags } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { AlertDestructive } from '@/components/AlertDestructive'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import TitleInput from '../../shared/form/TitleInput'
import SelectSeason from '../../shared/form/SelectSeason'
import SelectGender from '../../shared/form/SelectGender'
import BrandsCombobox from '@/features/brands/components/shared/BrandsCombobox'
import CategoriesCombobox from '@/features/categories/components/shared/CategoriesCombobox'
import ColorsCombobox from '@/features/colors/components/shared/ColorsCombobox'
import { Input } from '@/components/ui/input'
import SaveButton from '@/components/forms/SaveButton'
import CharacteristicsInput from '../../shared/form/characteristics/CharacteristicsInput'
import TextEditor from '../../shared/form/text-editor/TextEditor'
import UploadMediaInput from '../../shared/form/media/UploadMediaInput'
import { Product } from '@/types/entities/Product'
import VariantsInput from '../../shared/form/variants/VariantsInput'
import ProductTagsCombobox from '@/features/product-tags/components/shared/ProductTagsCombobox'
import { useNavigate } from '@tanstack/react-router'

type Props = {
  productId: string
  product?: Product
}

type Characteristic = {
  id: string
  characteristicId: string | null
  value: string
  characteristic: { id: string; name: string } | null
}

function transformCharacteristicValues(characteristicValues: Characteristic[]) {
  const characteristics = []

  // Create a map to group values by characteristic
  const characteristicMap = new Map()

  // Iterate over the input array
  for (const { id, characteristic, value } of characteristicValues) {
    if (characteristic) {
      const { id: characteristicId } = characteristic
      const values = characteristicMap.get(characteristicId) || []
      values.push({ id, value })
      characteristicMap.set(characteristicId, values)
    }
  }

  // Create the desired format
  for (const [characteristicId, values] of characteristicMap) {
    const characteristic = characteristicValues.find(
      (cv) => cv.characteristicId === characteristicId && cv.characteristic
    )?.characteristic

    if (characteristic) {
      characteristics.push({
        id: characteristic.id,
        name: characteristic.name,
        values,
      })
    }
  }

  return characteristics
}

export default function EditProductForm({ productId, product }: Props) {
  const form = useForm<z.infer<typeof editProductFormSchema>>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      title: product?.title,
      characteristics: product?.characteristicValues
        ? transformCharacteristicValues(product.characteristicValues)
        : [],
      categoryId: product?.categoryId ?? '',
      colors: product?.colors
        ? product.colors.map(({ colorId, index, color }) => ({
            id: colorId,
            index,
            name: color?.name,
          }))
        : [],
      variants: product?.variants
        ? product.variants.map(({ id, isArchived, price, sale, size }) => ({
            id,
            isArchived,
            price,
            sale: sale ?? undefined,
            size,
          }))
        : [],
      description: product?.description ? product.description : '',
      media: product?.media ?? [],
      packagingHeight: product?.packagingHeight,
      packagingLength: product?.packagingLength,
      packagingWeight: product?.packagingWeight,
      packagingWidth: product?.packagingWidth,
      gender: product?.gender,
      season: product?.season,
      brandId: product?.brandId ?? '',
      tags: product?.tags ?? [],
    },
  })

  const navigate = useNavigate()

  function onSuccess() {
    toast('Модель товара была успешно отредактирована.', {
      icon: <Tags className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })

    navigate({ to: '/products', search: { page: 1, rowsPerPage: 20 } })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Products.useEdit({
    setErrorMessage,
    onSuccess,
    id: productId,
  })

  function onSubmit(values: z.infer<typeof editProductFormSchema>) {
    mutate({
      body: values,
    })
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      {errorMessage && errorMessage.length >= 1 && (
        <AlertDestructive text={errorMessage} />
      )}
      <Form {...form}>
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='media'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='mediaInput'>Медиа:</Label>
                <FormControl>
                  <UploadMediaInput field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Название' />
                <FormControl>
                  <TitleInput
                    field={field}
                    form={form}
                    control={form.control}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <Label>Теги</Label>
                <FormControl>
                  <ProductTagsCombobox field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Описание' />
                <FormControl>
                  <TextEditor field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col lg:flex-row gap-4'>
            <FormField
              control={form.control}
              name='season'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Сезон' />
                  <SelectSeason field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Пол' />
                  <SelectGender field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col lg:flex-row gap-4'>
            <FormField
              control={form.control}
              name='brandId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Бренд' />
                  <FormControl>
                    <BrandsCombobox field={field} form={form} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Категория' />
                  <FormControl>
                    <CategoriesCombobox field={field} form={form} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='colors'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Цвета' />
                <FormControl>
                  <ColorsCombobox field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='characteristics'
            render={({ field }) => (
              <FormItem>
                <Label>Характеристики:</Label>
                <FormControl>
                  <CharacteristicsInput
                    control={form.control}
                    field={field}
                    form={form}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col lg:flex-row gap-4'>
            <FormField
              control={form.control}
              name='packagingHeight'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Высота упаковки' />
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='packagingLength'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Длина упаковки' />
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='packagingWidth'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Ширина упаковки' />
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='packagingWeight'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Вес упаковки' />
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='variants'
            render={({ field }) => (
              <FormItem>
                <Label>Размеры товара:</Label>
                <FormControl>
                  <VariantsInput
                    field={field}
                    form={form}
                    productId={productId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SaveButton isPending={isPending} form={form} onSubmit={onSubmit} />
        </form>
      </Form>
    </div>
  )
}
