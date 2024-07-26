import { BarrelPlate } from '@/models/Barrel'
import { getPlateColor, PlateStatusOrder } from './plateStatus'

export function setPlateStyle(
  plate: BarrelPlate,
  isFirst: boolean,
  isLast: boolean,
): string {
  let style =
    'flex items-center justify-center h-full min-h-10 max-h-10 cursor-pointer mb-1'

  if (isFirst) {
    style += ' rounded-t-sm'
  }

  if (isLast) {
    style += ' rounded-b-sm'
  }

  const statuses: string[] = []
  let min = Infinity

  for (let i = 1; i < plate.length; i++) {
    const statusNumber = PlateStatusOrder[plate[i] as keyof object]
    if (statusNumber < min) {
      min = statusNumber
    }
    statuses.push(plate[i] as string)
  }

  const bgColor = getPlateColor(min)

  style += ` ${bgColor}`

  return style
}
