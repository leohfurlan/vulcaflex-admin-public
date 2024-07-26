export function BarrelPlate() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Placa 18</h2>

      <div className="w-full max-w-[640px] border flex justify-between rounded-sm pt-2 pb-4">
        <div className="flex-1 text-center">
          <h2 className="border-b-2 border-b-red-600 mb-3">seção 1</h2>
          <div className="h-8 bg-red-600 rounded-sm flex items-center justify-center mx-2">
            <span className="text-white">{'<10mm'}</span>
          </div>
        </div>
        <div className="flex-1 text-center">
          <h2 className="border-b-2 border-b-red-600 mb-3">seção 2</h2>
          <div className="h-8 bg-red-600 rounded-sm flex items-center justify-center mx-2">
            <span className="text-white">{'>10mm'}</span>
          </div>
        </div>
        <div className="flex-1 text-center">
          <h2 className="border-b-2 border-b-red-600 mb-3">seção 3</h2>
          <div className="h-8 bg-red-600 rounded-sm flex items-center justify-center mx-2">
            <span className="text-white">{'>10mm'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
