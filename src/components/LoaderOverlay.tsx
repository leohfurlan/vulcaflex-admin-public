import { useLoader } from '@/contexts/LoaderContext'

export const LoaderOverlay: React.FC = () => {
  const { isLoading } = useLoader()

  if (!isLoading) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  )
}
