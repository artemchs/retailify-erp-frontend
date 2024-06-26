import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import Characteristics from '@/api/services/Characteristics'
import EditCharacteristicValueForm from './EditCharacteristicValueForm'
import { CharacteristicValue } from '@/types/entities/Characteristic'

export default function EditCharacteristicValueDialog({
  id,
  characteristicId,
  selectedValues,
  setSelectedValues,
}: {
  id: string
  characteristicId: string
  selectedValues: CharacteristicValue[]
  setSelectedValues: (newValues?: CharacteristicValue[]) => void
}) {
  const [isOpened, setIsOpened] = useState(false)
  const { data, isLoading, isError } = Characteristics.useFindOneValue({
    id,
    characteristicId,
  })

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <button>
          <Edit className='h-4 w-4' />
        </button>
      </DialogTrigger>
      <DialogContent className='max-h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Редактировать значение характеристики</DialogTitle>
        </DialogHeader>
        <EditCharacteristicValueForm
          characteristicId={characteristicId}
          id={id}
          isError={isError}
          isLoading={isLoading}
          setIsOpened={setIsOpened}
          value={data ?? undefined}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      </DialogContent>
    </Dialog>
  )
}
