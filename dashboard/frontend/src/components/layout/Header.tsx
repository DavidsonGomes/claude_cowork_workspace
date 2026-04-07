import { RefreshCw } from 'lucide-react'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  title: string
  onRefresh?: () => void
  lastUpdatedMinutes?: number
}

export function Header({ title, onRefresh, lastUpdatedMinutes = 0 }: HeaderProps) {
  const [spinning, setSpinning] = useState(false)

  const handleRefresh = useCallback(() => {
    setSpinning(true)
    onRefresh?.()
    setTimeout(() => setSpinning(false), 1000)
  }, [onRefresh])

  return (
    <header
      className="fixed top-0 right-0 left-[220px] h-14 flex items-center justify-between px-8 z-10 border-b"
      style={{
        backgroundColor: 'hsl(222 47% 5%)',
        borderColor: 'hsl(215 20% 27%)',
      }}
    >
      <h1 className="text-base font-semibold text-gray-100">{title}</h1>

      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">
          {lastUpdatedMinutes === 0
            ? 'Atualizado agora'
            : `Atualizado há ${lastUpdatedMinutes} min`}
        </span>
        <button
          type="button"
          aria-label="Atualizar dados"
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors"
        >
          <RefreshCw
            size={13}
            aria-hidden="true"
            className={cn('transition-transform duration-500', spinning && 'animate-spin')}
          />
          Atualizar
        </button>
      </div>
    </header>
  )
}
