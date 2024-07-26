export const PlateStatus = {
  GOOD: '>10mm',
  INTERMEDIATE: '<10mm',
  WARNING: '<8mm',
  DANGER: '<5mm',
  ERROR: 'erro',
}

export const PlateStatusOrder = {
  '>10mm': 5,
  '<10mm': 4,
  '<8mm': 3,
  '<5mm': 2,
  erro: 1,
}

export function getPlateColor(status: number) {
  switch (status) {
    case 5:
      return 'bg-green-600'
    case 4:
      return 'bg-yellow-600'
    case 3:
      return 'bg-orange-600'
    case 2:
      return 'bg-red-600'
    default:
      return 'bg-gray-900'
  }
}
