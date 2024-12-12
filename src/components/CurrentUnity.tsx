import { useDashboardContext } from '@/contexts/DashboardContext'

export function CurrentUnity() {
  const { dashboard } = useDashboardContext()

  const numberClasses = 'text-6xl text-center'
  const textClasses = 'text-center text-sm'
  const cardClasses =
    'w-32 h-32 flex flex-col flex-1 justify-center mx-auto bg-white rounded-lg'

  return (
    <>
      <div className={cardClasses}>
        <span className={numberClasses}>{dashboard.qtProcess}</span>
        <span className={textClasses}>Processos</span>
      </div>
      <div className={cardClasses}>
        <span className={numberClasses}>{dashboard.qtTransporter}</span>
        <span className={textClasses}>Transportadores</span>
      </div>
      <div className={cardClasses}>
        <span className={numberClasses}>{dashboard.qtBarrel}</span>
        <span className={textClasses}>Tambores</span>
      </div>
      <div className={cardClasses}>
        <span className={numberClasses}>{dashboard.qtPlate}</span>
        <span className={textClasses}>Placas</span>
      </div>
    </>
  )
}
