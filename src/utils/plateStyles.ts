export function plateCodeColor(status: number) {
  switch (status) {
    case 0: // <5mm
      return 'text-red-600'
    case 5: // <8mm
      return 'text-orange-400'
    case 8: // <10mm
      return 'text-yellow-500'
    case 10: // >10mm
      return 'text-green-600'
    default: // erro
      return 'text-gray-900'
  }
}

export function sectionColor(status: number) {
  switch (status) {
    case 0: // <5mm
      return 'border-red-600'
    case 5: // <8mm
      return 'border-orange-400'
    case 8: // <10mm
      return 'border-yellow-500'
    case 10: // >10mm
      return 'border-green-600'
    default: // erro
      return 'border-gray-900'
  }
}
