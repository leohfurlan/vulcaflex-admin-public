import React, { useState } from 'react'
import { ptBR } from 'date-fns/locale'
import { format, isBefore, isAfter } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { CalendarIcon } from 'lucide-react'

interface DateRangePickerProps {
  onClick: (startDate: Date | undefined, endDate: Date | undefined) => void
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onClick,
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [open, setOpen] = useState(false)

  const today = new Date()

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date)
    if (endDate && date && isAfter(date, endDate)) {
      setError('A data inicial não pode ser maior que a data final.')
    } else {
      setError(undefined)
    }
  }

  const handleEndDateChange = (date: Date | undefined) => {
    if (date && startDate && isBefore(date, startDate)) {
      setError('A data final não pode ser menor que a data inicial.')
    } else if (date && isAfter(date, today)) {
      setError('A data final não pode ser maior que a data atual.')
    } else {
      setError(undefined)
      setEndDate(date)
    }
  }

  const buttonError = 'border border-red-400 text-red-400'

  return (
    <div className="flex flex-col mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="mb-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-56 justify-start ${error ? buttonError : ''}`}
              >
                <CalendarIcon className="mr-2 size-4" />
                {startDate
                  ? format(startDate, 'dd/MM/yyyy', { locale: ptBR })
                  : 'Selecione a data inicial'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={handleStartDateChange}
                locale={ptBR}
                disabled={(date) => isAfter(date, today)}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="mb-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-56 justify-start ${error ? buttonError : ''}`}
              >
                <CalendarIcon className="mr-2 size-4" />
                {endDate
                  ? format(endDate, 'dd/MM/yyyy', { locale: ptBR })
                  : 'Selecione a data final'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={handleEndDateChange}
                locale={ptBR}
                disabled={(date) =>
                  startDate
                    ? isBefore(date, startDate) || isAfter(date, today)
                    : isAfter(date, today)
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          className="bg-orange-500 text-white hover:bg-orange-400 w-full max-w-56"
          disabled={!!error || !startDate || !endDate}
          onClick={() => onClick(startDate, endDate)}
        >
          Exibir Histórico
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
