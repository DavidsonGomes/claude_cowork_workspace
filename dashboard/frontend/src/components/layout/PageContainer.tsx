import type { ReactNode } from 'react'
import { Header } from './Header'

interface PageContainerProps {
  title: string
  children: ReactNode
  onRefresh?: () => void
  lastUpdatedMinutes?: number
}

export function PageContainer({ title, children, onRefresh, lastUpdatedMinutes }: PageContainerProps) {
  return (
    <div className="flex flex-col min-h-full">
      <Header title={title} onRefresh={onRefresh} lastUpdatedMinutes={lastUpdatedMinutes} />
      <main className="pt-14">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
