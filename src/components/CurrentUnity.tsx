import { useDashboardContext } from '@/contexts/DashboardContext'

export function CurrentUnity() {
  const { unitySpecifications: data } = useDashboardContext()

  const numberClasses = 'text-6xl text-center'
  const textClasses = 'text-center text-sm'
  const cardClasses =
    'w-32 h-32 flex flex-col justify-center mx-auto bg-white rounded-lg'

  return (
    <>
      <div className={cardClasses}>
        <span className={numberClasses}>{data.qnt_processos}</span>
        <span className={textClasses}>Processos</span>
      </div>
      <div className={cardClasses}>
        <span className={numberClasses}>{data.qnt_transportadores}</span>
        <span className={textClasses}>Transportadores</span>
      </div>
      <div className={cardClasses}>
        <span className={numberClasses}>{data.qnt_tambores}</span>
        <span className={textClasses}>Tambores</span>
      </div>
      <div className={cardClasses}>
        <span className={numberClasses}>{data.qnt_placas}</span>
        <span className={textClasses}>Placas</span>
      </div>
    </>
  )
}
