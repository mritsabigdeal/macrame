import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { InboxView } from './components/InboxView'
import { ClientProfileView } from './components/ClientProfileView'
import { ProjectDetailView } from './components/ProjectDetailView'
import { ChatPanel } from './components/ChatPanel'
import type { Project } from './lib/types'

type View = 'inbox' | 'profile' | 'project-detail'

export default function App() {
  const [view, setView] = useState<View>('inbox')
  const [selectedClientId, setSelectedClientId] = useState('field-notes')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [role, setRole] = useState<'agency' | 'client'>('agency')

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
    <div className="app">
      <Sidebar
        view={view}
        selectedClientId={selectedClientId}
        onNavigate={(v, c) => navigate(v as View, c)}
      />

      <Topbar
        view={view}
        selectedClientId={selectedClientId}
        role={role}
        onRoleToggle={handleRoleToggle}
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

      <ChatPanel selectedClientId={selectedClientId} />
    </div>
  )
}
