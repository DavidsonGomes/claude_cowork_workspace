import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { HomePage } from '@/pages/HomePage'
import { RoutinesPage } from '@/pages/RoutinesPage'
import { RoutineDetailPage } from '@/pages/RoutineDetailPage'
import { CommunityPage } from '@/pages/CommunityPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { FinancePage } from '@/pages/FinancePage'
import { MeetingsPage } from '@/pages/MeetingsPage'
import { HealthPage } from '@/pages/HealthPage'

function AppLayout() {
  return (
    <div className="flex h-full min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-[220px]">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/routines" element={<RoutinesPage />} />
            <Route path="/routines/:name" element={<RoutineDetailPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/meetings" element={<MeetingsPage />} />
            <Route path="/health" element={<HealthPage />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
