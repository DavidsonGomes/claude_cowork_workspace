import { useParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer'

export function RoutineDetailPage() {
  const { name } = useParams<{ name: string }>()

  return (
    <PageContainer title={`Rotina: ${name ?? ''}`}>
      <p className="text-gray-400">Em construcao</p>
    </PageContainer>
  )
}
