import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { InboxView } from './components/InboxView'
import { ClientProfileView } from './components/ClientProfileView'
import { ProjectDetailView } from './components/ProjectDetailView'
import { ChatPanel } from './components/ChatPanel'
import { SplashPage } from './components/SplashPage'
import type { Project } from './lib/types'

type View = 'inbox' | 'profile' | 'project-detail'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [view, setView] = useState<View>('inbox')
  const [selectedClientId, setSelectedClientId] = useState('field-notes')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [role, setRole] = useState<'agency' | 'client'>('agency')
  const [chatOpen, setChatOpen] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (showSplash) {
    document.body.classList.remove('app-mode')
    return <SplashPage onEnter={() => { document.body.classList.add('app-mode'); setShowSplash(false) }} />
  }
  document.body.classList.add('app-mode')

  function navigate(nextView: View, clientId?: string) {
    if (clientId) setSelectedClientId(clientId)
    setView(nextView)
  }

  function handleProjectClick(project: Project) {
    setSelectedProject(project)
    setView('project-detail')
  }

  function handleRoleToggle() {
    setRole(r => r === 'agency' ? 'client' : 'agency')
  }

  return (
    <div className={`app${chatOpen ? '' : ' chat-closed'}`}>
      <Sidebar
        view={view}
        selectedClientId={selectedClientId}
        onNavigate={(v, c) => { navigate(v as View, c); setSidebarOpen(false) }}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <Topbar
        view={view}
        selectedClientId={selectedClientId}
        role={role}
        onRoleToggle={handleRoleToggle}
        chatOpen={chatOpen}
        onChatToggle={() => setChatOpen(o => !o)}
        onMenuToggle={() => setSidebarOpen(o => !o)}
      />

      <main className="main">
        {view === 'inbox' && (
          <InboxView
            role={role}
            onOpenProfile={clientId => navigate('profile', clientId)}
          />
        )}
        {view === 'profile' && (
          <ClientProfileView
            clientId={selectedClientId}
            role={role}
            onProjectClick={handleProjectClick}
          />
        )}
        {view === 'project-detail' && selectedProject && (
          <ProjectDetailView
            project={selectedProject}
            clientId={selectedProject.clientId}
            onBack={() => navigate('profile', selectedProject.clientId)}
          />
        )}
      </main>

      {chatOpen && <ChatPanel selectedClientId={selectedClientId} />}
    </div>
  )
}
