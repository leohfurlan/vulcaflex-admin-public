export const chartColor = (status: number) => {
  switch (status) {
    case 0: // <5mm
      return '#dc2626' // bg-red-600
    case 5: // <8mm
      return '#fb923c' // bg-orange-400
    case 8: // <10mm
      return '#eab308' // bg-yellow-500
    case 10: // >10mm
      return '#16a34a' // bg-green-600
    default: // erro
      return '#111827' // bg-gray-900
  }
}
