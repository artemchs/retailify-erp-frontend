import SelectCell from '@/components/data-tables/SelectCell'
import SelectHeader from '@/components/data-tables/SelectHeader'
import { DisplayUploadedFile } from '@/features/products/components/shared/media/DisplayUploadedFile'
import { VariantWithProduct } from '@/types/entities/Variant'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<VariantWithProduct>[] = [
  {
    id: 'select',
    header: ({ table }) => <SelectHeader table={table} />,
    cell: ({ row }) => <SelectCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'Медиа',
    cell: ({ row }) =>
      row.original.product?.media?.[0] && (
        <div className='w-16 h-16 shrink-0'>
          <DisplayUploadedFile
            id={row.original.product?.media?.[0].id}
            className='w-full aspect-square shadow-sm'
          />
        </div>
      ),
  },
  {
    id: 'Название',
    header: () => 'Название',
    cell: ({ row }) => {
      return <span className='font-medium'>{row.original.product?.title}</span>
    },
  },
  {
    id: 'Артикул',
    header: () => 'Артикул',
    cell: ({ row }) => {
      return (
        <span className='text-muted-foreground'>
          {row.original.product?.sku}
        </span>
      )
    },
  },
  {
    id: 'Размер',
    header: () => 'Размер',
    cell: ({ row }) => {
      return <span>{row.original.size}</span>
    },
  },
  {
    id: 'Количество на складе',
    header: () => <div className='text-right'>Количество на складе</div>,
    cell: ({ row }) => {
      return (
        <div className='text-right w-full'>
          {row.original.warehouseStockEntries?.[0].warehouseQuantity} шт
        </div>
      )
    },
  },
]
