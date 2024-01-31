import SortableDataTableHeader from '@/components/ui/sortable-data-table-header'
import { Supplier } from '@/types/entities/Supplier'
import { ColumnDef } from '@tanstack/react-table'
import SupplierActions from './SupplierActions'

export const columns: ColumnDef<Supplier>[] = [
  {
    id: 'Название',
    accessorKey: 'name',
    header: () => (
      <SortableDataTableHeader
        label='Название'
        orderByProperty='name'
        routeId='/layout/suppliers'
      />
    ),
  },
  {
    id: 'Адрес',
    accessorKey: 'address',
    header: () => (
      <SortableDataTableHeader
        label='Адрес'
        orderByProperty='address'
        routeId='/layout/suppliers'
      />
    ),
  },
  {
    id: 'Контактное лицо',
    accessorKey: 'contactPerson',
    header: () => (
      <SortableDataTableHeader
        label='Контактное лицо'
        orderByProperty='contactPerson'
        routeId='/layout/suppliers'
      />
    ),
  },
  {
    id: 'Адрес електронной почты',
    accessorKey: 'email',
    header: () => (
      <SortableDataTableHeader
        label='Адрес електронной почты'
        orderByProperty='email'
        routeId='/layout/suppliers'
      />
    ),
  },
  {
    id: 'Номер телефона',
    accessorKey: 'phone',
    header: () => (
      <SortableDataTableHeader
        label='Номер телефона'
        orderByProperty='phone'
        routeId='/layout/suppliers'
      />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, isArchived } = row.original

      return <SupplierActions id={id} isArchived={isArchived} />
    },
    enableSorting: false,
    enableHiding: false,
  },
]